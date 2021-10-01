import pytest
import json
from generic.tests.fixture.user_fixtures import create_regular_user
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_user_login_and_logout(regular_user):
    client = APIClient()
    result = client.post("/auth/", json.dumps({"username": regular_user.username, "password": "notvalid"}),
                         content_type="application/json")
    result_json = result.json()
    assert result.status_code == 200
    assert "token" in result_json
    client.credentials(HTTP_AUTHORIZATION=f"token {result_json['token']}")
    result = client.get("/logout/")
    assert result.status_code == 200


