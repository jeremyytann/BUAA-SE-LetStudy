from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.userRegister),
    path('<int:pk>/', views.userGet),
    path('<int:pk>/edit/', views.userEditOrDelete),
    path('<int:pk>/ban/', views.userBan),
    path('<int:pk>/unban/', views.userUnban),
    path('<int:pk>/delete/', views.userEditOrDelete),
    path('login/', views.userLogin),
    path('logout/', views.userLogout),

    path('<str:username>/', views.userGetByUsername)
]