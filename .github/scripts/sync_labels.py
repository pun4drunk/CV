#!/usr/bin/env python3
"""Create or update repo labels from .github/labels.yml (GitHub REST API)."""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from urllib.parse import quote

import yaml

OWNER, REPO = os.environ["GITHUB_REPOSITORY"].split("/", 1)
TOKEN = os.environ["GITHUB_TOKEN"]
API = f"https://api.github.com/repos/{OWNER}/{REPO}"
HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}


def api_request(
    method: str,
    path: str,
    body: dict | None = None,
) -> tuple[int, str]:
    url = API + path
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, method=method)
    for k, v in HEADERS.items():
        req.add_header(k, v)
    if body is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            return resp.status, raw
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


def main() -> None:
    with open(".github/labels.yml", encoding="utf-8") as f:
        labels = yaml.safe_load(f)
    if not isinstance(labels, list):
        print("Expected a YAML list of labels", file=sys.stderr)
        sys.exit(1)

    for spec in labels:
        name = spec["name"]
        color = str(spec["color"]).lstrip("#")
        description = str(spec.get("description", ""))[:100]
        enc = quote(name, safe="")

        status, raw = api_request("GET", f"/labels/{enc}")
        payload = {"color": color, "description": description}

        if status == 200:
            st, body = api_request("PATCH", f"/labels/{enc}", payload)
            if st != 200:
                print(f"PATCH label {name!r} -> HTTP {st}: {body}", file=sys.stderr)
                sys.exit(1)
        elif status == 404:
            create = {"name": name, "color": color, "description": description}
            st, body = api_request("POST", "/labels", create)
            if st != 201:
                print(f"POST label {name!r} -> HTTP {st}: {body}", file=sys.stderr)
                sys.exit(1)
        else:
            print(f"GET label {name!r} -> HTTP {status}: {raw}", file=sys.stderr)
            sys.exit(1)

    print("Label sync complete.")


if __name__ == "__main__":
    main()
