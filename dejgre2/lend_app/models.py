from django.db import models
from django.utils import timezone
from magazine.models import BoardGame
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User


class Person(models.Model):
    name = models.CharField(max_length=255)


class LendInformation(models.Model):
    LENDED = 0
    RETURNED = 1
    ACTIONS = (
        (LENDED, "Lended"),
        (RETURNED, "Returned")
    )

    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    lend = models.ForeignKey("GameLend", on_delete=models.DO_NOTHING)
    action = models.IntegerField(default=LENDED, choices=ACTIONS)


class GameLend(models.Model):
    lend_start = models.DateTimeField(auto_now_add=True)
    lend_end = models.DateTimeField(null=True, blank=True)
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name="lender", blank=True, null=True)
    game = models.ForeignKey(BoardGame, on_delete=models.CASCADE, related_name="lended_game")
    note = models.TextField(null=True, blank=True)

    def start_lend(self, lender):
        self.add_lend_information(lender, LendInformation.LENDED)

    def end_lend(self, lender):
        self.add_lend_information(lender, LendInformation.RETURNED)
        self.lend_end = timezone.now()
        self.save()

    def add_lend_information(self, lender, action):
        return LendInformation.objects.create(user=lender, lend=self, action=action)
