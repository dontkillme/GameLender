
from rest_framework.routers import SimpleRouter
from lend_app.serializers import GameLendSerializer
from lend_app.views import LendGameEndpoint
from lend_app.models import GameLend

router = SimpleRouter()
router.register(r'game', LendGameEndpoint)

urlpatterns = router.urls
