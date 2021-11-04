import pytest
from magazine.tests.factory.producer_factory import ProducerFactory


@pytest.fixture(name="producer")
def create_producer():
    return ProducerFactory.create()