from django.db import models
from user.models import GeneralUser
from django.utils import timezone

# Create your models here.
class Bug(models.Model):
    type = models.CharField(max_length=8 ,null=False)
    title = models.CharField(max_length=30, null=False)
    description = models.TextField(null=False)
    status = models.IntegerField(default = 0)
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.description
    
    def body(self):
        return {
            'id': self.id,
            'type': self.type,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'user': self.user.body(),
            'created_date': self.createdDate
        }