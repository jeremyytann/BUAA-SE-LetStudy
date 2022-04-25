from django.db import models
from django.utils import timezone

# Create your models here.
class Notice(models.Model):
    title = models.CharField(max_length=30, null=False)
    description = models.TextField(null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.title
    
    def body(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'created_date': self.createdDate
        }