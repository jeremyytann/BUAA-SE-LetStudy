from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.
class GeneralUser(User):
    joinDate = models.DateField(default = timezone.now)
    status = models.IntegerField(default = 1)

    def __str__(self):
        return self.username

    def body(self):
        return {
            'id': self.id, 
            'username': self.username,
            'created_date': self.joinDate,
            'status': self.status
        }

    def getUsername(self):
        return self.username