from django.urls import path
from . import views

urlpatterns = [
    # path('create/', views.adminRegister),
    # path('<int:pk>/', views.adminGet),
    path('<int:pk>/edit/', views.adminEdit),
    path('login/', views.adminLogin),
    path('logout/', views.adminLogout),

    path('<str:username>/', views.adminGetByUsername)
]