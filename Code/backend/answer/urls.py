from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.answerCreate),

    path('<int:questionId>/page/<int:page>/', views.answerGetByPage)
]