import pytest
from magazine.tests.factory.boardgame_factory import BoardGameFactory
from magazine.tests.factory.producer_factory import ProducerFactory

@pytest.fixture(name="boardgame")
def create_boardgame():
    return BoardGameFactory.create()


@pytest.fixture(name="multiple_boardgames_vol1")
def create_multiple_boardgames():
    producer = ProducerFactory.create()
    return [BoardGameFactory.create(producer=producer) for x in range(5)]

@pytest.fixture(name="multiple_boardgames_vol2")
def create_multiple_boardgames_vol2():
    producer = ProducerFactory.create()
    return [BoardGameFactory.create(producer=producer) for x in range(3)]