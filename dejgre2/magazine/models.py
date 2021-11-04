from django.db import models


class BoardGame(models.Model):
	name = models.CharField(max_length=255)
	code = models.CharField(max_length=255, blank=True, null=True)
	from_age = models.IntegerField(default=1)
	to_age = models.IntegerField(default=99)
	from_players = models.IntegerField(default=1)
	to_players = models.IntegerField(default=4)
	genre = models.ForeignKey("GameGenre", on_delete=models.SET_NULL, blank=True, null=True)
	tags = models.ManyToManyField("GameTags", blank=True)
	quantity = models.IntegerField(default=1)
	producer = models.ForeignKey("Producer", on_delete=models.CASCADE, blank=True, null=True)

	def can_lend(self):
		return self.lended_game.filter(lend_end__isnull=True).count() < self.quantity


class GameGenre(models.Model):
	name = models.CharField(max_length=255)


class GameTags(models.Model):
	name = models.CharField(max_length=255)


class Producer(models.Model):
	name = models.CharField(max_length=255)
