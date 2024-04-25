from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from consumers import ProductConsumer

websocket_urlpatterns = [
    path('/api/post/', ProductConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    'websocket': URLRouter(websocket_urlpatterns),
})