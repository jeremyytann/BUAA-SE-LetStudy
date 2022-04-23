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
