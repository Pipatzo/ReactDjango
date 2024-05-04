import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { toaster } from "evergreen-ui";
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import Base from "./Base"

import { Ripple } from 'primereact/ripple';

function Post() {
    const [todos, setTodos] = useState([])
    const [newTodo, setNewTodo] = useState('')

    useEffect(() => {

        const fetchTodos = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8000/api/post/', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setTodos(response.data);

                } catch (error) {
                    console.error('Error fetching todos:', error);
                }
            }
        };

        fetchTodos();
    }, []);

    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Aquí deberías obtener el token JWT del almacenamiento local o de las cookies
        const token = localStorage.getItem(ACCESS_TOKEN);

        // Verifica si hay un token JWT disponible
        if (token) {
            fetch('http://localhost:8000/api/mi-vista-protegida/', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al obtener los datos del usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    setUserData(data);
                })
                .catch(error => {
                    setError(error.message);
                });
        } else {
            setError('No se encontró un token de autenticación');
        }

    }, []);


    const handleChangeTodo = (event) => {
        setNewTodo(event.target.value);
    }

    const createTodo = async (event) => {
        event.preventDefault();

        const token = localStorage.getItem(ACCESS_TOKEN);
        try {
            const response = await axios.post('http://localhost:8000/api/post/', {
                title: newTodo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTodos([response.data, ...todos]);
            setNewTodo('');
        } catch (error) {
            console.error('Error creating todo:', error);
        }
    }

    const deleteTodo = async (todo) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        try {
            await axios.delete(`http://localhost:8000/api/post/${todo.id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTodos(todos.filter(t => t.id !== todo.id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }





    return (
        <>
            <form className="mt-5 mb-3" onSubmit={createTodo}>
                <div className="input-group">
                    <input
                        type="text"
                        placeholder="Ingresa una nueva tarea"
                        className="form-control"
                        onChange={handleChangeTodo}
                        value={newTodo}
                    />
                    <button className="btn btn-primary">+</button>
                </div>
            </form>

            {
                todos.map(todo => (
                    <div key={todo.id} className="d-flex gap-1 justify-content-between align-items-center">
                        <div>
                            <Alert key='light' variant='light'>
                                {todo.title}
                            </Alert>
                        </div>
                        <a href="#" className="small" onClick={() => deleteTodo(todo)}>Eliminar</a>
                    </div>
                ))
            }
        </>
    )
}

export default Post;
