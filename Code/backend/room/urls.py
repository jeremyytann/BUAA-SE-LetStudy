from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.roomCreate),
    path('<int:pk>/', views.roomGet),
    path('<int:pk>/join/', views.roomJoin),
    path('<int:pk>/quit/', views.roomQuit),
    path('public/', views.roomGetPublic),
    path('private/<int:page>/', views.roomGetPrivateByPage),
    path('private/page_count/', views.roomGetPrivatePageCount)
]