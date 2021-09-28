import pytest
import json
from rest_framework.test import APIClient
from magazine.tests.fixtures.boardgame_fixture import create_boardgame


@pytest.mark.django_db
def test_create_lend_game_should_add_lend_information(boardgame):
    client = APIClient()
    data = {
        "game": boardgame.id,
    }
    resp = client.post("/lend/game/", json.dumps(data), content_type="application/json")
    assert resp.status_code == 200