from django.contrib.auth.middleware import get_user

class JWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = get_user(request)
        request.user = user
        return self.get_response(request)