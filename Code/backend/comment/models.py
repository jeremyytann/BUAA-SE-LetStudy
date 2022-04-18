from django.db import models
from note.models import Note
from user.models import GeneralUser
from django.utils import timezone

# Create your models here.
class Comment(models.Model):
    description = models.CharField(max_length=256, null=False)
    note = models.ForeignKey(Note, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.description

    def body(self):
        return {
            'description': self.description,
            'user': self.user.body(),
            'created_date': self.createdDate
        }