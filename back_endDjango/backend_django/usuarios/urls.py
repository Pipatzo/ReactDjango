from usuarios import views
from django.urls import path
from django.urls import include, path
from usuarios.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = "app_usuarios"

urlpatterns = [
     path('api/auth/exists/', views.check_user_exists, name='check_user_exists'),
     path('api/obtener-datos-usuario/', views.obtener_datos_usuario, name='datos_usuario'),
    
]
