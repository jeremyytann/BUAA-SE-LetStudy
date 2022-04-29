from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.noteCreate),
    path('<int:pk>/', views.noteGet),
    path('<int:pk>/delete/', views.noteDelete),

    path('all/page/<int:page>/', views.noteGetAllByPage),
    path('all/page_count/', views.noteGetAllPageCount),
    path('all/user/<str:username>/page/<int:page>/', views.noteGetAllByUser),
    path('all/count/<str:username>/', views.noteGetAllCountByUser),

    path('popular/page/<int:page>/', views.noteGetPopularByPage),
    path('popular/page_count/', views.noteGetPopularPageCount),

    path('latest/page/<int:page>/', views.noteGetLatestByPage),
    path('latest/page_count/', views.noteGetLatestPageCount)
]