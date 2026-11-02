import React from 'react';

function FiltroCatalogo({ 
    busqueda, 
    setBusqueda, 
    categoriaSeleccionada, 
    setCategoriaSeleccionada 
}) {
    // Lista de categorías para los botones
    const categorias = [
        { id: 'todas', label: 'Todos' },
        { id: 'matrimonios', label: '💍 Matrimonios' },
        { id: 'cumpleanos', label: '🎂 Cumpleaños' },
        { id: 'corporativos', label: '💼 Corporativos' },
        { id: 'ofertas', label: '🔥 Solo Ofertas', esOferta: true }
    ];

    return (
        <section className="contenedor-filtros">
            <form className="barra-filtros" onSubmit={(e) => e.preventDefault()}>
                
                {/* 1. Caja de búsqueda por texto */}
                <div className="caja-busqueda">
                    <span className="icono-lupa">🔍</span>
                    <input 
                        type="text" 
                        placeholder="Buscar evento por nombre..." 
                        className="input-buscar"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                {/* 2. Botones de categorías (Chips) */}
                <div className="categorias-chips">
                    {categorias.map((cat) => (
                        <button
                            key={cat.id}
                            type="button"
                            className={`btn-chip ${cat.esOferta ? 'chip-oferta' : ''} ${categoriaSeleccionada === cat.id ? 'active' : ''}`.trim()}
                            onClick={() => setCategoriaSeleccionada(cat.id)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </form>
        </section>
    );
}

export default FiltroCatalogo;