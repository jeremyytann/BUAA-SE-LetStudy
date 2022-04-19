from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from category.models import Category
from user.models import GeneralUser
from note.models import Note
import json, random

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

def noteGetAllByPage(request, page):
    notes = Note.objects.all()
    notesList = list(notes)
    pages = (notes.count() + 15) / 16
    randoms = random.sample(notesList, notes.count())
    notes = randoms[((page - 1) * 16) : (page * 16)]

    return jsons([dict(note.body()) for note in notes], 0, pages)

def noteGetLatestByPage(request, page):
    notes = Note.objects.all().order_by('-createdDate')
    pages = (notes.count() + 15) / 16
    notes = notes[((page - 1) * 16) : (page * 16)]

    return jsons([dict(note.body()) for note in notes], 0, pages)

def noteGetAllPageCount(request):
    notes = Note.objects.all()
    pages = (notes.count() + 15) / 16
    return jsons([], 0, pages)