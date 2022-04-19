from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from note.models import Note
from user.models import GeneralUser
from .models import Collection
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0, count=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page), 'count': int(count)})

@login_required
def collectionCreate(request):
    if request.method == 'POST':
        try:
            collection_user = GeneralUser.objects.get(id = request.user.id)
            data = json.loads(request.body)

            note = Note.objects.get(id = data['noteId'])
            note_user = GeneralUser.objects.get(id = data['noteUserId'])

            collection = Collection.objects.create(note = note, collectionUser = collection_user, noteUser = note_user)
            collection.save()

            return jsons([dict(collection.body())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0)

@login_required
def collectionGet(request, noteId):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)

    try:
        note = Note.objects.get(id = noteId)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    try:
        collection = Collection.objects.get(collectionUser = user, note = note)
    except Collection.DoesNotExist:
        return jsons([], 404, 0)
    
    return jsons([dict(collection.body())])

def collectionGetCount(request, noteId):
    try:
        note = Note.objects.get(id = noteId)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    count = Collection.objects.filter(note = note).count()
    return jsons([], 0, 0, count)
    
@login_required
def collectionDelete(request, noteId):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)

    try:
        note = Note.objects.get(id = noteId)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    try:
        collection = Collection.objects.get(collectionUser = user, note = note)
    except Collection.DoesNotExist:
        return jsons([], 404, 0)

    if request.method == 'DELETE':
        collection.delete()
        return jsons()