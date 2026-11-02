import React from 'react';

function AdminStats({ totalRecaudado, totalProductos, totalVentas, metaVentas = 1000000 }) {
  // Cálculo del porcentaje dinámico de la meta de ventas
  const porcentajeMeta = Math.min(Math.round((totalRecaudado / metaVentas) * 100), 100);

  return (
    <section className="mb-4">
      {/* row: Fila de Bootstrap */}
      <div className="row g-3">
        
        {/* Tarjeta 1: Ingresos Totales */}
        <div className="col-12 col-md-4">
          <div className="card bg-dark text-white shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary fs-6">💰 Ingresos Totales</h5>
              <p className="card-text fs-2 fw-bold mb-1">
                ${totalRecaudado.toLocaleString('es-CL')}
              </p>
              <span className="badge bg-success">{totalVentas} ventas registradas</span>
            </div>
          </div>
        </div>

        {/* Tarjeta 2: Productos en Catálogo */}
        <div className="col-12 col-md-4">
          <div className="card bg-dark text-white shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary fs-6">📦 Catálogo Activo</h5>
              <p className="card-text fs-2 fw-bold mb-1">
                {totalProductos}
              </p>
              <span className="badge bg-info text-dark">Eventos disponibles</span>
            </div>
          </div>
        </div>

        {/* Tarjeta 3: Meta de Ventas con Barra de Porcentaje */}
        <div className="col-12 col-md-4">
          <div className="card bg-dark text-white shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title text-secondary fs-6">🎯 Meta Mensual ({porcentajeMeta}%)</h5>
              
              {/* Contenedor de la Barra de Progreso de Bootstrap */}
              <div className="progress mt-3" style={{ height: '16px' }}>
                <div 
                  className="progress-bar progress-bar-striped progress-bar-animated bg-danger" 
                  role="progressbar" 
                  style={{ width: `${porcentajeMeta}%` }} 
                  aria-valuenow={porcentajeMeta} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {porcentajeMeta}%
                </div>
              </div>

              <div className="d-flex justify-content-between fs-6 text-secondary mt-2">
                <small>$0</small>
                <small>Meta: ${metaVentas.toLocaleString('es-CL')}</small>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AdminStats;