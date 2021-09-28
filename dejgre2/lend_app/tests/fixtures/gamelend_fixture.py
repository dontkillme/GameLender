import pytest
from lend_app.tests.factories.gamelend_factory import GameLendFactory


@pytest.fixture(name="gamelend")
def create_gamelend(boardgame, regular_user):
    lend = GameLendFactory.create(game=boardgame)
    lend.start_lend(regular_user)
    return lend


@pytest.fixture(name="returned_gamelend")
def create_returned_gamelend(boardgame, regular_user):
    lend = GameLendFactory.create(game=boardgame)
    lend.start_lend(regular_user)
    lend.end_lend(regular_user)
    return lend
