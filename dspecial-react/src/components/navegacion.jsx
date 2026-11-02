import { Link } from 'react-router-dom';
import Boton from './boton';
import BotonCarrito from './botonCarrito';
import React from 'react';

function Navegacion({totalItems}) {
    return (
        <>
        <nav>
        <Link to="/">
            <Boton  className="btn-n">Inicio</Boton>
        </Link>
        <Link to="/catalogo">
            <Boton className="btn-n">Catalogo De Eventos</Boton>
        </Link>
        <Link to="/contacto">
            <Boton className="btn-n">Contactanos</Boton>
        </Link>
        <Link to="/Nosotros">
            <Boton className="btn-n">¿Quienes Somos?</Boton>
        </Link>
        <Link to="/blog">
            <Boton className="btn-n">Blog</Boton>
        </Link>
        
        <BotonCarrito totalItems={totalItems}/>
        </nav>
        </>
    )
}
export default Navegacion