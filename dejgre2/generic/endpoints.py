from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication


def register_endpoints(model, serializer):
    class MainHandler(viewsets.ModelViewSet):
        queryset = model.objects.all()
        serializer_class = serializer
        authentication_classes = (TokenAuthentication,)
        filterset_fields = [f.name for f in model._meta.get_fields()]

    return MainHandler
