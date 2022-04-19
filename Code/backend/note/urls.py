from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.noteCreate),
    path('<int:pk>/', views.noteGet),

    path('all/page/<int:page>/', views.noteGetAllByPage),
    path('all/page_count/', views.noteGetAllPageCount),

    path('popular/page/<int:page>/', views.noteGetPopularByPage),
    path('popular/page_count/', views.noteGetPopularPageCount),

    path('latest/page/<int:page>/', views.noteGetLatestByPage),
    path('latest/page_count/', views.noteGetLatestPageCount)
]