from .models import AdminUser
from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import json
from datetime import date, datetime

# Create your views here.
def jsons(data = None, errorCode = 0, cookies = '', days = 0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies, 'days': days})

def adminLogin(request):
    data = json.loads(request.body)

    username = data['username']
    password = data['password']

    try:
        admin = AdminUser.objects.get(username = username)
    except AdminUser.DoesNotExist:
        return jsons([], 404)

    admin = authenticate(request, username=username, password=password)

    if admin is not None:
        # authenticated
        login(request, admin)
        admin = AdminUser.objects.get(username = username)
        return jsons([dict(admin.body())], 0, {'user_id': admin.id, 'username': username})    
    else:
        # not authenticated
        return jsons([], 403)

# Logout
def adminLogout(request):
    if request.user.is_authenticated:
        logout(request)
        return jsons([], 0)

    return jsons([], 403)

@login_required
def adminEdit(request, pk):
    try:
        admin = AdminUser.objects.get(id = pk)
    except AdminUser.DoesNotExist:
        return jsons([], 404)

    # change password
    if request.method == 'PUT':
        if request.user.id != admin.id:
            return jsons([], 403)
        
        data = json.loads(request.body)

        admin.username = admin.username
        admin.set_password(data['newpass'])
        admin.save()

        login(request, admin)
    
        return jsons([dict(admin.body())])

def adminGetByUsername(request, username):
    try:
        admin = AdminUser.objects.get(username = username)
        year = int(admin.joinDate.strftime("%Y"))
        month = int(admin.joinDate.strftime("%m"))
        day = int(admin.joinDate.strftime("%d"))
        nowYear = int(datetime.now().strftime("%Y"))
        nowMonth = int(datetime.now().strftime("%m"))
        nowDay = int(datetime.now().strftime("%d"))

        date1 = date(year, month, day)
        date2 = date(nowYear, nowMonth, nowDay)
        days = (date2 - date1).days
    except AdminUser.DoesNotExist:
        return jsons([], 404)

    return jsons([dict(admin.body())], 0, '', days)