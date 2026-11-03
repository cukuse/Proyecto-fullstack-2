import React, { useState } from 'react';
import ModalBoleta from './ModalBoleta';

function AdminTablaVentas({ ventas, setVentas, registrarActividad }) {
  const [boletaSeleccionada, setBoletaSeleccionada] = useState(null);

  const handleEliminarVenta = (id) => {
    if (window.confirm(`¿Seguro que deseas anular/eliminar la orden ${id}?`)) {
      setVentas(prev => prev.filter(v => v.id !== id));
      registrarActividad(`Admin eliminó la orden #${id}`, 'admin');
    }
  };

  return (
    <section className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
        <span>🧾 Gestión de Ventas, Órdenes y Boletas ({ventas.length})</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-secondary">
            <tr>
              <th>ID Venta</th>
              <th>Cliente</th>
              <th>Evento</th>
              <th>Fecha</th>
              <th>Monto Total</th>
              <th>Estado</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted py-4">No hay ventas registradas.</td>
              </tr>
            ) : (
              ventas.map((v) => (
                <tr key={v.id}>
                  <td><strong>#{v.id}</strong></td>
                  <td>{v.cliente}</td>
                  <td>{v.evento}</td>
                  <td>{v.fecha}</td>
                  <td className="fw-bold text-success">${Number(v.monto).toLocaleString('es-CL')}</td>
                  <td>
                    <span className={`badge ${v.estado === 'Completado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {v.estado}
                    </span>
                  </td>
                  <td className="text-center">
                    <button 
                      className="btn btn-sm btn-outline-dark me-2"
                      onClick={() => setBoletaSeleccionada(v)}
                    >
                      👁️ Ver Boleta / Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminarVenta(v.id)}
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

      {boletaSeleccionada && (
        <ModalBoleta 
          venta={boletaSeleccionada}
          setVentas={setVentas}
          registrarActividad={registrarActividad}
          onClose={() => setBoletaSeleccionada(null)}
        />
      )}
    </section>
  );
}

export default AdminTablaVentas;