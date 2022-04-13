from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import NoteImage
from note.models import Note
from user.models import GeneralUser

# Create your views here.
def jsons(data = None, errorCode = 0, cookies = ''):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies})

@login_required
def noteImageCreate(request, pk):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)
    
    try:
        note = Note.objects.get(id = pk)
    except Note.DoesNotExist:
        return jsons([], 403, 0)
    
    if user.id != note.user.id:
        return jsons([], 403, 0)
    
    image = NoteImage.objects.create(note = note, image = request.FILES.get('images'))
    return jsons([dict(image.body())])