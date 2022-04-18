from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.noteCreate),
    path('<int:pk>/', views.noteGet),

    path('all/page/<int:page>/', views.noteGetAllByPage),
    path('all/page_count/', views.noteGetAllPageCount)
]