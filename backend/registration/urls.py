# urls.py

from django.urls import path
from .views import register, login  # Import the login view

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),  # Add the login path
]
