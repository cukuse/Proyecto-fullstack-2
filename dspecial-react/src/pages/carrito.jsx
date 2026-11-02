import React from 'react';
import { Link } from 'react-router-dom';
import Boton from '../components/boton';
import '../css/catalogo.css';

function Carrito({ carrito = [], setCarrito }) {
    const cantidadEventos = carrito.length;
    const totalPagar = carrito.reduce((suma, evento) => suma + Number(evento.precio || 0), 0);

    const handleVaciar = () => {
        if (setCarrito) setCarrito([]);
    };

    const handleEliminarItem = (indexAEliminar) => {
        if (setCarrito) {
            setCarrito(carrito.filter((_, index) => index !== indexAEliminar));
        }
    };

    return (
        <main className="main-carrito">
            <h2 className="titulo-seccion">Detalle de tu Carrito</h2>

            <div className="contenedor-carrito">
                <div className="lista-carrito">
                    {carrito.length === 0 ? (
                        <p>No tienes eventos en tu carrito aún.</p>
                    ) : (
                        carrito.map((item, index) => (
                            <div key={index} className="item-carrito" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <div>
                                    <h4>{item.titulo}</h4>
                                    <p>${Number(item.precio).toLocaleString('es-CL')}</p>
                                </div>
                                <Boton onClick={() => handleEliminarItem(index)}>
                                    ❌
                                </Boton>
                            </div>
                        ))
                    )}
                </div>

                <div className="resumen-compra">
                    <h3>Resumen de Reserva</h3>
                    
                    <div className="linea-resumen">
                        <span>Cantidad de eventos:</span>
                        <span>{cantidadEventos}</span>
                    </div>

                    <div className="linea-resumen total">
                        <span>Total a Pagar:</span>
                        <strong>${totalPagar.toLocaleString('es-CL')}</strong>
                    </div>
                    
                    <Boton className="btn-pagar" onClick={() => alert('¡Gracias por tu reserva!')}>
                        Proceder al Pago
                    </Boton>
                    
                    <Boton className="btn-vaciar" onClick={handleVaciar}>
                        Vaciar Carrito
                    </Boton>

                    <Link to="/catalogo" className="link-volver">
                        ← Volver al Catálogo
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Carrito;