from rest_framework import serializers
from lend_app.models import Person, GameLend
from magazine.models import BoardGame

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = "__all__"


class GameLendSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        if not validated_data["game"].can_lend():
            raise Exception("No more games")
        return super().create(validated_data)

    class Meta:
        model = GameLend
        fields = "__all__"
