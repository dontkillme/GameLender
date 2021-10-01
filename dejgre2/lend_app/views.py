from django.http import JsonResponse

from rest_framework.viewsets import mixins, GenericViewSet
from rest_framework.decorators import action

from lend_app.models import GameLend
from lend_app.serializers import GameLendSerializer
from magazine.models import BoardGame
from generic.exceptions import GameLendException
from rest_framework.authentication import TokenAuthentication


class LendGameEndpoint(mixins.RetrieveModelMixin,
                       mixins.ListModelMixin,
                       mixins.UpdateModelMixin,
                       GenericViewSet):
    serializer_class = GameLendSerializer
    queryset = GameLend.objects.all()
    authentication_classes = (TokenAuthentication,)

    @action(detail=False, methods=['post'])
    def lend_game(self, request):
        data = request.data
        can_lend_game = BoardGame.objects.get(id=data["id"]).can_lend()
        if not can_lend_game:
            raise GameLendException("No more games available")
        #todo think about notes on start and end
        lend_obj = GameLend.objects.create(game_id=data["id"], note=data.get("note", ""))
        lend_obj.start_lend(request.user)

        return JsonResponse(GameLendSerializer(lend_obj).data, safe=False)

    @action(detail=True, methods=['put'])
    def return_game(self, request, pk=None):
        lend_obj = GameLend.objects.get(pk=pk)
        lend_obj.end_lend(request.user)
        return JsonResponse({"success": True, "id": pk})
