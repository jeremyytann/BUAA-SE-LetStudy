from django.db import models
from question.models import Question
from user.models import GeneralUser
from django.utils import timezone

# Create your models here.
class Answer(models.Model):
    description = models.CharField(max_length=256, null=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=False, related_name='answered_question')
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