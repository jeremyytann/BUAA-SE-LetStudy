from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.reportCreate),

    path('all/page/<int:page>/', views.reportGetAllByUser),
    path('all/page/<int:page>/count/<int:count>/', views.reportGetAllByPage),
    path('all/page_count/count/<int:count>/', views.reportGetAllPageCount),

    path('status/<int:status>/page/<int:page>/count/<int:count>/', views.reportGetByStatusAndPage),
    path('status/<int:status>/page_count/count/<int:count>/', views.reportGetStatusPageCount)
]