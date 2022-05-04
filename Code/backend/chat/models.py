from django.db import models
from room.models import Room
from user.models import GeneralUser
from django.utils import timezone

# Create your models here.
class Chat(models.Model):
    content = models.CharField(max_length=128, null=False)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.content
    
    def body(self):
        return {
            'id': self.id,
            'content': self.content,
            'room': self.room.body(),
            'user': self.user.body(),
            'createdDate': self.createdDate
        }