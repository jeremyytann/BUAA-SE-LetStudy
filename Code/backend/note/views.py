from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from category.models import Category
from user.models import GeneralUser
from note.models import Note
from django.db.models import Count
import json, random
from itertools import chain

# Create your views here.
def jsons(data = None, errorCode = 0, page=0, count=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page), 'count': int(count)})

@login_required
def noteCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id=request.user.id)
            data = json.loads(request.body)
            category = Category.objects.get(name = data['category'])

            note = Note.objects.create(user = user, category = category)
            note.title = data['title']
            note.description = data['description']
            note.save()

            return jsons([dict(note.body())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0)

def noteGet(request, pk):
    try:
        note = Note.objects.get(id = pk)
    except Note.DoesNotExist:
        return jsons([], 404, 0)

    return jsons([dict(note.body())])

def noteDelete(request, pk):
    try:
        note = Note.objects.get(id = pk)
        note.delete()
        return jsons()
    except Note.DoesNotExist:
        return jsons([], 404, 0)

def noteGetAllByPage(request, page):
    notes = Note.objects.all()
    notesList = list(notes)
    pages = int((notes.count() + 15) / 16)
    randoms = random.sample(notesList, notes.count())
    notes = randoms[((page - 1) * 16) : (page * 16)]

    return jsons([dict(note.body()) for note in notes], 0, pages)

def noteGetAllByUser(request, username, page):
    try:
        user = GeneralUser.objects.get(username = username)

        notes = Note.objects.filter(user = user).order_by('-createdDate')
        pages = int((notes.count() + 11) / 12)
        notes = notes[((page - 1) * 12) : (page * 12)]

        return jsons([dict(note.body()) for note in notes], 0, pages)
    except GeneralUser.DoesNotExist:
        return jsons([], 403)

def noteGetAllCountByUser(request, username):
    try:
        user = GeneralUser.objects.get(username = username)
        count = Note.objects.filter(user = user).count()

        return jsons([], 0, 0, count)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)

def noteGetPopularByPage(request, page):
    notes = Note.objects.annotate(num_likes = Count('liked_note')).order_by('-num_likes')
    pages = int((notes.count() + 15) / 16)
    notes = notes[((page - 1) * 16) : (page * 16)]
    return jsons([dict(note.body()) for note in notes], 0, pages)

def noteGetLatestByPage(request, page):
    notes = Note.objects.all().order_by('-createdDate')
    pages = int((notes.count() + 15) / 16)
    notes = notes[((page - 1) * 16) : (page * 16)]

    return jsons([dict(note.body()) for note in notes], 0, pages)

def noteGetAllPageCount(request):
    notes = Note.objects.all()
    pages = int((notes.count() + 15) / 16)
    return jsons([], 0, pages)

def noteGetPopularPageCount(request):
    notes = Note.objects.annotate(num_likes = Count('liked_note')).order_by('-num_likes')
    pages = int((notes.count() + 15) / 16)
    return jsons([], 0, pages)

def noteGetLatestPageCount(request):
    notes = Note.objects.all().order_by('-createdDate')
    pages = int((notes.count() + 15) / 16)
    return jsons([], 0, pages)

def noteSearchByPage(request, search, page):
    try:
        count = 16
        notes1 = Note.objects.filter(title__contains = search)
        notes2 = Note.objects.filter(description__contains = search)
        notes = list(chain(notes1, notes2))

        notes = notes[((page - 1) * count) : (page * count)]
    except Note.DoesNotExist:
        return jsons([], 404)
    
    return jsons([dict(note.body()) for note in notes], 0)
