import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Perfil({ usuario, setUsuario, setUsuarios, registrarActividad }) {
  const navigate = useNavigate();

  if (!usuario) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning shadow-sm d-inline-block p-4">
          <h4>🔒 Sesión no iniciada</h4>
          <p>Debes iniciar sesión para ver y editar tu perfil.</p>
          <button className="btn btn-dark" onClick={() => navigate('/login')}>
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const [nombre, setNombre] = useState(usuario.nombre || '');
  const [email, setEmail] = useState(usuario.email || '');
  const [telefono, setTelefono] = useState(usuario.telefono || '+56 9 1234 5678');
  const [direccion, setDireccion] = useState(usuario.direccion || 'Av. Providencia 1234, Santiago');
  const [foto, setFoto] = useState(usuario.foto || '');
  const [mensajeGuardado, setMensajeGuardado] = useState(false);

  // Convertir imagen seleccionada a Base64
  const handleSubirFotoLocal = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("La imagen debe ser menor a 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioActualizado = {
      ...usuario,
      nombre,
      email,
      telefono,
      direccion,
      foto
    };

    // Actualiza sesión actual y listado general
    setUsuario(usuarioActualizado);
    if (setUsuarios) {
      setUsuarios(prev => prev.map(u => u.id === usuario.id ? usuarioActualizado : u));
    }

    registrarActividad(`Usuario ${usuario.nombre} actualizó su perfil y foto`, usuario.rol);

    setMensajeGuardado(true);
    setTimeout(() => setMensajeGuardado(false), 3000);
  };

  return (
    <main className="container py-4" style={{ maxWidth: '700px' }}>
      <div className="card shadow border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <h4 className="mb-0 fw-bold">👤 Mi Perfil de Usuario</h4>
          <span className={`badge ${usuario.rol === 'admin' ? 'bg-primary' : 'bg-info text-dark'}`}>
            {usuario.rol.toUpperCase()}
          </span>
        </div>

        <div className="card-body p-4">
          {mensajeGuardado && (
            <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
              ✅ <strong>¡Perfil actualizado con éxito!</strong> Los cambios han sido guardados.
            </div>
          )}

          {/* ÁREA DE FOTO DE PERFIL (SOLO SUBIR ARCHIVO) */}
          <div className="text-center mb-4">
            <div className="position-relative d-inline-block">
              {foto ? (
                <img 
                  src={foto} 
                  alt="Foto de Perfil" 
                  className="rounded-circle shadow border border-3 border-danger"
                  style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                />
              ) : (
                <div 
                  className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center shadow border border-3 border-danger mx-auto"
                  style={{ width: '130px', height: '130px', fontSize: '3.5rem' }}
                >
                  👤
                </div>
              )}
            </div>

            <div className="mt-3">
              <div className="d-flex justify-content-center gap-2">
                <label className="btn btn-dark fw-bold px-3">
                  📁 Subir Imagen
                  <input type="file" accept="image/*" hidden onChange={handleSubirFotoLocal} />
                </label>
                {foto && (
                  <button type="button" className="btn btn-outline-danger" onClick={() => setFoto('')}>
                    🗑️ Eliminar Foto
                  </button>
                )}
              </div>
              <small className="text-muted d-block mt-2">Archivos admitidos: JPG, PNG (Máx. 2MB)</small>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control" 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Teléfono de Contacto</label>
              <input 
                type="text" 
                className="form-control" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)}
                required 
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Dirección Principal</label>
              <input 
                type="text" 
                className="form-control" 
                value={direccion} 
                onChange={(e) => setDireccion(e.target.value)}
                required 
              />
            </div>

            <div className="d-grid gap-2 mt-4">
              <button type="submit" className="btn btn-danger fw-bold py-2 fs-5">
                💾 Guardar Cambios
              </button>
              {usuario.rol === 'admin' && (
                <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/admin')}>
                  ⚙️ Ir al Panel de Administración
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Perfil;