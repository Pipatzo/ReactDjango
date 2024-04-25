import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class ProductConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        # Maneja el mensaje recibido del cliente (opcional)
        pass