from django.db import models
from django.utils import timezone
from note.models import Note

# Create your models here.
class NoteImage(models.Model):
    image = models.ImageField(upload_to="note_images", null=False)
    note = models.ForeignKey(Note, on_delete=models.CASCADE, null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.note.title + " image"

    def body(self):
        return {
            'id': self.id,
            'note': self.note.body(),
            'image_url': 'http://54.179.228.155' + self.image.url
        }