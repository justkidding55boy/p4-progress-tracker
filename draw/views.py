from django.shortcuts import render
from django.utils.safestring import mark_safe
import json

def index(request):
    return render(request, 'draw/index.html', {})

def room(request, room_name):
    return render(request, 'draw/room.html', {
        'room_name_json': mark_safe(json.dumps(room_name))
    })
  
def video_page(request):
    return render(request, 'draw/video_page.html', {})

def main_page(request):
    return render(request, 'draw/main_page.html', {})
  
def Personal_Page(request):
    return render(request, 'draw/Personal_Page.html', {})
    
def Video_Submission_Page(request):
    return render(request, 'draw/Video_Submission_Page.html', {})
  
def CritiqueVideoScreen(request):
    return render(request, 'draw/CritiqueVideoScreen.html', {})