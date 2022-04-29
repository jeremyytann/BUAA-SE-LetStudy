from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.collectionCreate),

    path('<int:noteId>/', views.collectionGet),

    path('all/user/<str:username>/page/<int:page>/', views.collectionGetAllByUser),

    path('count/<int:noteId>/', views.collectionGetCount),
    path('count/<str:username>/', views.collectionGetCountByUser),
    path('delete/<int:noteId>/', views.collectionDelete)
]