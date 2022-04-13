from django.shortcuts import render
from django.http import JsonResponse
from category.models import Category

# Create your views here.
def jsons(data = None, errorCode = 0, cookies = ''):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'cookies': cookies})

def categoryGetAll(request):
    categories = Category.objects.all()
    return jsons([dict(category.body()) for category in categories])