import { Link } from 'react-router-dom';
import Boton from './Boton';
import BotonCarrito from './BotonCarrito';
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
        <Link to="/Blog">
            <Boton className="btn-n">Blog</Boton>
        </Link>
        
        <BotonCarrito totalItems={totalItems}/>
        </nav>
        </>
    )
}
export default Navegacion