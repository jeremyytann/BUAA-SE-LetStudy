from django.urls import path
from . import views

urlpatterns = [
    path('room/<int:pk>/count/', views.getRoomParticipantCount),
    path('room/<int:pk>/', views.getRoomParticipant)
]