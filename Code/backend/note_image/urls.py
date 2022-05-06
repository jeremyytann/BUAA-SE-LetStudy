from django.urls import path
from . import views

urlpatterns = [
    path('<int:note_id>/create/', views.noteImageCreate),
    path('<int:note_id>/', views.noteImageGet),
    path('<int:note_id>/edit/', views.noteImageEdit)
]