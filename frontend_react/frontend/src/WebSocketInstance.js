class WebSocketInstance {
    constructor() {
      this.socket = null;
      this.callbacks = {};
    }
  
    connect() {
      this.socket = new WebSocket('ws://localhost:8000/api/post/'); // Esta URL debe ser la misma que configuraste en tu backend Django
      this.socket.onopen = () => {
        console.log('Conexión WebSocket establecida');
      };
      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.callbacks['productUpdate'](data); // Llama a la función de devolución de llamada para manejar la actualización de productos
      };
      this.socket.onclose = () => {
        console.log('Conexión WebSocket cerrada');
      };
    }
  
    disconnect() {
      this.socket.close();
    }
  
    addCallbacks(callback) {
      this.callbacks['productUpdate'] = callback;
    }
  }
  
  const instance = new WebSocketInstance();
  export default instance;