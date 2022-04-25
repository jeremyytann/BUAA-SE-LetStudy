from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.noticeCreate),

    path('all/page/<int:page>/<int:count>/', views.noticeGetAllByPage),
    path('all/page_count/<int:count>/', views.noticeGetAllPageCount),

    path('latest/page/<int:page>/<int:count>/', views.noticeGetLatestByPage),
    path('latest/page_count/<int:count>/', views.noticeGetLatestPageCount)
]