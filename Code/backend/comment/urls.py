from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.commentCreate),

    path('<int:pk>/', views.commentGet),
    path('<int:pk>/delete/', views.commentDelete),
    path('<int:noteId>/page/<int:page>/', views.commentGetByPage)
]