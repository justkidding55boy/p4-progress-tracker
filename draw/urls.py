# chat/urls.py
from django.conf.urls import url

from . import views
from django.urls import path

urlpatterns = [
    path('video_page', views.video_page, name='video_page'),
    path('main_page', views.main_page, name='main_page'),
    path('Personal_Page', views.Personal_Page, name='Personal_Page'),
    path('Video_Submission_Page', views.Video_Submission_Page, name='Video_Submission_Page'),
    path('CritiqueVideoScreen', views.CritiqueVideoScreen, name='CritiqueVideoScreen'),
    path('CommentScreen', views.CommentScreen, name='CommentScreen'),
    url(r'^$', views.index, name='index'),
    url(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
]

