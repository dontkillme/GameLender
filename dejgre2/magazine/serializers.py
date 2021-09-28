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
    genre = GameGenreSerializers(required=False)
    lended = serializers.SerializerMethodField()

    def get_lended(self, obj):
        return obj.lended_game.filter(lend_end__isnull=True).count()

    class Meta:
        model = BoardGame
        fields = "__all__"

