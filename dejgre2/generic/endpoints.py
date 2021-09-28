from rest_framework import viewsets


def register_endpoints(model, serializer):
    class MainHandler(viewsets.ModelViewSet):
        queryset = model.objects.all()
        serializer_class = serializer

    return MainHandler
