from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.questionCreate),
    path('<int:pk>/', views.questionGet),
    path('<int:pk>/delete/', views.questionDelete),
    path('random/<int:count>/', views.questionGetByRandom),

    path('all/page/<int:page>/', views.questionGetAllByPage),
    path('all/page_count/', views.questionGetAllPageCount),

    path('popular/page/<int:page>/', views.questionGetPopularByPage),
    path('popular/page_count/', views.questionGetPopularPageCount),

    path('latest/page/<int:page>/', views.questionGetLatestByPage),
    path('latest/page_count/', views.questionGetLatestPageCount),
]