import React, { useState } from 'react';
import TarjetaEvento from '../components/TarjetaEvento';
import FiltroCatalogo from '../components/FiltroCatalogo'; // Importamos el filtro
import '../css/estilo.css';
import '../css/catalogo.css';

function Catalogo({ agregarAlCarrito }) {
    // Estados para controlar la búsqueda y la categoría seleccionada
    const [busqueda, setBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

    // Lista de eventos con su categoría asignada
    const eventos = [
        { id: 1, titulo: "Boda al aire libre", categoria: "matrimonios", aforo: "Aforo: 50 personas", precio: 150000, imagen: "/img/boda-catalgo.jpg", oferta: false },
        { id: 2, titulo: "Cumpleaños Temático", categoria: "cumpleanos", aforo: "Aforo: 30 personas", precio: 80000, precioAnterior: 100000, imagen: "/img/cumple-catalogo.jpg", oferta: true },
        { id: 3, titulo: "Evento Corporativo", categoria: "corporativos", aforo: "Aforo: 100 personas", precio: 250000, imagen: "/img/corporativo-catalogo.jpg", oferta: false },
        { id: 4, titulo: "Fiesta de Graduación", categoria: "corporativos", aforo: "Aforo: 80 personas", precio: 180000, precioAnterior: 220000, imagen: "/img/graduacion-catalogo.jpg", oferta: true },
        { id: 5, titulo: "Baby Shower Especial", categoria: "cumpleanos", aforo: "Aforo: 25 personas", precio: 60000, imagen: "/img/babyshower-catalogo.jpg", oferta: false },
        { id: 6, titulo: "Aniversario de Bodas", categoria: "matrimonios", aforo: "Aforo: 40 personas", precio: 120000, imagen: "/img/aniversario-catalogo.jpg", oferta: false },
        { id: 7, titulo: "Bautizo Familiar", categoria: "cumpleanos", aforo: "Aforo: 35 personas", precio: 90000, imagen: "/img/bautizo-catalogo.jpg", oferta: false },
        { id: 8, titulo: "Fiesta de Gala", categoria: "corporativos", aforo: "Aforo: 120 personas", precio: 300000, imagen: "/img/gala-catalogo.jpg", oferta: false },
        { id: 9, titulo: "Cena Romántica", categoria: "matrimonios", aforo: "Aforo: 2 personas", precio: 70000, precioAnterior: 90000, imagen: "/img/cenaromantica-catalogo.jpg", oferta: true },
        { id: 10, titulo: "Despedida de Soltero/a", categoria: "cumpleanos", aforo: "Aforo: 20 personas", precio: 110000, imagen: "/img/despedida-catalogo.jpg", oferta: false }
    ];

    // Lógica para filtrar eventos
    const eventosFiltrados = eventos.filter((evento) => {
        // Coincidencia por categoría u ofertas
        const coincideCategoria = 
            categoriaSeleccionada === 'todas' ||
            (categoriaSeleccionada === 'ofertas' && evento.oferta) ||
            evento.categoria === categoriaSeleccionada;

        // Coincidencia por texto ingresado
        const coincideBusqueda = evento.titulo
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        return coincideCategoria && coincideBusqueda;
    });

    return (
        <main className="main-catalogo">
            <h2 className="titulo-seccion">Nuestros Eventos</h2>

            {/* Componente de Filtro */}
            <FiltroCatalogo 
                busqueda={busqueda} 
                setBusqueda={setBusqueda} 
                categoriaSeleccionada={categoriaSeleccionada} 
                setCategoriaSeleccionada={setCategoriaSeleccionada} 
            />

            {/* Lista filtrada en tiempo real */}
            <div className="grilla-catalogo">
                {eventosFiltrados.length === 0 ? (
                    <p>
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