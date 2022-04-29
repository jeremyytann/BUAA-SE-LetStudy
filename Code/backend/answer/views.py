from itertools import count
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

def answerDelete(request, pk):
    try:
        answer = Answer.objects.get(id = pk)
        answer.delete()
        return jsons()
    except Answer.DoesNotExist:
        return jsons([], 404, 0)

def answerGetByPage(request, questionId, page):
    try:
        question = Question.objects.get(id = questionId)
        answers = Answer.objects.filter(question = question).order_by('-createdDate')
        total = answers.count()
        pages = int((answers.count() + 4) / 5)
        answers = answers[((page - 1) * 5) : (page * 5)]
    except Question.DoesNotExist:
        return jsons([], 404, 0)

    return jsons([dict(answer.body()) for answer in answers], 0, pages, 0)

def answerGetCount(reqeust, questionId):
    try:
        question = Question.objects.get(id = questionId)
        count = Answer.objects.filter(question = question).count()
        return jsons([], 0, 0, count)
    except Question.DoesNotExist:
        return jsons([], 404, 0)
