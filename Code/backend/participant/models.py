from django.db import models
from user.models import GeneralUser
from room.models import Room

# Create your models here.
class Participant(models.Model):
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return self.room.getName() + ' - ' + self.user.getUsername()

    def body(self):
        return {
            'user': self.user.body(),
            'room': self.room.body()
        }