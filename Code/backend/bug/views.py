from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from user.models import GeneralUser
from .models import Bug
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page)})

def bugCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id = request.user.id)
            data = json.loads(request.body)

            bug = Bug.objects.create(user = user)
            bug.type = data['type']
            bug.title = data['title']
            bug.description = data['description']
            bug.save()
            return jsons([dict(bug.body())])
        except GeneralUser.DoesNotExist:
            jsons([], 404, 0)

@login_required
def bugEdit(request, pk):
    if request.method == 'PUT':
        bug = Bug.objects.get(id = pk)
        data = json.loads(request.body)

        bug.status = data['status']

        if int(data['status'] == 1):
            bug.reason = data['reason']

        bug.save()

        return jsons([dict(bug.body())])

def bugGet(request, pk):
    try:
        bug = Bug.objects.get(id = pk)
        return jsons([dict(bug.body())], 0, 0)
    except Bug.DoesNotExist:
        return jsons([], 404, 0)

def bugGetAllByUser(request, page):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
        bugs = Bug.objects.filter(user = user).order_by('-createdDate')
        pages = int((bugs.count() + 3) / 4)
        bugs = bugs[((page - 1) * 4) : (page * 4)]
        return jsons([dict(bug.body()) for bug in bugs], 0, pages)
    except GeneralUser.DoesNotExist:
        return jsons([], 404, 0)

def bugGetAllByPage(request, page, count):
    bugs = Bug.objects.all().order_by('-createdDate')
    pages = int((bugs.count() + (count - 1)) / count)
    bugs = bugs[((page - 1) * count) : (page * count)]

    return jsons([dict(bug.body()) for bug in bugs], 0, pages)

def bugGetAllPageCount(request, count):
    bugs = Bug.objects.all().order_by('-createdDate')
    pages = (bugs.count() + (count - 1)) / count

    return jsons([], 0, pages)

def bugGetByStatusAndPage(request, status, page, count):
    bugs = Bug.objects.filter(status = status).order_by('-createdDate')
    pages = int((bugs.count() + (count - 1)) / count)
    bugs = bugs[((page - 1) * count) : (page * count)]

    return jsons([dict(bug.body()) for bug in bugs], 0, pages)

def bugGetStatusPageCount(request, status, count):
    bugs = Bug.objects.filter(status = status)
    pages = int((bugs.count() + (count - 1)) / count)

    return jsons([], 0, pages)