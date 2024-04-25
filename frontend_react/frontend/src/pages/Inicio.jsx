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
import Base from "./Base"
import Spline from '@splinetool/react-spline';

function Inicio() {


    return (
        <>
            <Base></Base>
            <Spline scene="https://prod.spline.design/l0GALZTocrUexJLn/scene.splinecode" />
        </>
    )
}

export default Inicio;
