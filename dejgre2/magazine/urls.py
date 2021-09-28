from django.contrib import admin
from django.urls import path
from generic.endpoints import register_endpoints
from magazine.models import BoardGame, GameGenre, GameTags
from magazine.serializers import BoardGameSerializers, GameGenreSerializers, \
    GameTagsSerializers
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'boardgame', register_endpoints(BoardGame, BoardGameSerializers))
router.register(r'gamegenre', register_endpoints(BoardGame, BoardGameSerializers))
router.register(r'gametags', register_endpoints(BoardGame, BoardGameSerializers))


urlpatterns = router.urls
