#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Weekly data refresh pipeline for contests and culture events.

This script intentionally runs the pipeline as independent steps. A missing
optional API key should not prevent other sources from refreshing.
"""
import argparse
import os
import subprocess
import sys
from datetime import date, timedelta
from pathlib import Path

from culture_env import load_env

ROOT = Path(__file__).resolve().parents[1]


def run_step(name, command, *, required=True, env=None):
    print(f"\n=== {name} ===", flush=True)
    result = subprocess.run(command, cwd=ROOT, env=env or os.environ.copy())
    if result.returncode == 0:
        return True
    message = f"{name} failed with exit code {result.returncode}"
    if required:
        raise SystemExit(message)
    print(f"SKIP/CONTINUE: {message}", file=sys.stderr, flush=True)
    return False


def iso(value):
    return value.isoformat()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--days-ahead", type=int, default=90, help="culture event collection window from today")
    parser.add_argument("--contest-limit", type=int, default=40, help="detail pages per contest source section")
    parser.add_argument("--culture-rows", type=int, default=50)
    parser.add_argument("--culture-pages", type=int, default=4)
    parser.add_argument("--skip-live-check", action="store_true")
    parser.add_argument("--strict-optional", action="store_true", help="fail if optional API collectors fail")
    args = parser.parse_args()

    load_env()
    start = date.today()
    end = start + timedelta(days=args.days_ahead)
    optional_required = args.strict_optional

    run_step(
        "collect contests from aggregator sources",
        [sys.executable, "scripts/collect_contest_sources.py", "--limit", str(args.contest_limit)],
        required=False,
    )
    run_step("normalize/load contests", [sys.executable, "scripts/normalize_multi_contests.py"])
    run_step("verify contest cross-source matches", [sys.executable, "scripts/verify_contest_cross_sources.py"])
    run_step("audit contest target eligibility", [sys.executable, "scripts/audit_contest_target_eligibility.py"])

    if os.environ.get("KOPIS_API_KEY"):
        run_step(
            "collect KOPIS culture events",
            [
                sys.executable,
                "scripts/collect_kopis_culture.py",
                "--start",
                iso(start),
                "--end",
                iso(end),
                "--kid-only",
                "--rows",
                str(args.culture_rows),
            ],
            required=optional_required,
        )
    else:
        print("\n=== collect KOPIS culture events ===\nSKIP: KOPIS_API_KEY is not set", flush=True)

    if os.environ.get("CULTUREINFO_API_KEY"):
        for mode in ("period", "livelihood"):
            run_step(
                f"collect CultureInfo {mode}",
                [
                    sys.executable,
                    "scripts/collect_cultureinfo.py",
                    "--mode",
                    mode,
                    "--start",
                    iso(start),
                    "--end",
                    iso(end),
                    "--rows",
                    str(args.culture_rows),
                    "--max-pages",
                    str(args.culture_pages),
                ],
                required=optional_required,
            )
    else:
        print("\n=== collect CultureInfo events ===\nSKIP: CULTUREINFO_API_KEY is not set", flush=True)

    if os.environ.get("KCISA_MUSEUM_API_KEY") and os.environ.get("KCISA_MUSEUM_API_URL"):
        run_step(
            "collect KCISA museum exhibitions",
            [
                sys.executable,
                "scripts/collect_kcisa_museum.py",
                "--rows",
                str(args.culture_rows),
                "--max-pages",
                str(args.culture_pages),
            ],
            required=optional_required,
        )
    else:
        print(
            "\n=== collect KCISA museum exhibitions ===\n"
            "SKIP: KCISA_MUSEUM_API_KEY or KCISA_MUSEUM_API_URL is not set",
            flush=True,
        )

    run_step("verify culture cross-source matches", [sys.executable, "scripts/verify_culture_cross_sources.py"])
    if not args.skip_live_check:
        run_step("live-check contest/culture official URLs", [sys.executable, "scripts/live_check_urls.py"])
    run_step("export contest web data", [sys.executable, "scripts/export_web_data.py"])
    run_step("export culture web data", [sys.executable, "scripts/export_culture_web_data.py"])

    print("\nweekly refresh complete", flush=True)


if __name__ == "__main__":
    main()
