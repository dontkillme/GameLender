import factory
from magazine.models import BoardGame


class BoardGameFactory(factory.django.DjangoModelFactory):
    name = factory.sequence(lambda x: f"game_{x}")
    code = factory.sequence(lambda x: f"code_{x}")

    class Meta:
        model = BoardGame
