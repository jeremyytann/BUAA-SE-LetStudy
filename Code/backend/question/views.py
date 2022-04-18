from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from category.models import Category
from user.models import GeneralUser
from .models import Question
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page)})

@login_required
def questionCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id = request.user.id)
            data = json.loads(request.body)
            category = Category.objects.get(name = data['category'])

            question = Question.objects.create(user = user, category = category)
            question.title = data['title']
            question.description = data['description']
            question.save()

            return jsons([dict(question.body())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0)

def questionGet(request, pk):
    try:
        question = Question.objects.get(id = pk)
    except Question.DoesNotExist:
        return jsons([], 404, 0)
    
    return jsons([dict(question.body())])

def questionGetAllByPage(request, page):
    questions = Question.objects.all()
    pages = (questions.count() + 15) / 16
    questions = questions[((page - 1) * 16) : (page * 16)]

    return jsons([dict(question.body()) for question in questions], 0, pages)

def questionGetAllPageCount(request):
    questions = Question.objects.all()
    pages = (questions.count() + 15) / 16
    return jsons([], 0, pages)