import pytest
import json
from magazine.tests.fixtures.boardgame_fixture import create_multiple_boardgames, create_multiple_boardgames_vol2, \
    create_boardgame
from generic.tests.fixture.user_fixtures import create_apiclient_with_token, create_regular_user
from magazine.tests.fixtures.producer_fixture import create_producer
from magazine.models import BoardGame

@pytest.mark.django_db
def test_boardgame_get(multiple_boardgames_vol1, multiple_boardgames_vol2, apiclient_with_token):
    result = apiclient_with_token.get("/magazine/boardgame/")
    resp = result.json()
    assert result.status_code == 200
    assert len(resp) == 8


@pytest.mark.django_db
def test_boardgame_get_with_filter(multiple_boardgames_vol1, multiple_boardgames_vol2, apiclient_with_token):
    result = apiclient_with_token.get(f"/magazine/boardgame/?producer={multiple_boardgames_vol1[0].producer_id}")
    resp = result.json()
    assert result.status_code == 200
    assert len(resp) == 5


@pytest.mark.django_db
def test_boardgame_post(apiclient_with_token, producer):
    data = {
        "name": "asdf",
        "code": "asdf",
        "producer": producer.id
    }
    result = apiclient_with_token.post(f"/magazine/boardgame/", json.dumps(data), content_type="application/json")
    resp = result.json()
    assert result.status_code == 201
    assert resp["name"] == "asdf"
    assert resp["producer"] == producer.id


@pytest.mark.django_db
def test_boardgame_patch(apiclient_with_token, boardgame, producer):
    data = {
        "producer": producer.id
    }
    result = apiclient_with_token.patch(f"/magazine/boardgame/{boardgame.id}/", json.dumps(data),
                                        content_type="application/json")
    resp = result.json()
    assert result.status_code == 200
    assert resp["producer"] == producer.id


@pytest.mark.django_db
def test_boardgame_delete(apiclient_with_token, boardgame, producer):
    result = apiclient_with_token.delete(f"/magazine/boardgame/{boardgame.id}/", content_type="application/json")
    assert result.status_code == 204
    assert not BoardGame.objects.filter(id=boardgame.id).count()