import React, { useState, useEffect } from "react";
import '../styles/inicio.css';
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
import { MegaMenu } from 'primereact/megamenu';
import { Ripple } from 'primereact/ripple';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';
import { StyleClass } from 'primereact/StyleClass';

import Spline from '@splinetool/react-spline';

function Inicio() {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(null);

    const fetchUserData = async () => {
        try {
            const apiKey = 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26';
            const response = await axios.get(`http://localhost:8000/api/auth/exists/?email=${encodeURIComponent(email)}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,

                }
            });
            setResponse(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <>
            <div>
                <div className="p-inputgroup flex-1">
                    <InputText onChange={handleInputChange} type="email" value={email} placeholder="Ingresa tu correo" />
                    <Button onClick={fetchUserData} icon="pi pi-search" className="p-button-warning" />
                </div>
                {response && (
                    <div className="result-container">
                        <h2 className="result-title">Resultado:</h2>
                        <div className="result-content">
                            {response && (
                                <p>{response.userExists ? "Sí" : "No"}</p>
                            )}
                        </div>
                    </div>

                )}
            </div>
            <Spline scene="https://prod.spline.design/l0GALZTocrUexJLn/scene.splinecode" />
        </>
    )
}

export default Inicio;
