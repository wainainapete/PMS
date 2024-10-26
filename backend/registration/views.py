from django.shortcuts import render
from django.http import JsonResponse
from .models import UserRegistration
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        try:
            user = UserRegistration.objects.get(username=username)
            if user.check_password(password):
                return JsonResponse({"message": "Login successful!", "username": user.username}, status=200)
            else:
                return JsonResponse({"error": "Invalid password."}, status=400)
        except UserRegistration.DoesNotExist:
            return JsonResponse({"error": "User not found."}, status=404)

    return JsonResponse({"error": "Invalid method."}, status=400)



from django.shortcuts import render
from django.http import JsonResponse
from .models import UserRegistration
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Required fields
            required_fields = ['username', 'email', 'password', 'first_name', 'surname']
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return JsonResponse({"error": f"Missing fields: {', '.join(missing_fields)}"}, status=400)

            # Check for unique username and email
            if UserRegistration.objects.filter(username=data['username']).exists():
                return JsonResponse({"error": "Username already exists."}, status=409)
            if UserRegistration.objects.filter(email=data['email']).exists():
                return JsonResponse({"error": "Email already exists."}, status=409)

            # Create a new user instance
            user = UserRegistration(
                username=data['username'],
                email=data['email'],
                phone_number=data.get('phone_number'),
                role=data.get('role'),
                organization=data.get('organization'),
                department=data.get('department'),
                location=data.get('location'),
                surname=data.get('surname'),
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
            )

            # Set the password using set_password method
            user.set_password(data['password'])
            user.save()

            return JsonResponse({"message": "User registered successfully!"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method"}, status=405)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Authenticate user
            user = UserRegistration.objects.filter(username=username).first()
            if user and user.check_password(password):
                return JsonResponse({"message": "Login successful!", "username": user.username}, status=200)
            else:
                return JsonResponse({"error": "Invalid username or password."}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid method."}, status=405)
