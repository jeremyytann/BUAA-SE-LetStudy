from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.userRegister),
    path('login/', views.userLogin),
    path('logout/', views.userLogout),

    path('<str:username>/', views.userGetByUsername)
]