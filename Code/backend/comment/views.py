from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from note.models import Note
from user.models import GeneralUser
from comment.models import Comment
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page)})

def commentCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id=request.user.id)
            data = json.loads(request.body)
            noteId = data['noteId']
            note = Note.objects.get(id=noteId)

            comment = Comment.objects.create(user = user, note = note)
            comment.description = data['description']
            comment.save()

            return jsons([dict(comment.body())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0)

def commentGet(request, pk):
    try:
        comment = Comment.objects.get(id = pk)
    except Comment.DoesNotExist:
        return jsons([], 404, 0)
    
    return jsons([dict(comment.body())])

def commentDelete(request, pk):
    try:
        comment = Comment.objects.get(id = pk)
        comment.delete()
        return jsons()
    except Comment.DoesNotExist:
        return jsons([], 404, 0)

def commentGetByPage(request, noteId, page):
    note = Note.objects.get(id = noteId)
    comments = Comment.objects.filter(note = note).order_by('-createdDate')
    pages = (comments.count() + 4) / 5
    comments = comments[((page - 1) * 5) : (page * 5)]

    return jsons([dict(comment.body()) for comment in comments], 0, pages)