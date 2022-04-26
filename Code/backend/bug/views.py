from django.shortcuts import render
from django.http import JsonResponse
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

def bugGetAllByUser(request, page):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
        bugs = Bug.objects.filter(user = user).order_by('-createdDate')
        pages = (bugs.count() + 3) / 4
        bugs = bugs[((page - 1) * 4) : (page * 4)]
        return jsons([dict(bug.body()) for bug in bugs], 0, pages)
    except GeneralUser.DoesNotExist:
        return jsons([], 404, 0)

def bugGetAllByPage(request, page, count):
    bugs = Bug.objects.all().order_by('-createdDate')
    pages = (bugs.count() + (count - 1)) / count
    bugs = bugs[((page - 1) * count) : (page * count)]

    return jsons([dict(bug.body()) for bug in bugs], 0, pages)

def bugGetAllPageCount(request, count):
    bugs = Bug.objects.all().order_by('-createdDate')
    pages = (bugs.count() + (count - 1)) / count

    return jsons([], 0, pages)

def bugGetByStatusAndPage(request, status, page, count):
    bugs = Bug.objects.filter(status = status).order_by('-createdDate')
    pages = (bugs.count() + (count - 1)) / count
    bugs = bugs[((page - 1) * count) : (page * count)]

    return jsons([dict(bug.body()) for bug in bugs], 0, pages)

def bugGetStatusPageCount(request, status, count):
    bugs = Bug.objects.filter(status = status)
    pages = (bugs.count() + (count - 1)) / count

    return jsons([], 0, pages)