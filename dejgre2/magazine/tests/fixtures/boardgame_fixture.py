import pytest
from magazine.tests.factory.boardgame_factory import BoardGameFactory


@pytest.fixture(name="boardgame")
def create_boardgame():
    return BoardGameFactory.create()
