from django.shortcuts import render
from user.models import GeneralUser
from .models import Room
from django.http import JsonResponse
import json
from participant.models import Participant
from django.contrib.auth.hashers import make_password, check_password

# Create your views here.
def jsons(data = None, errorCode = 0, page = 0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': page})

def roomCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id = request.user.id)
        except GeneralUser.DoesNotExist:
            return jsons([], 403)

        data = json.loads(request.body)
        
        name = data['name']
        type = data['type']
        lock = data['lock']
        password = make_password(data['password'])

        if lock:
            room = Room.objects.create(
                name = name,
                roomType = type,
                lock = lock,
                password = password,
                host = user.username
            )

            Participant.objects.create(user = user, room = room)
            
            return jsons([dict(room.body())], 0)
        else:
            room = Room.objects.create(
                name = name,
                roomType = type,
                lock = lock,
                host = user.username
            )

            Participant.objects.create(user = user, room = room)

            return jsons([dict(room.body())], 0)

def roomGet(request, pk):
    try:
        room = Room.objects.get(id = pk)
    except Room.DoesNotExist:
        return jsons([], 404)
    
    return jsons([dict(room.body())])

def roomGetPublic(request):
    rooms = Room.objects.filter(roomType = 0).order_by('name')

    return jsons([dict(room.body()) for room in rooms], 0)

def roomGetPrivateByPage(request, page):
    rooms = Room.objects.filter(roomType = 1).order_by('createdDate')
    rooms = rooms[((page - 1) * 8) : (page * 8)]

    return jsons([dict(room.body()) for room in rooms], 0)

def roomGetPrivatePageCount(request):
    rooms = Room.objects.filter(roomType = 1).order_by('createdDate')
    pages = int((rooms.count() + 7) / 8)

    return jsons([], 0, pages)

def roomJoin(request, pk):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403)
    
    try:
        room = Room.objects.get(id = pk)
    except Room.DoesNotExist:
        return jsons([], 404)

    data = json.loads(request.body)
    
    if data['lock'] == 0:
        participant = Participant.objects.create(user = user, room = room)
        participant.save()
    elif data['lock'] == 1:
        valid = check_password(data['password'], room.password)

        if valid:
            participant = Participant.objects.create(user = user, room = room)
            participant.save()
            return jsons([], 0)
        else:
            return jsons([], 403)

    return jsons([], 0)

def roomQuit(request, pk):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403)
    
    try:
        room = Room.objects.get(id = pk)
    except Room.DoesNotExist:
        return jsons([], 404)

    data = json.loads(request.body)

    if data['type'] == 0:
        participant = Participant.objects.filter(user = user, room = room)
        participant.delete()
        return jsons()
    elif data['type'] == 1:
        participant = Participant.objects.filter(user = user, room = room)
        participant.delete()

        participants = Participant.objects.filter(room = room).count()

        if participants == 0:
            room.delete()

        return jsons()