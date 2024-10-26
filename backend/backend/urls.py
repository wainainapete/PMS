# backend/urls.py
from django.contrib import admin
from django.urls import path, include  # Ensure 'include' is imported
from registration.views import login  # Import the login view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('registration/', include('registration.urls')),  # Include your app's URLs
    path('login/', login, name='login'),  # Add the login URL pattern
]

