import React, { useState, useEffect } from "react";
import '../styles/inicio.css';
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingIndicator from "../components/LoadingIndicator"
import Alert from 'react-bootstrap/Alert';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import { toaster } from "evergreen-ui";
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import { MegaMenu } from 'primereact/megamenu';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Ripple } from 'primereact/ripple';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Sidebar } from 'primereact/sidebar';
import { PanelMenu } from 'primereact/panelmenu';
import { StyleClass } from 'primereact/StyleClass';

import Spline from '@splinetool/react-spline';

function BusacrId() {
    const [cargando, setCargando] = useState(false)
    const [cookie, setCookie] = useState('');
    const [usuario_id, setUsuario_id] = useState('');
    const [datosUsuarios, setDatosUsuarios] = useState(null);

    const fetchUserdetalle = async () => {
        setCargando(true);
        try {

            const apiKey = 'JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26';
            const datosUsuarios = await axios.get(`http://localhost:8000/api/obtener-datos-usuario/?cookie=${encodeURIComponent(cookie)}&usuario_id=${encodeURIComponent(usuario_id)}`, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,

                }
            });
            setDatosUsuarios(datosUsuarios.data);
            console.log(datosUsuarios)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setCargando(false);
    };

    const handelCookie = (event) => {
        setCookie(event.target.value);
    };
    const handelUsuario_id = (event) => {
        setUsuario_id(event.target.value);
    };

    return (
        <>
            <div>
                <div className="p-inputgroup flex-1 p-5">
                    <InputText onChange={handelCookie} value={cookie} placeholder="Ingresa tu cookie" />
                    <InputText onChange={handelUsuario_id} value={usuario_id} placeholder="Ingresa tu usuario ID" />
                    <Button onClick={fetchUserdetalle} className="p-button-primary" >
                        {cargando ? (
                            <LoadingIndicator></LoadingIndicator>
                        ) : (
                            <i className="pi pi-search"></i>
                        )}
                    </Button>
                </div>
                {datosUsuarios && (
                    <Card>
                        <h2 className="result-title">Resultado:</h2>
                        <div className="result-content">
                            {datosUsuarios ? (
                                <div className="container">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="row">


                                                        {
                                                            datosUsuarios.currentAvatarImageUrl ? (
                                                                <div className="col" >
                                                                    <Badge value="Avatar Imagen" severity="danger" />
                                                                    <div>
                                                                        <Image src={datosUsuarios.currentAvatarImageUrl} preview alt="Image" height="200" />
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                        }




                                                        {
                                                            datosUsuarios.userIcon ? (
                                                                <div className="col">
                                                                    <Badge value="+VrChatPlus Imagen" severity="warning"></Badge>
                                                                    <div>
                                                                        <Image src={datosUsuarios.userIcon} preview alt="Image" height="200"></Image>
                                                                    </div>
                                                                </div>
                                                            ) : null
                                                        }
                                                    </div>
                                                    {
                                                        datosUsuarios.profilePicOverride ? (

                                                            <div className="col">
                                                                <Badge value="Banner" severity="secondary" />
                                                                <div>
                                                                    <Image src={datosUsuarios.profilePicOverride} preview alt="Image" height="200" />
                                                                </div>
                                                            </div>
                                                        ) : null
                                                    }


                                                </div>
                                                <div className="col-8">
                                                    <h1 className="card-title">{datosUsuarios.displayName}:
                                                        {
                                                            datosUsuarios.displayName == ''
                                                        }
                                                        <Badge value={datosUsuarios.id} severity="danger"></Badge></h1>
                                                    <Card>
                                                        <ScrollPanel style={{ width: '100%', height: '200px' }}>
                                                            <h2 >Biografía: </h2>
                                                            <div className="biography">
                                                                {datosUsuarios.bio.split('\n').map((linea, index) => (
                                                                    <p key={index}>{linea.trim()}</p>
                                                                ))}
                                                            </div>
                                                        </ScrollPanel>
                                                    </Card>
                                                </div>
                                            </div>
                                            <hr />


                                            <p className="card-text">Bio Links: {datosUsuarios.bioLinks ? datosUsuarios.bioLinks : null}</p>
                                            <p className="card-text">Status Description: {datosUsuarios.statusDescription ? (datosUsuarios.statusDescription) : null}</p>
                                            <p className="card-text">Pronouns: {datosUsuarios.pronouns ? (datosUsuarios.pronouns) : null}</p>
                                            <p className="card-text">Username: {datosUsuarios.username}</p>
                                            <p className="card-text">Past Display Names: {datosUsuarios.pastDisplayNames}</p>
                                            <p className="card-text">Has Email: {datosUsuarios.hasEmail}</p>
                                            <p className="card-text">Has Pending Email: {datosUsuarios.hasPendingEmail}</p>
                                            <p className="card-text">Obfuscated Email: {datosUsuarios.obfuscatedEmail}</p>
                                            <p className="card-text">Obfuscated Pending Email: {datosUsuarios.obfuscatedPendingEmail}</p>
                                            <p className="card-text">Email Verified: {datosUsuarios.emailVerified}</p>
                                            <p className="card-text">Has Birthday: {datosUsuarios.hasBirthday}</p>
                                            <p className="card-text">Hide Content Filter Settings: {datosUsuarios.hideContentFilterSettings}</p>
                                            <p className="card-text">Unsubscribe: {datosUsuarios.unsubscribe}</p>
                                            <p className="card-text">Status History: {datosUsuarios.statusHistory}</p>
                                            <p className="card-text">Status First Time: {datosUsuarios.statusFirstTime}</p>
                                            <p className="card-text">Friend Group Names: {datosUsuarios.friendGroupNames}</p>
                                            <p className="card-text">Queued Instance: {datosUsuarios.queuedInstance}</p>
                                            <p className="card-text">User Language: {datosUsuarios.userLanguage}</p>
                                            <p className="card-text">User Language Code: {datosUsuarios.userLanguageCode}</p>
                                            <p className="card-text">Current Avatar Image URL: {datosUsuarios.currentAvatarImageUrl}</p>
                                            <p className="card-text">Current Avatar Thumbnail Image URL: {datosUsuarios.currentAvatarThumbnailImageUrl}</p>
                                            <p className="card-text">Current Avatar Tags: {datosUsuarios.currentAvatarTags}</p>
                                            <p className="card-text">Current Avatar: {datosUsuarios.currentAvatar}</p>
                                            <p className="card-text">Current Avatar Asset URL: {datosUsuarios.currentAvatarAssetUrl}</p>
                                            <p className="card-text">Fallback Avatar: {datosUsuarios.fallbackAvatar}</p>
                                            <p className="card-text">Account Deletion Date: {datosUsuarios.accountDeletionDate}</p>
                                            <p className="card-text">Account Deletion Log: {datosUsuarios.accountDeletionLog}</p>
                                            <p className="card-text">Accepted TOS Version: {datosUsuarios.acceptedTOSVersion}</p>
                                            <p className="card-text">Accepted Privacy Version: {datosUsuarios.acceptedPrivacyVersion}</p>
                                            <p className="card-text">Oculus ID: {datosUsuarios.oculusId}</p>
                                            <p className="card-text">Pico ID: {datosUsuarios.picoId}</p>
                                            <p className="card-text">Vive ID: {datosUsuarios.viveId}</p>
                                            <p className="card-text">Has Logged In From Client: {datosUsuarios.hasLoggedInFromClient}</p>
                                            <p className="card-text">Home Location: {datosUsuarios.homeLocation}</p>
                                            <p className="card-text">Two Factor Auth Enabled: {datosUsuarios.twoFactorAuthEnabled}</p>
                                            <p className="card-text">Two Factor Auth Enabled Date: {datosUsuarios.twoFactorAuthEnabledDate}</p>
                                            <p className="card-text">Updated At: {datosUsuarios.updated_at}</p>
                                            <p className="card-text">State: {datosUsuarios.state}</p>
                                            <p className="card-text">Last Mobile: {datosUsuarios.last_mobile}</p>
                                            <p className="card-text">Tags: {datosUsuarios.tags}</p>
                                            <p className="card-text">Developer Type: {datosUsuarios.developerType}</p>
                                            <p className="card-text">Last Login: {datosUsuarios.last_login}</p>
                                            <p className="card-text">Last Platform: {datosUsuarios.last_platform}</p>
                                            <p className="card-text">Allow Avatar Copying: {datosUsuarios.allowAvatarCopying}</p>
                                            <p className="card-text">Status: {datosUsuarios.status}</p>
                                            <p className="card-text">Date Joined: {datosUsuarios.date_joined}</p>
                                            <p className="card-text">Is Friend: {datosUsuarios.isFriend}</p>
                                            <p className="card-text">Friend Key: {datosUsuarios.friendKey}</p>
                                            <p className="card-text">Last Activity: {datosUsuarios.last_activity}</p>
                                            <p className="card-text">World ID: {datosUsuarios.worldId}</p>
                                            <p className="card-text">Instance ID: {datosUsuarios.instanceId}</p>
                                            <p className="card-text">Location: {datosUsuarios.location}</p>
                                            <p className="card-text">Traveling To World: {datosUsuarios.travelingToWorld}</p>
                                            <p className="card-text">Traveling To Instance: {datosUsuarios.travelingToInstance}</p>
                                            <p className="card-text">Traveling To Location: {datosUsuarios.travelingToLocation}</p>
                                            <p className="card-text">Friend Request Status: {datosUsuarios.friendRequestStatus}</p>
                                            <p className="card-text">Note: {datosUsuarios.note}</p>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p>NO EXISTE</p>
                            )}
                        </div>
                    </Card>

                )}
            </div >
        </>
    )
}

export default BusacrId;
