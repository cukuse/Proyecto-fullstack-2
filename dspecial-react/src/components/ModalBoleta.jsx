import React, { useState } from 'react';

function ModalBoleta({ venta, setVentas, registrarActividad, onClose }) {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosForm, setDatosForm] = useState({ ...venta });

  const handleGuardarVenta = (e) => {
    e.preventDefault();
    setVentas(prev => prev.map(v => v.id === datosForm.id ? datosForm : v));
    registrarActividad(`Admin editó la boleta/orden #${datosForm.id}`, 'admin');
    setModoEdicion(false);
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0">
          
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">
              🧾 Boleta / Comprobante Electrónico #{venta.id}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4">
            {!modoEdicion ? (
              /* VISTA DE LA BOLETA */
              <div className="border p-4 rounded bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                  <div>
                    <h4 className="fw-bold text-danger mb-0">TU DÍA ESPECIAL SpA</h4>
                    <small className="text-muted">RUT: 76.543.210-K • Servicios de Eventos</small>
                  </div>
                  <span className="badge bg-success fs-6">{venta.estado}</span>
                </div>

                <div className="row my-3">
                  <div className="col-6">
                    <p className="mb-1"><strong>Cliente:</strong> {venta.cliente}</p>
                    <p className="mb-1"><strong>Medio de Pago:</strong> {venta.tarjeta || 'Tarjeta'}</p>
                  </div>
                  <div className="col-6 text-end">
                    <p className="mb-1"><strong>Fecha:</strong> {venta.fecha}</p>
                    <p className="mb-1"><strong>Banco:</strong> {venta.banco || 'Banco de Chile'}</p>
                  </div>
                </div>

                <table className="table table-bordered my-3">
                  <thead className="table-secondary">
                    <tr>
                      <th>Descripción del Evento</th>
                      <th className="text-end">Monto Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{venta.evento}</td>
                      <td className="text-end fw-bold">${Number(venta.monto).toLocaleString('es-CL')}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-end fs-4 fw-bold text-danger">
                  Total Pagado: ${Number(venta.monto).toLocaleString('es-CL')}
                </div>
              </div>
            ) : (
              /* FORMULARIO DE EDICIÓN DE LA BOLETA POR ADMIN */
              <form onSubmit={handleGuardarVenta}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Nombre del Cliente</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={datosForm.cliente} 
                      onChange={(e) => setDatosForm({ ...datosForm, cliente: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Monto ($ CLP)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={datosForm.monto} 
                      onChange={(e) => setDatosForm({ ...datosForm, monto: Number(e.target.value) })}
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Estado de la Orden</label>
                    <select 
                      className="form-select" 
                      value={datosForm.estado}
                      onChange={(e) => setDatosForm({ ...datosForm, estado: e.target.value })}
                    >
                      <option value="Completado">Completado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="Anulado">Anulado</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">Banco</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={datosForm.banco || ''} 
                      onChange={(e) => setDatosForm({ ...datosForm, banco: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-bold">Detalle del Evento</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={datosForm.evento} 
                      onChange={(e) => setDatosForm({ ...datosForm, evento: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-4 text-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={() => setModoEdicion(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-danger">
                    Guardar Cambios en Boleta
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="modal-footer bg-light">
            {!modoEdicion ? (
              <>
                <button type="button" className="btn btn-outline-primary" onClick={() => setModoEdicion(true)}>
                  ✏️ Editar Datos de esta Boleta
                </button>
                <button type="button" className="btn btn-dark" onClick={onClose}>
                  Cerrar
                </button>
              </>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ModalBoleta;