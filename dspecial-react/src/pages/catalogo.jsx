import React, { useState } from 'react';
import TarjetaEvento from '../components/TarjetaEvento';
import FiltroCatalogo from '../components/FiltroCatalogo';
import '../css/estilo.css';
import '../css/catalogo.css';

function Catalogo({ productos = [], agregarAlCarrito }) {
    const [busqueda, setBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

    const eventosFiltrados = productos.filter((evento) => {
        const coincideCategoria = 
            categoriaSeleccionada === 'todas' ||
            (categoriaSeleccionada === 'ofertas' && evento.oferta) ||
            evento.categoria === categoriaSeleccionada;

        const coincideBusqueda = evento.titulo
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        return coincideCategoria && coincideBusqueda;
    });

    return (
        <main className="main-catalogo">
            <h2 className="titulo-seccion">Nuestros Eventos</h2>

            <FiltroCatalogo 
                busqueda={busqueda} 
                setBusqueda={setBusqueda} 
                categoriaSeleccionada={categoriaSeleccionada} 
                setCategoriaSeleccionada={setCategoriaSeleccionada} 
            />

            <div className="grilla-catalogo">
                {eventosFiltrados.length === 0 ? (
                    <p style={{ textAlign: 'center', width: '100%', padding: '30px' }}>
                        🔍 No se encontraron eventos que coincidan con tu búsqueda.
                    </p>
                ) : (
                    eventosFiltrados.map((evento) => (
                        <TarjetaEvento 
                            key={evento.id} 
                            evento={evento} 
                            agregarAlCarrito={agregarAlCarrito} 
                        />
                    ))
                )}
            </div>
        </main>
    );
}

export default Catalogo;