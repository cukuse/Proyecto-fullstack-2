import React from 'react';
import Boton from './boton';

function TarjetaEvento({ evento, agregarAlCarrito }) {
    return (
        <div className={`tarjeta-evento ${evento.oferta ? 'oferta' : ''}`}>
            {evento.oferta && <span className="insignia-oferta">🔥 OFERTA</span>}


            <div className="imagen-placeholder">
                <img src={evento.imagen} alt={evento.titulo} />
            </div>

            <h3>{evento.titulo}</h3>
            <p>{evento.aforo}</p>


            <p className="contenedor-precio">
                {evento.precioAnterior && (
                    <span className="precio-anterior">
                        ${evento.precioAnterior.toLocaleString('es-CL')}
                    </span>
                )}
                <span className="precio-evento">
                    ${evento.precio.toLocaleString('es-CL')}
                </span>
            </p>


            <Boton onClick={() => agregarAlCarrito(evento)}>
                Agregar al Carrito
            </Boton>
        </div>
    );
}

export default TarjetaEvento;