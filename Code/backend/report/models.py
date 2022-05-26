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
    title = models.CharField(max_length=30, null=False)
    description = models.TextField(null=False)
    status = models.IntegerField(default = 0)
    note = models.ForeignKey(Note, on_delete=models.SET_NULL, null=True, blank=True)
    comment = models.ForeignKey(Comment, on_delete=models.SET_NULL, null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.SET_NULL, null=True, blank=True)
    answer = models.ForeignKey(Answer, on_delete=models.SET_NULL, null=True, blank=True)
    profile = models.ForeignKey(GeneralUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='report_profile')
    user = models.ForeignKey(GeneralUser, on_delete=models.CASCADE, null=False)
    reason = models.CharField(max_length=30, null=True, blank=True)
    createdDate = models.DateTimeField(default = timezone.now)

    def __str__(self):
        return self.description

    def body(self):
        if self.status == 1:
            if self.type == 1:
                return {
                    'id': self.id,
                    'type': self.type,
                    'title': self.title,
                    'description': self.description,
                    'status': self.status,
                    'user': self.user.body(),
                    'reason': self.reason,
                    'created_date': self.createdDate
                }
            elif self.type == 2:
                return {
                    'id': self.id,
                    'type': self.type,
                    'title': self.title,
                    'description': self.description,
                    'status': self.status,
                    'user': self.user.body(),
                    'reason': self.reason,
                    'created_date': self.createdDate
                }
            elif self.type == 3:
                return {
                    'id': self.id,
                    'type': self.type,
                    'title': self.title,
                    'description': self.description,
                    'status': self.status,
                    'user': self.user.body(),
                    'reason': self.reason,
                    'created_date': self.createdDate
                }
            elif self.type == 4:
                return {
                    'id': self.id,
                    'type': self.type,
                    'title': self.title,
                    'description': self.description,
                    'status': self.status,
                    'user': self.user.body(),
                    'reason': self.reason,
                    'created_date': self.createdDate
                }
            elif self.type == 5:
                return {
                    'id': self.id,
                    'type': self.type,
                    'title': self.title,
                    'description': self.description,
                    'status': self.status,
                    'user': self.user.body(),
                    'created_date': self.createdDate
                }
        else:
            if self.type == 1:
                if self.note:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'note': self.note.body(),
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
                else:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
            elif self.type == 2:
                if self.comment:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'comment': self.comment.body(),
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
                else:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
            elif self.type == 3:
                if self.question:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'question': self.question.body(),
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
                else:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
            elif self.type == 4:
                if self.answer:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'answer': self.answer.body(),
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
                else:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }
            elif self.type == 5:
                if self.profile:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'profile': self.profile.body(),
                        'user': self.user.body(),
                        'created_date': self.createdDate
                    }
                else:
                    return {
                        'id': self.id,
                        'type': self.type,
                        'title': self.title,
                        'description': self.description,
                        'status': self.status,
                        'user': self.user.body(),
                        'reason': self.reason,
                        'created_date': self.createdDate
                    }

    def getNoteBody(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'note': self.note.body(),
            'user': self.user.body(),
            'reason': self.reason,
            'created_date': self.createdDate
        }

    def getCommentBody(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'comment': self.comment.body(),
            'user': self.user.body(),
            'reason': self.reason,
            'created_date': self.createdDate
        }

    def getQuestionBody(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'question': self.question.body(),
            'user': self.user.body(),
            'reason': self.reason,
            'created_date': self.createdDate
        }

    def getAnswerBody(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'answer': self.answer.body(),
            'user': self.user.body(),
            'reason': self.reason,
            'created_date': self.createdDate
        }

    def getProfileBody(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'status': self.status,
            'profile': self.profile.body(),
            'user': self.user.body(),
            'reason': self.reason,
            'created_date': self.createdDate
        }