import React, { useState } from 'react';

function AdminTablaUsuarios({ usuarios, setUsuarios, registrarActividad }) {
  const [usuarioEditar, setUsuarioEditar] = useState(null);

  const handleGuardarUsuario = (e) => {
    e.preventDefault();
    setUsuarios(prev => prev.map(u => u.id === usuarioEditar.id ? usuarioEditar : u));
    registrarActividad(`Admin modificó la cuenta de: ${usuarioEditar.nombre}`, 'admin');
    setUsuarioEditar(null);
  };

  const handleEliminarUsuario = (id, nombre) => {
    if (window.confirm(`¿Seguro que deseas eliminar al usuario "${nombre}"?`)) {
      setUsuarios(prev => prev.filter(u => u.id !== id));
      registrarActividad(`Admin eliminó al usuario: ${nombre}`, 'admin');
    }
  };

  return (
    <section className="card shadow-sm mb-4 border-0">
      <div className="card-header bg-dark text-white fw-bold d-flex justify-content-between align-items-center">
        <span>👥 Usuarios Registrados ({usuarios.length})</span>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-secondary">
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Teléfono</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.foto ? (
                    <img 
                      src={u.foto} 
                      alt={u.nombre} 
                      className="rounded-circle border"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      👤
                    </div>
                  )}
                </td>
                <td className="fw-bold">{u.nombre}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`badge ${u.rol === 'admin' ? 'bg-primary' : 'bg-info text-dark'}`}>
                    {u.rol.toUpperCase()}
                  </span>
                </td>
                <td>{u.telefono || 'Sin registro'}</td>
                <td className="text-center">
                  <button 
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setUsuarioEditar(u)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleEliminarUsuario(u.id, u.nombre)}
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DE EDICIÓN DE USUARIO POR ADMIN */}
      {usuarioEditar && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">✏️ Editar Usuario (Admin)</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setUsuarioEditar(null)}></button>
              </div>
              <form onSubmit={handleGuardarUsuario}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nombre</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={usuarioEditar.nombre} 
                      onChange={(e) => setUsuarioEditar({ ...usuarioEditar, nombre: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Correo Electrónico</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={usuarioEditar.email} 
                      onChange={(e) => setUsuarioEditar({ ...usuarioEditar, email: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">URL de Foto de Perfil</label>
                    <input 
                      type="url" 
                      className="form-control" 
                      value={usuarioEditar.foto || ''} 
                      onChange={(e) => setUsuarioEditar({ ...usuarioEditar, foto: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Rol</label>
                    <select 
                      className="form-select" 
                      value={usuarioEditar.rol}
                      onChange={(e) => setUsuarioEditar({ ...usuarioEditar, rol: e.target.value })}
                    >
                      <option value="cliente">Cliente</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Teléfono</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={usuarioEditar.telefono || ''} 
                      onChange={(e) => setUsuarioEditar({ ...usuarioEditar, telefono: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setUsuarioEditar(null)}>Cancelar</button>
                  <button type="submit" className="btn btn-danger">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminTablaUsuarios;