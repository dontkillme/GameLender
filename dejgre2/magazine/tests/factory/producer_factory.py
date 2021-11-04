import factory
from magazine.models import Producer
from pytest_factoryboy import register


@register
class ProducerFactory(factory.django.DjangoModelFactory):
    name = factory.sequence(lambda x: f"producer_{x}")

    class Meta:
        model = Producer
