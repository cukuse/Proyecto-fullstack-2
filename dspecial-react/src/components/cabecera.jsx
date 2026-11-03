import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/header.css";

function Cabecera({ usuario, logout }) {
  const navigate = useNavigate();
  const [mostrarModalLogout, setMostrarModalLogout] = useState(false);
  const [mensajeNotificacion, setMensajeNotificacion] = useState('');

  const confirmarCierreSesion = () => {
    setMostrarModalLogout(false);
    logout();
    setMensajeNotificacion('👋 Has cerrado sesión correctamente.');
    navigate('/');

    setTimeout(() => {
      setMensajeNotificacion('');
    }, 3500);
  };

  return (
    <>
      {/* Toast / Banner Notificación de Cierre */}
      {mensajeNotificacion && (
        <div 
          className="bg-dark text-white text-center py-2 px-3 position-fixed top-0 start-50 translate-middle-x shadow-lg" 
          style={{ zIndex: 9999, borderRadius: '0 0 10px 10px', fontSize: '0.95rem' }}
        >
          {mensajeNotificacion}
        </div>
      )}

      <header className="inicio-cabecilla">
        <div className="logo">
          <Link to="/">
            <img src="/img/logo2.png" alt="Logo Tu Día Especial"/>
          </Link> 
        </div>
        
        <div className="icono-usuario">
          {usuario ? (
            <div className="usuario-logueado-header d-flex align-items-center gap-2">
              <Link to="/perfil" className="link-perfil-header text-white text-decoration-none d-flex align-items-center gap-2" title="Ver mi perfil">
                {usuario.foto ? (
                  <img 
                    src={usuario.foto} 
                    alt={usuario.nombre} 
                    className="rounded-circle border border-2 border-white"
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  />
                ) : (
                  <span className="avatar-mini fs-5">👤</span>
                )}
                <span className="nombre-usuario-header fw-bold">{usuario.nombre}</span>
              </Link>
              
              <button 
                type="button"
                onClick={() => setMostrarModalLogout(true)} 
                className="btn btn-sm btn-outline-light ms-1 px-2 py-1"
                title="Cerrar sesión de forma segura"
              >
                🚪 Salir
              </button>
            </div>
          ) : (
            <Link to="/login">
              <img src="/img/icono-usuario.png" alt="Usuario"/>
            </Link>
          )}
        </div>
      </header>

      {/* MODAL MEJORADO DE CONFIRMACIÓN DE CIERRE DE SESIÓN */}
      {mostrarModalLogout && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold">🚪 Confirmar Cierre de Sesión</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setMostrarModalLogout(false)}></button>
              </div>
              <div className="modal-body text-center py-4">
                <div className="fs-1 mb-2">👋</div>
                <h5>¿Seguro que deseas cerrar sesión, {usuario?.nombre}?</h5>
                <p className="text-muted small mb-0">Tus datos guardados y reservas se mantendrán seguros.</p>
              </div>
              <div className="modal-footer bg-light justify-content-center">
                <button type="button" className="btn btn-secondary px-4" onClick={() => setMostrarModalLogout(false)}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger px-4 fw-bold" onClick={confirmarCierreSesion}>
                  Sí, Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cabecera;