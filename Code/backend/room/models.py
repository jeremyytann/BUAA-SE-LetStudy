from unicodedata import name
from django.db import models
from django.utils import timezone

# Create your models here.
class Room(models.Model):
    name = models.CharField(max_length=30, null=False)
    roomType = models.IntegerField(default=0, null=False)
    lock = models.BooleanField(default=False, null=False)
    password = models.CharField(max_length=30, null=True, blank=True)
    host = models.CharField(max_length=30, null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.name
    
    def getName(self):
        return self.name

    def body(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.roomType,
            'lock': self.lock,
            'user': self.host
        }