import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import '../styles/NavBar.css'; 

const links = [
    {
        name: "Inicio",
        href: "/",
    },
    {
        name: "Post",
        href: "/post",
    },
    {
        name: "PokeWea",
        href: "/pokewea",
    },


];


const Navbar = () => {
    return (
        <div>
            <ul class="nav" >

                {links.map(x => (
                    <li class="nav-item" style={{ paddingLeft: '5px' }}>
                           <Link to={x.href} className="box" >
                        <Button severity="danger" className="btnweko">
                         {x.name}
                        </Button></Link>
                    </li>
                ))}
                
            </ul>
            
        </div >


    );
};

export default Navbar;