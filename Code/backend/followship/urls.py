from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.followshipCreate),

    path('<str:followingUsername>/', views.followshipGet),
    path('delete/<int:followingId>/', views.followshipDelete)
]