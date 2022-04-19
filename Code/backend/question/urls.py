from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.questionCreate),
    path('<int:pk>/', views.questionGet),
    path('<int:pk>/category/<int:count>/', views.questionGetByCategory),

    path('all/page/<int:page>/', views.questionGetAllByPage),
    path('all/page_count/', views.questionGetAllPageCount),

    path('latest/page/<int:page>/', views.questionGetLatestByPage),
    path('latest/page_count/', views.questionGetLatestPageCount),
]