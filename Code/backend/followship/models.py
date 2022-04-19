from django.db import models
from user.models import GeneralUser

# Create your models here.
class Followship(models.Model):
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False, related_name='user')
    followingUser = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False, related_name='following_user')

    def __str__(self):
        return self.user.username + " - " + self.followingUser.username

    def body(self):
        return {
            'id': self.id,
            'user': self.user.body(),
            'followingUser': self.followingUser.body()
        }