import React from 'react';

function AdminBitacora({ historial }) {
  return (
    <section className="card shadow-sm mb-4">
      <div className="card-header bg-dark text-white fw-bold">
        📜 Bitácora de Registro (Actividad Admin & Cliente)
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Fecha y Hora</th>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acción Realizada</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((reg) => (
              <tr key={reg.id}>
                <td><small className="text-muted">{reg.fecha}</small></td>
                <td className="fw-semibold">{reg.usuario}</td>
                <td>
                  <span className={`badge ${reg.rol === 'admin' ? 'bg-primary' : 'bg-info text-dark'}`}>
                    {reg.rol.toUpperCase()}
                  </span>
                </td>
                <td>{reg.accion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminBitacora;