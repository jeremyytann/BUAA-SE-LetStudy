from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=8, null=False)

    def __str__(self):
        return self.name
    
    def body(self):
        return {
            'id': self.id,
            'name': self.name
        }