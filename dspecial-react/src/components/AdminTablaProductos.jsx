import React from 'react';

function AdminTablaProductos({ productos, onEliminarProducto }) {
  return (
    <section className="card shadow-sm mb-4">
      <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
        <span>📦 Inventario de Productos ({productos.length})</span>
      </div>
      
      {/* table-responsive: Permite scroll horizontal en celulares si la tabla es ancha */}
      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle mb-0">
          <thead className="table-secondary">
            <tr>
              <th>ID</th>
              <th>Evento</th>
              <th>Categoría</th>
              <th>Aforo</th>
              <th>Precio</th>
              <th>Estado</th>
              <th className="text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">
                  No hay productos registrados en el catálogo.
                </td>
              </tr>
            ) : (
              productos.map((prod) => (
                <tr key={prod.id}>
                  <td><small className="text-muted">#{prod.id}</small></td>
                  <td className="fw-bold">{prod.titulo}</td>
                  <td>
                    <span className="badge bg-light text-dark border">
                      {prod.categoria}
                    </span>
                  </td>
                  <td>{prod.aforo}</td>
                  <td className="fw-bold text-success">
                    ${Number(prod.precio).toLocaleString('es-CL')}
                  </td>
                  <td>
                    {prod.oferta ? (
                      <span className="badge bg-danger">🔥 Oferta</span>
                    ) : (
                      <span className="badge bg-secondary">Normal</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onEliminarProducto(prod.id, prod.titulo)}
                      title="Eliminar evento"
                    >
                      🗑️ Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminTablaProductos;