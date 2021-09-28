import factory
from lend_app.models import LendInformation
from lend_app.tests.factories.gamelend_factory import GameLendFactory
from generic.tests.factory.user_factory import UserFactory


class LendInformationFactory(factory.django.DjangoModelFactory):
    lend = factory.SubFactory(GameLendFactory)
    user = factory.SubFactory(UserFactory)

    class Meta:
        model = LendInformation
