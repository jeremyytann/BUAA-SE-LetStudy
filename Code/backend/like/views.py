from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from note.models import Note
from user.models import GeneralUser
from .models import Like
from django.db.models import Count
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0, count=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page), 'count': int(count)})

@login_required
def likeCreate(request):
    if request.method == 'POST':
        try:
            like_user = GeneralUser.objects.get(id = request.user.id)
            data = json.loads(request.body)

            note = Note.objects.get(id = data['noteId'])
            note_user = GeneralUser.objects.get(id = data['noteUserId'])

            like = Like.objects.create(note = note, likeUser = like_user, noteUser = note_user)
            like.save()

            return jsons([dict(like.body())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0)
            
@login_required
def likeGet(request, noteId):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)

    try:
        note = Note.objects.get(id = noteId)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    try:
        like = Like.objects.get(likeUser = user, note = note)
    except Like.DoesNotExist:
        return jsons([], 404, 0)
    
    return jsons([dict(like.body())])

def likeGetCount(request, noteId):
    try:
        note = Note.objects.get(id = noteId)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    count = Like.objects.filter(note = note).count()
    return jsons([], 0, 0, count)

@login_required
def likeDelete(request, noteId):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)

    try:
        note = Note.objects.get(id = noteId)
    except Note.DoesNotExist:
        return jsons([], 403, 0)

    try:
        like = Like.objects.get(likeUser = user, note = note)
    except Like.DoesNotExist:
        return jsons([], 404, 0)

    if request.method == 'DELETE':
        like.delete()
        return jsons()