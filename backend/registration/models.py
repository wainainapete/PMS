from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

class UserRegistrationManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        """Create and return a `UserRegistration` with an email, username, and password."""
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        """Create and return a `UserRegistration` with superuser (admin) privileges."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

class UserRegistration(AbstractBaseUser, PermissionsMixin):
    surname = models.CharField(max_length=100, help_text="Enter your surname.", blank=False)
    first_name = models.CharField(max_length=100, help_text="Enter your first name.", blank=False)
    last_name = models.CharField(max_length=100, help_text="Enter your last name.", blank=False)
    username = models.CharField(max_length=50, unique=True, help_text="Enter a unique username.", blank=False)
    email = models.EmailField(unique=True, help_text="Enter your email address.", blank=False)
    phone_number = models.CharField(max_length=15, blank=True, help_text="Enter your phone number.")
    role = models.CharField(max_length=50, help_text="Enter your role in the organization.", blank=False)
    organization = models.CharField(max_length=100, help_text="Enter the name of your organization.", blank=False)
    department = models.CharField(max_length=100, help_text="Enter your department.", blank=False)
    location = models.CharField(max_length=100, help_text="Enter your location.", blank=False)
    
    # Additional fields required for user management
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'username'  # Field to be used as the unique identifier
    REQUIRED_FIELDS = ['email', 'first_name', 'surname']  # Other required fields for createsuperuser()

    objects = UserRegistrationManager()

    def __str__(self):
        return self.email
