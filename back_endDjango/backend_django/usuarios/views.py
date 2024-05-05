from django.shortcuts import render
from rest_framework.permissions import AllowAny,IsAdminUser,IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework import generics,permissions,status
from usuarios import serializer
from usuarios.models import Todo
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
import json


# User
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = serializer.UserSerializer
    permission_classes = [AllowAny]

#TodosApisdas
class TodosApiView(generics.ListCreateAPIView):
    queryset = Todo.objects.all().order_by('-id')
    serializer_class= serializer.TodoSerializer

class TodoApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class= serializer.TodoSerializer
    

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    user = request.user
    data = {
        'username': user.username,
        'email': user.email,
        # Otros datos que desees devolver
    }
    return Response(data)


from django.http import JsonResponse
import requests

def check_user_exists(request):
    email = request.GET.get('email')
    if not email:
        return JsonResponse({'error': 'Missing email parameter'}, status=400)

    try:
        api_key = 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26'
        headers = {
            #'Authorization': f'Bearer {api_key}',
            'User-Agent': 'React'
        }
        response = requests.get(f'https://api.vrchat.cloud/api/1/auth/exists?email={email}', headers=headers)
        data = response.json()
        return JsonResponse(data)
    
    except Exception as e:
        print('Error fetching data:', e)
        return JsonResponse({'error': 'Internal server error'}, status=500)
    
def obtener_datos_usuario(request):
    cookie = 'authcookie_d43f0d2a-89e2-4d50-8a10-49d9a416c0da' #request.GET.get('cookie')
    cookie2 = 'auth='
    cookiefinal = cookie2+cookie
    usuario_id = request.GET.get('usuario_id')
    print(cookie)

    try:
        api_key = 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26'
        headers = {
            #'Authorization': f'Bearer {api_key}',
            'User-Agent': 'React',
            'Cookie': cookiefinal
        }
        response = requests.get(f'https://api.vrchat.cloud/api/1/users/{usuario_id}', headers=headers)
        data = response.json()
        return JsonResponse(data)
    
    except Exception as e:
        print('Error fetching data:', e)
        return JsonResponse({'error': 'Internal server error'}, status=500)
    