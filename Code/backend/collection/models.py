from django.db import models
from note.models import Note
from user.models import GeneralUser
from django.utils import timezone

# Create your models here.
class Collection(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, null=False)
    collectionUser = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False, related_name='collectionUser')
    noteUser = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False, related_name='collection_note_user')
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.note.title
    
    def body(self):
        return {
            'note': self.note.body(),
            'collectionUser': self.collectionUser.body(),
            'noteUser': self.noteUser.body(),
            'createdDate': self.createdDate
        }