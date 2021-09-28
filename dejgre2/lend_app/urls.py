from generic.endpoints import register_endpoints
from rest_framework.routers import SimpleRouter
from lend_app.serializers import GameLendSerializer
from lend_app.models import GameLend

router = SimpleRouter()
router.register(r'game', register_endpoints(GameLend, GameLendSerializer))

urlpatterns = router.urls
