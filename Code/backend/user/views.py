from .models import GeneralUser, User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json

# Create your views here.
def jsons(data = None, errorCode = 0, cookies = ''):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies})

# Register
def userRegister(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        try:
            user = User.objects.get(username = data['username'])
        except User.DoesNotExist:
            generalUser = GeneralUser.objects.create()
            generalUser.username = data['username']
            generalUser.set_password(data['password'])
            generalUser.save()

            login(request, generalUser)
            
            return jsons([dict(generalUser.body())])
    
    return jsons([], 400)

@login_required
def userEditOrDelete(request, pk):
    try:
        user = GeneralUser.objects.get(id = pk)
    except GeneralUser.DoesNotExist:
        return jsons([], 404)

    # change password
    if request.method == 'PUT':
        if request.user.id != user.id:
            return jsons([], 403)
        
        data = json.loads(request.body)

        user.username = user.username
        user.set_password(data['newpass'])
        user.save()

        login(request, user)
    
        return jsons([dict(user.body())])
    # delete account
    elif request.method == 'DELETE':
        if request.user.id != user.id:
            return jsons([], 403)
        
        user.delete()
        return jsons()

# Login
def userLogin(request):
    data = json.loads(request.body)

    username = data['username']
    password = data['password']

    user = authenticate(request, username=username, password=password)

    if user is not None:
        # authenticated
        login(request, user)
        generalUser = GeneralUser.objects.get(username = username)
        return jsons([dict(generalUser.body())], 0, {'user_id': user.id, 'username': username})    
    else:
        # not authenticated
        return jsons([], 403)

# Logout
def userLogout(request):
    if request.user.is_authenticated:
        print("logged out")
        logout(request)
        return jsons([], 0)

    return jsons([], 403)

def userGetByUsername(request, username):
    if (request.user.is_authenticated):
        print(request.user)
        print('logged in get profile')

    try:
        generalUser = GeneralUser.objects.get(username = username)
    except GeneralUser.DoesNotExist:
        return jsons([], 404)
    
    return jsons([dict(generalUser.body())])