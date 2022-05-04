from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.chatCreate),
    path('room/<int:roomId>/', views.chatGetByRoom),
]