from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.followshipCreate),
    path('count/<str:username>/', views.followshipGetCountByUser),

    path('<str:followingUsername>/', views.followshipGet),
    path('delete/<int:followingId>/', views.followshipDelete)
]