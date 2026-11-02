import React from "react";
import { Link } from "react-router-dom";
import Boton from "./Boton";

function BotonCarrito({ totalItems = 0 }) {
    return (
        <Link to="/carrito">
            <Boton className="btn-carrito">
                🛒 Carrito ({totalItems})
            </Boton>
        </Link>
    );
}

export default BotonCarrito;