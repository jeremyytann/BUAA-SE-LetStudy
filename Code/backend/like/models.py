from django.db import models
from note.models import Note
from user.models import GeneralUser

# Create your models here.
class Like(models.Model):
    note = models.ForeignKey(Note, on_delete=models.CASCADE, null=False, related_name='liked_note')
    likeUser = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False, related_name='likeUser')
    noteUser = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False, related_name='like_note_user')

    def __str__(self):
        return self.note.title
    
    def body(self):
        return {
            'note': self.note.body(),
            'likeUser': self.likeUser.body(),
            'noteUser': self.noteUser.body()
        }

    def getNote(self):
        return self.note.body()