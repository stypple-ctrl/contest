import sys
import unittest
from pathlib import Path
from urllib.parse import urlencode


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from culture_env import sanitize_url  # noqa: E402


class SanitizeUrlTest(unittest.TestCase):
    def test_removes_api_credentials_and_keeps_safe_parameters(self):
        credential = "test-value"
        url = "https://api.example.test/events?" + urlencode(
            {"serviceKey": credential, "pageNo": 2, "rows": 20, "token": credential}
        )

        self.assertEqual(
            sanitize_url(url),
            "https://api.example.test/events?pageNo=2&rows=20",
        )

    def test_matches_sensitive_keys_case_insensitively(self):
        credential = "test-value"
        url = "https://api.example.test/events?" + urlencode(
            {"ServiceKey1": credential, "API_KEY": credential, "area": "seoul"}
        )

        self.assertEqual(sanitize_url(url), "https://api.example.test/events?area=seoul")

    def test_preserves_url_without_query_credentials(self):
        url = "https://example.test/events/42#details"

        self.assertEqual(sanitize_url(url), url)


if __name__ == "__main__":
    unittest.main()
