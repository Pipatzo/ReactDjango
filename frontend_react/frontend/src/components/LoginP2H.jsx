import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/LoginP2H.css"
import LoadingIndicator from "./LoadingIndicator";
import { Button } from 'primereact/button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toaster } from 'evergreen-ui'



function Login({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Panel P2H" : "Registrar";

    const [validated, setValidated] = useState(false);

    const ValidationHandle = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };



    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password, password_confirmation })


            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                toaster.success('¡Inicio de sesión correctamente!', {
                    description: '¡Bienvenido de nuevo, ' + username + '!', duration: 50,
                });
                navigate("/");
            } else if (method === "register") {
                console.log(username, password, password_confirmation)
                console.log('Respuesta de la API:', res.data);

                toaster.success('¡Registro de usuario correctamente!', {
                    description: '¡Se ha creado tu usuario correctamente, ' + username + '!', duration: 50,
                });
                navigate("/");
            } else {
                navigate("/login");
            }


        } catch (error) {
            console.error('Error al enviar los datos:', error);
            toaster.danger('Ha ocurrido un error, vuelve a intentarlo.');
        } finally {
            setLoading(false);
        }
    };



    return (
        <>

            <Card style={{ width: '25rem', marginTop: '100px', borderRadius: '16px', backgroundColor: '#17202A' }} className="container-fluid">
                <Card.Img style={{ width: '100px', marginLeft: '140px', marginTop: '20px' }} variant="top" src="naruto.png"></Card.Img>
                <Card.Body>
                    <Card.Title ><h1 style={{ textAlign: 'center' }}>{name}</h1></Card.Title>
                    <hr></hr>
                    <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event) && ValidationHandle(event)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Usuario"
                                className="mb-4"
                            >
                                <Form.Control type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Usuario" />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel
                                controlId="floatingPassword"
                                label="Contraseña"
                                className="mb-3"
                            >
                                <Form.Control type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña" />
                                <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                            </FloatingLabel>
                            {method === "register" && (
                                <FloatingLabel
                                    label="Repetir contraseña"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="password"
                                        required
                                        value={password_confirmation}
                                        onChange={(e) => setPassword_confirmation(e.target.value)}
                                        placeholder="Repetir contraseña"
                                    />
                                    <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
                                </FloatingLabel>
                            )}

                        </Form.Group>
                        <div className="d-flex" style={{ justifyContent: 'center' }}>
                            <Button severity="danger" style={{paddingInline:'145px' , borderRadius: '12px', display: 'flex', alignItems: 'center' ,textAlign:'center'}} variant="outline-danger" type="submit">
                                Ingresar {loading && <LoadingIndicator />}</Button>
                        </div>
                    </Form>
                    <div>
                        {method === "login" ? (
                        
                        <Link  style={{ borderRadius:'12px'}} to="/register" variant="outline-secondary">Registrar</Link>

                        ) :
                            (<Link style={{ borderRadius: '12px' }} to="/login" variant="outline-secondary">Volver al Login</Link>)}

                    </div>
                </Card.Body>
            </Card >


        </>
    );
}

export default Login