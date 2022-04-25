from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.bugCreate),

    path('all/page/<int:page>/count/<int:count>/', views.bugGetAllByPage),
    path('all/page_count/count/<int:count>/', views.bugGetAllPageCount),

    path('status/<int:status>/page/<int:page>/count/<int:count>/', views.bugGetByStatusAndPage),
    path('status/<int:status>/page_count/count/<int:count>/', views.bugGetStatusPageCount)
]