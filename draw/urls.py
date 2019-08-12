# chat/urls.py
from django.conf.urls import url

from . import views
from django.urls import path

urlpatterns = [
    path('main_page', views.main_page, name='main_page'),
    url(r'^$', views.index, name='index'),
    url(r'^(?P<room_name>[^/]+)/$', views.room, name='room'),
]

