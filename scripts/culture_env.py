#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Small .env loader for local collection scripts.

Keeps API keys out of source code while allowing:
  - exported shell env vars
  - local .env
  - local .env.local
"""
import os
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

SENSITIVE_QUERY_KEYS = {
    "apikey",
    "api_key",
    "authorization",
    "auth",
    "key",
    "password",
    "secret",
    "servicekey",
    "servicekey1",
    "token",
}


def sanitize_url(url):
    """Remove credentials from a URL before it is logged or persisted."""
    if not url:
        return url
    parsed = urllib.parse.urlsplit(url)
    safe_query = [
        (key, value)
        for key, value in urllib.parse.parse_qsl(parsed.query, keep_blank_values=True)
        if key.lower() not in SENSITIVE_QUERY_KEYS
    ]
    return urllib.parse.urlunsplit(
        (parsed.scheme, parsed.netloc, parsed.path, urllib.parse.urlencode(safe_query), parsed.fragment)
    )


def load_env():
    for name in (".env", ".env.local"):
        path = ROOT / name
        if not path.exists():
            continue
        for raw in path.read_text(encoding="utf-8").splitlines():
            line = raw.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            os.environ.setdefault(key, value)


def mask(value):
    if not value:
        return "missing"
    if len(value) <= 10:
        return "***"
    return f"{value[:4]}...{value[-4:]}"
