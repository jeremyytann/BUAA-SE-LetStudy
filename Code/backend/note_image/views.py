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
def noteImageCreate(request, note_id):
    try:
        note = Note.objects.get(id = note_id)
    except Note.DoesNotExist:
        return jsons([], 403, 0)
    
    data = NoteImage.objects.create(note = note, image = request.FILES.get('image'))
    return jsons([dict(data.body())])

def noteImageGet(request, note_id):
    try:
        note = Note.objects.get(id = note_id)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    image = NoteImage.objects.get(note = note)

    if image is None:
        return jsons()

    return jsons([dict(image.body())])