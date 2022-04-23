from django.db import models
from user.models import GeneralUser
from note.models import Note
from comment.models import Comment
from question.models import Question
from answer.models import Answer
from django.utils import timezone

# Create your models here.
class Report(models.Model):
    type = models.IntegerField(default = 0)
    description = models.TextField(null=False)
    status = models.IntegerField(default = 0)
    note = models.ForeignKey(Note, on_delete=models.CASCADE, null=True)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, null=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, null=True)
    profile = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=True, related_name='report_profile')
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.description

    def getNoteBody(self):
        return {
            'id': self.id,
            'description': self.description,
            'status': self.status,
            'note': self.note.body(),
            'user': self.user.body(),
            'created_date': self.createdDate
        }

    def getCommentBody(self):
        return {
            'id': self.id,
            'description': self.description,
            'status': self.status,
            'comment': self.comment.body(),
            'user': self.user.body(),
            'created_date': self.createdDate
        }

    def getQuestionBody(self):
        return {
            'id': self.id,
            'description': self.description,
            'status': self.status,
            'question': self.question.body(),
            'user': self.user.body(),
            'created_date': self.createdDate
        }

    def getAnswerBody(self):
        return {
            'id': self.id,
            'description': self.description,
            'status': self.status,
            'answer': self.answer.body(),
            'user': self.user.body(),
            'created_date': self.createdDate
        }

    def getProfileBody(self):
        return {
            'id': self.id,
            'description': self.description,
            'status': self.status,
            'profile': self.profile.body(),
            'user': self.user.body(),
            'created_date': self.createdDate
        }