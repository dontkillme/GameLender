import pytest
import json
from magazine.tests.fixtures.boardgame_fixture import create_boardgame
from generic.tests.fixture.user_fixtures import create_apiclient_with_token, create_regular_user
from lend_app.tests.fixtures.gamelend_fixture import create_gamelend
from lend_app.models import LendInformation


@pytest.mark.django_db
def test_lending_game_should_add_lend_information(apiclient_with_token, boardgame, regular_user):
    data = {
        "id": boardgame.id,
    }
    resp = apiclient_with_token.post("/lend/game/lend_game/", json.dumps(data), content_type="application/json")
    assert resp.status_code == 200

    resp_json = resp.json()
    assert resp_json["game"] == 1

    lend_info = LendInformation.objects.get(lend_id=resp_json["id"])
    assert lend_info.user_id == regular_user.id


@pytest.mark.django_db
def test_returning_game_should_add_return_info_and_end_date(apiclient_with_token, boardgame, regular_user, gamelend):
    assert LendInformation.objects.filter(lend_id=gamelend.id).count() == 1

    resp = apiclient_with_token.put(f"/lend/game/{gamelend.id}/return_game/", {}, content_type="application/json")
    assert resp.status_code == 200
    assert LendInformation.objects.filter(lend_id=gamelend.id, action=LendInformation.RETURNED).exists()


@pytest.mark.django_db
def test_lend_game_should_fail_if_no_more_games(apiclient_with_token, boardgame, regular_user, gamelend):
    data = {
        "id": boardgame.id,
    }
    resp = apiclient_with_token.post("/lend/game/lend_game/", json.dumps(data), content_type="application/json")
    assert resp.status_code == 400
    assert resp.content == b'{"error": "No more games available"}'



