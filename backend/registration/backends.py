from django.contrib.auth.backends import ModelBackend
from .models import UserRegistration
from django.contrib.auth.hashers import check_password

class CustomUserBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserRegistration.objects.get(username=username)
            if user.check_password(password):  # This should be your password verification logic
                return user
        except UserRegistration.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return UserRegistration.objects.get(pk=user_id)
        except UserRegistration.DoesNotExist:
            return None
