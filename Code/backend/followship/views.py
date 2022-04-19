from django.shortcuts import render
from .models import Followship
from user.models import GeneralUser
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page)})

@login_required
def followshipCreate(request):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)

    data = json.loads(request.body)

    try:
        followingUser = GeneralUser.objects.get(id = data['followingId'])
    except GeneralUser.DoesNotExist:
        return jsons([], 404, 0)
    
    try:
        followship = Followship.objects.get(user = user, followingUser = followingUser)
    except Followship.DoesNotExist:
        followship = Followship.objects.create(user = user, followingUser = followingUser)
        return jsons([dict(followship.body())])
    
    return jsons([], 400, 0)

@login_required
def followshipGet(request, followingUsername):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)
    
    try:
        followingUser = GeneralUser.objects.get(username = followingUsername)
    except GeneralUser.DoesNotExist:
        return jsons([], 404, 0)
    
    try:
        followship = Followship.objects.get(user = user, followingUser = followingUser)
    except Followship.DoesNotExist:
        return jsons([], 404, 0)

    return jsons([dict(followship.body())])

@login_required
def followshipDelete(request, followingId):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
    except GeneralUser.DoesNotExist:
        return jsons([], 403, 0)
    
    try:
        followingUser = GeneralUser.objects.get(id = followingId)
    except GeneralUser.DoesNotExist:
        return jsons([], 404, 0)
    
    try:
        followship = Followship.objects.get(user = user, followingUser = followingUser)
    except Followship.DoesNotExist:
        return jsons([], 404, 0)
    
    if request.method == 'DELETE':
        followship.delete()
        return jsons()

    