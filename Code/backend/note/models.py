from re import I
from django.db import models
from user.models import GeneralUser
from category.models import Category
from django.utils import timezone

# Create your models here.
class Note(models.Model):
    title = models.CharField(max_length=30, null=False)
    description = models.TextField(null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.title
    
    def body(self):
        return {
            'id': self.id,
            'user': self.user.body(),
            'title': self.title,
            'category': self.category.body(),
            'description': self.description,
            'created_date': self.createdDate,
        }