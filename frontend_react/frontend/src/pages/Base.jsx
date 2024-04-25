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
import { MegaMenu } from 'primereact/megamenu';
import { Ripple } from 'primereact/ripple';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';
import { StyleClass } from 'primereact/StyleClass';

function Base() {
    const [visible, setVisible] = useState(false);
    function CerrarSesion() {
        localStorage.clear();
        toaster.notify('Sesión cerrada correctamente hasta luego.')
    }

    return (
        <>
            <Sidebar visible={visible} onHide={() => setVisible(false)}>
                <h2>Menu</h2>

            </Sidebar>

            <div className="row">
                <div class="nav navbar ">
                    <ul  class="nav "  >
                        <li class="nav-item">
                            <Button icon="pi pi-bars" severity="danger" onClick={() => setVisible(true)} />
                        </li>
                        <li class="nav-item" style={{ paddingTop: '5px' }} >

                            <a type="button" class="nav-link active btn" href="/">
                                <span style={{ paddingRight: '6px' }} className="pi pi-home"> </span>
                                Inicio
                            </a>

                        </li>
                        <li class="nav-item" style={{ paddingTop: '5px' }} >
                            <a type="button" class="nav-link btn" href="/post">
                                <span style={{ paddingRight: '6px' }} className="pi pi-book"> </span>
                                Posts
                            </a>
                        </li>
                        <li class="nav-item" style={{ paddingTop: '5px' }} >
                            <a type="button" class="nav-link btn" href="/pokeWea">
                                <span style={{ paddingRight: '6px' }} className="pi pi-microsoft"> </span>
                                PokeWea
                            </a>
                        </li>
                
                    </ul>
                    
                    
                    <a className="btn btn-info" href="/logout" onClick={CerrarSesion}><span style={{ paddingRight: '6px' }} className="pi pi-sign-out"></span>Salir</a>

                </div>
            </div>
        </>
    )
}

export default Base;
