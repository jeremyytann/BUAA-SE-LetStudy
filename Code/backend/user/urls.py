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

    path('all/page/<int:page>/count/<int:count>/', views.userGetAllByPage),
    path('all/page_count/count/<int:count>/', views.userGetAllPageCount),
    path('<int:status>/page/<int:page>/count/<int:count>/', views.userGetByStatus),
    path('<int:status>/page_count/count/<int:count>/', views.userGetStatusPageCount),
    path('<str:username>/', views.userGetByUsername)
]