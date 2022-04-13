from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from category.models import Category
from user.models import GeneralUser
from note.models import Note
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page)})

@login_required
def noteCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id=request.user.id)
            data = json.loads(request.body)
            category = Category.objects.get(name = data['category'])

            note = Note.objects.create(user = user)
            note.title = data['title']
            note.description = data['description']
            note.category = category
            note.save()

            return jsons([dict(note.body())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0)