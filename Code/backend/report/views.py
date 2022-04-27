from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from answer.models import Answer
from note.models import Note
from comment.models import Comment
from user.models import GeneralUser
from question.models import Question
from .models import Report
import json

# Create your views here.
def jsons(data = None, errorCode = 0, page=0):
    if data is None:
        data = []
    
    return JsonResponse({'errorCode': errorCode, 'data': data, 'page': int(page)})

@login_required
def reportCreate(request):
    if request.method == 'POST':
        try:
            user = GeneralUser.objects.get(id = request.user.id)
            data = json.loads(request.body)
            type = int(data['type'])
            
            if type == 1:
                # note
                note = Note.objects.get(id = data['id'])
                report = Report.objects.create(type = type, note = note, user = user)
                report.title = data['title']
                report.description = data['description']
                report.save()
                return jsons([dict(report.getNoteBody())])
            elif type == 2:
                comment = Comment.objects.get(id = data['id'])
                report = Report.objects.create(type = type, comment = comment, user = user)
                report.title = data['title']
                report.description = data['description']
                report.save()
                return jsons([dict(report.getCommentBody())])
            elif type == 3:
                # question
                question = Question.objects.get(id = data['id'])
                report = Report.objects.create(type = type, question = question, user = user)
                report.title = data['title']
                report.description = data['description']
                report.save()
                return jsons([dict(report.getQuestionBody())])
            elif type == 4:
                answer = Answer.objects.get(id = data['id'])
                report = Report.objects.create(type = type, answer = answer, user = user)
                report.title = data['title']
                report.description = data['description']
                report.save()
                return jsons([dict(report.getAnswerBody())])
            elif type == 5:
                profile = GeneralUser.objects.get(id = data['id'])
                report = Report.objects.create(type = type, profile = profile, user = user)
                report.title = data['title']
                report.description = data['description']
                report.save()
                return jsons([dict(report.getProfileBody())])
        except GeneralUser.DoesNotExist:
            return jsons([], 403, 0)

@login_required
def reportEdit(request, pk):
    if request.method == 'PUT':
        report = Report.objects.get(id = pk)
        data = json.loads(request.body)

        report.status = data['status']

        if int(data['status'] == 2):
            report.reason = data['reason']

        report.save()

        return jsons([dict(report.body())])

def reportGet(request, pk):
    try:
        report = Report.objects.get(id = pk)
        return jsons([dict(report.body())], 0, 0)
    except Report.DoesNotExist:
        return jsons([], 404, 0)

def reportGetAllByUser(request, page):
    try:
        user = GeneralUser.objects.get(id = request.user.id)
        reports = Report.objects.filter(user = user).order_by('-createdDate')
        pages = (reports.count() + 3) / 4
        reports = reports[((page - 1) * 4) : (page * 4)]
        return jsons([dict(report.body()) for report in reports], 0, pages)
    except GeneralUser.DoesNotExist:
        return jsons([], 404, 0)

def reportGetAllByPage(request, page, count):
    reports = Report.objects.all().order_by('-createdDate')
    pages = (reports.count() + (count - 1)) / count
    reports = reports[((page - 1) * count) : (page * count)]

    return jsons([dict(report.body()) for report in reports], 0, pages)

def reportGetAllPageCount(request, count):
    reports = Report.objects.all().order_by('-createdDate')
    pages = (reports.count() + (count - 1)) / count

    return jsons([], 0, pages)

def reportGetByStatusAndPage(request, status, page, count):
    reports = Report.objects.filter(status = status).order_by('-createdDate')
    pages = (reports.count() + (count - 1)) / count
    reports = reports[((page - 1) * count) : (page * count)]

    return jsons([dict(report.body()) for report in reports], 0, pages)

def reportGetStatusPageCount(request, status, count):
    reports = Report.objects.filter(status = status)
    pages = (reports.count() + (count - 1)) / count

    return jsons([], 0, pages)