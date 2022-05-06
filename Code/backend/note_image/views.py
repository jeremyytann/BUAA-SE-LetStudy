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

    images = NoteImage.objects.filter(note = note).order_by('-createdDate')
    
    if images is None:
        return jsons()

    image = images[0]
    return jsons([dict(image.body())])

def noteImageEdit(request, note_id):
    try:
        note = Note.objects.get(id = note_id)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    if (request.method == 'PUT'):
        image = NoteImage.objects.get(note = note)

        image.image = request.FILES.get('image')
        image.save()

        return jsons([dict(image.body())])