#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""verifier. 필수필드·날짜논리·중복을 검증한다. 추측으로 verified 처리하지 않는다."""
import json, os
from datetime import date
WS = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..", "..", "_workspace"))
TODAY = date(2026, 6, 24)

def main():
    recs = json.load(open(os.path.join(WS, "02_normalizer_records.json"), encoding="utf-8"))
    out, dropped, dups = [], [], 0
    seen_key, seen_id = {}, set()
    issues = []
    for r in recs:
        # 필수 필드
        if not r.get("title") or not r.get("source_url"):
            dropped.append((r.get("id"), "필수필드 누락")); continue
        if not r.get("application_deadline"):
            r["verification_status"] = "conflict"
            r["verification_notes"] = (r.get("verification_notes") or "") + " | 마감일 미상"
        # 날짜 논리
        s, d = r.get("application_start"), r.get("application_deadline")
        if s and d and s > d:
            r["verification_status"] = "conflict"
            r["verification_notes"] = (r.get("verification_notes") or "") + " | 접수시작>마감 모순"
            issues.append("날짜모순: %s" % r["title"][:30])
        # 중복 (id + 유사키)
        if r["id"] in seen_id:
            dups += 1; continue
        seen_id.add(r["id"])
        key = (r["title"].strip(), (r.get("organizer") or "").strip(), d)
        if key in seen_key:
            dups += 1
            base = seen_key[key]
            base["verification_notes"] = (base.get("verification_notes") or "") + " | 중복출처:" + r["source_url"]
            continue
        # 검증 통과 표시(conflict가 아니면 verified)
        if r["verification_status"] == "unverified":
            r["verification_status"] = "verified"
        seen_key[key] = r
        out.append(r)
    json.dump(out, open(os.path.join(WS, "03_verifier_records.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    nconf = sum(1 for x in out if x["verification_status"] == "conflict")
    with open(os.path.join(WS, "03_verifier_report.md"), "w", encoding="utf-8") as f:
        f.write("# Verifier Report\n\n")
        f.write("- 검수 통과: %d건\n- verified: %d / conflict: %d\n- 중복 제거: %d건\n- 드롭(필수누락): %d건\n\n"
                % (len(out), len(out) - nconf, nconf, dups, len(dropped)))
        if issues:
            f.write("## 발견 이슈\n" + "\n".join("- " + i for i in issues) + "\n")
        if dropped:
            f.write("## 드롭\n" + "\n".join("- %s: %s" % x for x in dropped) + "\n")
    print("검수 통과 %d건 (verified %d, conflict %d), 중복제거 %d, 드롭 %d"
          % (len(out), len(out) - nconf, nconf, dups, len(dropped)))

if __name__ == "__main__":
    main()
