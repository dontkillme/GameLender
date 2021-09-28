import factory
from lend_app.models import GameLend
from magazine.tests.factory.boardgame_factory import BoardGameFactory


class GameLendFactory(factory.django.DjangoModelFactory):
    game = factory.SubFactory(BoardGameFactory)

    class Meta:
        model = GameLend
