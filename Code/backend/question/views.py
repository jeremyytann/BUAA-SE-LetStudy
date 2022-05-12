from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from category.models import Category
from user.models import GeneralUser
from .models import Question
from django.db.models import Count
import json, random
from django.utils import timezone
from itertools import chain

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
        
def questionEdit(request, pk):
    if request.method == 'PUT':
        try:
            question = Question.objects.get(id = pk)
        except Question.DoesNotExist:
            return jsons([], 404, 0)
        
        data = json.loads(request.body)
        category = Category.objects.get(name = data['category'])

        question.title = data['title']
        question.description = data['description']
        question.category = category
        question.edited = 1
        question.save()

        return jsons([dict(question.body())])

def questionGet(request, pk):
    try:
        question = Question.objects.get(id = pk)
    except Question.DoesNotExist:
        return jsons([], 404, 0)
    
    return jsons([dict(question.body())])

def questionDelete(request, pk):
    try:
        question = Question.objects.get(id = pk)
        question.delete()
        return jsons()
    except Question.DoesNotExist:
        return jsons([], 404, 0)

def questionGetAllByPage(request, page):
    questions = Question.objects.all()
    questionsList = list(questions)
    pages = int((questions.count() + 7) / 8)
    randoms = random.sample(questionsList, questions.count())
    questions = randoms[((page - 1) * 8) : (page * 8)]

    return jsons([dict(question.body()) for question in questions], 0, pages)

def questionGetAllByUser(request, username, page):
    try:
        user = GeneralUser.objects.get(username = username)

        questions = Question.objects.filter(user = user).order_by('-createdDate')
        pages = int((questions.count() + 3) / 4)
        questions = questions[((page - 1) * 4) : (page * 4)]

        return jsons([dict(question.body()) for question in questions], 0, pages)
    except GeneralUser.DoesNotExist:
        return jsons([], 403)

def questionGetAllPageCount(request):
    questions = Question.objects.all()
    pages = int((questions.count() + 7) / 8)
    return jsons([], 0, pages)

def questionGetPopularByPage(request, page):
    questions = Question.objects.annotate(num_answers = Count('answered_question')).order_by('-num_answers')
    pages = int((questions.count() + 7) / 8)
    questions = questions[((page - 1) * 8) : (page * 8)]
    return jsons([dict(question.body()) for question in questions], 0, pages)

def questionGetPopularPageCount(request):
    questions = Question.objects.annotate(num_answers = Count('answered_question')).order_by('-num_answers')
    pages = int((questions.count() + 7) / 8)
    return jsons([], 0, pages)

def questionGetLatestByPage(request, page):
    questions = Question.objects.all().order_by('-createdDate')
    pages = int((questions.count() + 7) / 8)
    questions = questions[((page - 1) * 8) : (page * 8)]

    return jsons([dict(question.body()) for question in questions], 0, pages)

def questionGetLatestPageCount(request):
    questions = Question.objects.all().order_by('-createdDate')[:80]
    pages = int((questions.count() + 7) / 8)
    return jsons([], 0, pages)

def questionGetByRandom(request, count):
    questions = Question.objects.all()
    questionsList = list(questions)
    randoms = random.sample(questionsList, questions.count())
    questions = randoms[:count]

    return jsons([dict(question.body()) for question in questions], 0, 0)

def questionSearchByPage(request, search, page):
    try:
        count = 8
        questions1 = Question.objects.filter(title__contains = search)
        questions2 = Question.objects.filter(description__contains = search)
        questions = questions1.union(questions2)
        questions = questions[((page - 1) * count) : (page * count)]
    except Question.DoesNotExist:
        return jsons([], 404)
    
    return jsons([dict(question.body()) for question in questions], 0)

def questionSearchPageCount(request, search):
    try:
        questions1 = Question.objects.filter(title__contains = search)
        questions2 = Question.objects.filter(description__contains = search)
        questions = questions1.union(questions2)
        pages = int((questions.count() + 7) / 8)
        return jsons([], 0, pages)
    except Question.DoesNotExist:
        return jsons([], 404)

def questionCategoryByPage(request, search, page):
    try:
        category = Category.objects.get(name = search)
    except Category.DoesNotExist:
        return jsons([], 403)
    
    count = 8
    questions = Question.objects.filter(category = category)
    questions = questions[((page - 1) * count) : (page * count)]

    return jsons([dict(question.body()) for question in questions], 0)

def questionCategoryPageCount(request, search):
    try:
        category = Category.objects.get(name = search)
    except Category.DoesNotExist:
        return jsons([], 403)
    
    questions = Question.objects.filter(category = category)
    pages = int((questions.count() + 7) / 8)

    return jsons([], 0, pages)