from itertools import count
from django.shortcuts import render
from django.http import JsonResponse
from .models import Notice
from admin_user.models import AdminUser
import json
from django.utils import timezone
import datetime

# Create your views here.
def jsons(data = None, errorCode = 0, page=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page)})

def noticeCreate(request):
    if request.method == 'POST':
        try:
            admin = AdminUser.objects.get(id = request.user.id)
            data = json.loads(request.body)

            notice = Notice.objects.create()
            notice.title = data['title']
            notice.description = data['description']
            notice.save()

            return jsons([dict(notice.body())])
        except AdminUser.DoesNotExist:
            return jsons([], 403, 0)

def noticeGetAllByPage(request, page, count):
    notices = Notice.objects.all().order_by('-createdDate')

    pages = (notices.count() + (count-1)) / count
    notices = notices[((page - 1) * count) : (page * count)]

    return jsons([dict(notice.body()) for notice in notices], 0, pages)

def noticeGetAllPageCount(request, count):
    notices = Notice.objects.all().order_by('-createdDate')

    pages = (notices.count() + (count - 1)) / count

    return jsons([], 0, pages)

def noticeGetLatestByPage(request, page, count):
    notices = Notice.objects.all().order_by('-createdDate')
    start = timezone.now() - timezone.timedelta(days = 7)
    end = timezone.now()
    notices = notices.filter(createdDate__gte=start, createdDate__lte=end)

    pages = (notices.count() + (count - 1)) / count
    notices = notices[((page - 1) * count) : (page * count)]

    return jsons([dict(notice.body()) for notice in notices], 0, pages)

def noticeGetLatestPageCount(request, count):
    notices = Notice.objects.all().order_by('-createdDate')
    start = timezone.now() - timezone.timedelta(days = 7)
    end = timezone.now()
    notices = notices.filter(createdDate__gte=start, createdDate__lte=end)

    pages = (notices.count() + (count - 1)) / count

    return jsons([], 0, pages)