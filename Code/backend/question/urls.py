from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.questionCreate),
    path('<int:pk>/', views.questionGet),

    path('all/page/<int:page>/', views.questionGetAllByPage),
    path('all/page_count/', views.questionGetAllPageCount)
]