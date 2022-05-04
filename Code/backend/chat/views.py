from django.shortcuts import render
from room.models import Room
from .models import Chat
from user.models import GeneralUser
from django.http import JsonResponse
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0, count=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page), 'count': int(count)})

def chatCreate(request):
    data = json.loads(request.body)
    
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403)

    try:
        room = Room.objects.get(id = data['roomId'])
    except Room.DoesNotExist:
        return jsons([], 403)

    content = data['content']

    chat = Chat.objects.create(user = user, room = room)
    chat.content = content
    chat.save()

    return jsons([dict(chat.body())], 0)

def chatGetByRoom(request, roomId):
    try:
        room = Room.objects.get(id = roomId)
    except Room.DoesNotExist:
        return jsons([], 403)

    chats = Chat.objects.filter(room = room).order_by('createdDate')

    return jsons([dict(chat.body()) for chat in chats], 0)