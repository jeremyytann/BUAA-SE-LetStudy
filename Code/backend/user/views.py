from .models import GeneralUser
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from admin_user.models import AdminUser
import json
from datetime import date, datetime

# Create your views here.
def jsons(data = None, errorCode = 0, cookies = '', days = 0, page = 0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies, 'days': days, 'page': page})

# Register
def userRegister(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        try:
            adminUser = AdminUser.objects.get(username = data['username'])
            return jsons([], 400)
        except AdminUser.DoesNotExist:
            try:
                user = GeneralUser.objects.get(username = data['username'])
                return jsons([], 400)
            except GeneralUser.DoesNotExist:
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

@login_required
def userBan(request, pk):
    try:
        admin = AdminUser.objects.get(id = request.user.id)
        user = GeneralUser.objects.get(id = pk)

        user.status = 0
        user.save()
        return jsons([], 0)
    except AdminUser.DoesNotExist:
        return jsons([], 403)

def userUnban(request, pk):
    try:
        admin = AdminUser.objects.get(id = request.user.id)
        user = GeneralUser.objects.get(id = pk)

        user.status = 1
        user.save()
        return jsons([], 0)
    except AdminUser.DoesNotExist:
        return jsons([], 403)

# Login
def userLogin(request):
    data = json.loads(request.body)

    username = data['username']
    password = data['password']

    try:
        user = GeneralUser.objects.get(username = username)
    except GeneralUser.DoesNotExist:
        return jsons([], 404)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        # authenticated
        generalUser = GeneralUser.objects.get(username = username)
        
        if (generalUser.status == 0):
            return jsons([], 400)

        login(request, user)
        return jsons([dict(generalUser.body())], 0, {'user_id': user.id, 'username': username})    
    else:
        # not authenticated
        return jsons([], 403)

# Logout
def userLogout(request):
    if request.user.is_authenticated:
        logout(request)
        return jsons([], 0)

    return jsons([], 403)

def userGet(request, pk):
    try:
        generalUser = GeneralUser.objects.get(id = pk)
        return jsons([dict(generalUser.body())])
    except GeneralUser.DoesNotExist:
        return jsons([], 404)

def userGetByUsername(request, username):
    try:
        generalUser = GeneralUser.objects.get(username = username)
        year = int(generalUser.joinDate.strftime("%Y"))
        month = int(generalUser.joinDate.strftime("%m"))
        day = int(generalUser.joinDate.strftime("%d"))
        nowYear = int(datetime.now().strftime("%Y"))
        nowMonth = int(datetime.now().strftime("%m"))
        nowDay = int(datetime.now().strftime("%d"))

        date1 = date(year, month, day)
        date2 = date(nowYear, nowMonth, nowDay)
        days = (date2 - date1).days

    except GeneralUser.DoesNotExist:
        return jsons([], 404)

    return jsons([dict(generalUser.body())], 0, '', days)

def userGetAllByPage(request, page, count):
    try:
        admin = AdminUser.objects.get(id = request.user.id)
        users = GeneralUser.objects.all().order_by('username')
        pages = int((users.count() + (count - 1)) / count)
        users = users[((page - 1) * count) : (page * count)]

        return jsons([dict(user.body()) for user in users], 0, '', 0, pages)
    except AdminUser.DoesNotExist:
        return jsons([], 403)
    
def userSearchByUsername(request, username, page, count):
    try:
        users = GeneralUser.objects.filter(username__contains=username)
        pages = int((users.count() + (count - 1)) / count)
        users = users[((page - 1) * count) : (page * count)]
    except GeneralUser.DoesNotExist:
        return jsons([], 404)
    
    return jsons([dict(user.body()) for user in users], 0)
    
def userSearchPageCount(request, username):
    try:
        count = 12
        users = GeneralUser.objects.filter(username__contains=username)
        pages = int((users.count() + (count - 1)) / count)
    except GeneralUser.DoesNotExist:
        return jsons([], 404)
    
    return jsons([], 0, '', 0, pages)
        

def userGetAllPageCount(request, count):
    users = GeneralUser.objects.all().order_by('-joinDate')
    pages = int((users.count() + (count - 1)) / count)
    return jsons([], 0, '', 0, pages)
    
def userGetByStatus(request, status, page, count):
    try:
        admin = AdminUser.objects.get(id = request.user.id)
        users = GeneralUser.objects.filter(status = status).order_by('username')
        pages = int((users.count() + (count - 1)) / count)
        users = users[((page - 1) * count) : (page * count)]

        return jsons([dict(user.body()) for user in users], 0, '', 0, pages)
    except AdminUser.DoesNotExist:
        return jsons([], 403)

def userGetStatusPageCount(request, status, count):
    users = GeneralUser.objects.filter(status = status).order_by('-joinDate')
    pages = int((users.count() + (count - 1)) / count)
    return jsons([], 0, '', 0, pages)