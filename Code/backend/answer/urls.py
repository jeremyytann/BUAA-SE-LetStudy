from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.answerCreate),
    path('<int:pk>/', views.answerGet),
    path('<int:questionId>/page/<int:page>/', views.answerGetByPage),
    path('<int:questionId>/count/', views.answerGetCount)
]