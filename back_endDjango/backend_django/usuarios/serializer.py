from rest_framework import serializers
from usuarios.models import Todo
from django.contrib.auth.models import User
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password_confirmation = serializers.CharField(write_only=True, required=False, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ["id", "username", "password", "password_confirmation"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        """
        Validate that the passwords match only if password_confirmation is provided.
        """
        password = data.get('password')
        password_confirmation = data.get('password_confirmation')

        if password_confirmation and password != password_confirmation:
            raise serializers.ValidationError("Las contraseñas no coinciden.")

        return data

    def create(self, validated_data):
        """
        Create and return a new `User` instance, given the validated data.
        """
        # Remove password_confirmation from the validated data
        validated_data.pop('password_confirmation', None)
        return super().create(validated_data)

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields ='__all__'
