from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from question.models import Question
from user.models import GeneralUser
from answer.models import Answer
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0, count=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page), 'count': int(count)})

def answerCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id=request.user.id)
            data = json.loads(request.body)
            questionId = data['questionId']
            question = Question.objects.get(id = questionId)

            answer = Answer.objects.create(user = user, question = question)
            answer.description = data['description']
            answer.save()

            return jsons([dict(answer.body())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0, 0)

def answerGet(request, pk):
    try:
        answer = Answer.objects.get(id = pk)
    except Answer.DoesNotExist:
        return jsons([], 404, 0)
    
    return jsons([dict(answer.body())])

def answerGetByPage(request, questionId, page):
    question = Question.objects.get(id = questionId)
    answers = Answer.objects.filter(question = question).order_by('-createdDate')
    total = answers.count()
    pages = (answers.count() + 4) / 5
    answers = answers[((page - 1) * 5) : (page * 5)]

    return jsons([dict(answer.body()) for answer in answers], 0, pages, total)
