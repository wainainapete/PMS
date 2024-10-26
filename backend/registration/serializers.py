from rest_framework import serializers
from .models import UserRegistration
from django.contrib.auth import authenticate

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRegistration
        fields = ['surname', 'first_name', 'last_name', 'username', 'email', 'phone_number', 'role', 'organization', 'department', 'location', 'password']
    
    def create(self, validated_data):
        # Hash the password before saving
        user = UserRegistration(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

    def validate_email(self, value):
        if UserRegistration.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use.")
        return value

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user is None:
            raise serializers.ValidationError("Invalid username or password.")
        return data
