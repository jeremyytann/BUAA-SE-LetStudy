from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.likeCreate),

    path('<int:noteId>/', views.likeGet),
    path('count/<int:noteId>/', views.likeGetCount),
    path('count/<str:username>/', views.likeGetCountByUser),
    path('delete/<int:noteId>/', views.likeDelete)
]