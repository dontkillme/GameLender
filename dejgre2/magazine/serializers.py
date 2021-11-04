from rest_framework import serializers
from magazine.models import BoardGame, GameGenre, GameTags


class GameGenreSerializers(serializers.ModelSerializer):
    class Meta:
        model = GameGenre
        fields = "__all__"


class GameTagsSerializers(serializers.ModelSerializer):
    class Meta:
        model = GameTags
        fields = "__all__"


class BoardGameSerializers(serializers.ModelSerializer):
    tags = GameTagsSerializers(many=True, required=False)
    genre = serializers.SlugRelatedField(queryset=GameGenre.objects.all(), slug_field="id", required=False)
    available = serializers.SerializerMethodField()

    def get_available(self, obj):
        return obj.quantity - obj.lended_game.filter(lend_end__isnull=True).count()

    class Meta:
        model = BoardGame
        fields = "__all__"

