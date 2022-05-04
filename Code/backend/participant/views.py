import json
from django.shortcuts import render
from django.http import JsonResponse
from user.models import GeneralUser
from room.models import Room
from .models import Participant

# Create your views here.
def jsons(data = None, errorCode = 0, count=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'count': int(count)})

def getRoomParticipantCount(request, pk):
    try:
        room = Room.objects.get(id = pk)
    except Room.DoesNotExist:
        return jsons([], 403)
    
    count = Participant.objects.filter(room = room).count()
    return jsons([], 0, count)

def getRoomParticipant(request, pk):
    try:
        room = Room.objects.get(id = pk)
    except Room.DoesNotExist:
        return jsons([], 403)

    participants = Participant.objects.filter(room = room)
    return jsons([dict(participant.body()) for participant in participants], 0)