import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../css/estilo.css";

function Cabecera() {

    return (
        <>
            <header className="inicio-cabecilla">
                
                <div className="logo">
                    <Link to="/">
                        <img src="/img/logo2.png" alt="Logo"/>
                    </Link> 
                </div>
                
                <div className="icono-usuario">

                    <Link to="/login">
                        <img src="/img/icono-usuario.png" alt="Usuario"/>
                    </Link>
                </div>
            </header> 
        </>
    );
}

export default Cabecera;