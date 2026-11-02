import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/estilo-login.css';

function Login({ usuario, login, logout }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (usuario) {
    return (
      <div className="login-page-container">
        <main className="main-centrado login-card" style={{ padding: '50px 20px', textAlign: 'center' }}>
          <h2>¡Hola, {usuario.nombre}!</h2>
          <p style={{ margin: '15px 0' }}>Has iniciado sesión como: <strong>{usuario.rol.toUpperCase()}</strong></p>
          
          {usuario.rol === 'admin' && (
            <button 
              onClick={() => navigate('/admin')} 
              className="btn-accion" 
              style={{ marginBottom: '15px', backgroundColor: '#2a434d' }}
            >
              ⚙️ Ir al Dashboard Admin
            </button>
          )}
          
          <br />
          <button onClick={logout} className="btn-accion" style={{ backgroundColor: '#d9745f' }}>
            Cerrar Sesión
          </button>
        </main>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailL = email.trim().toLowerCase();
    const passL = password.trim();

    if (!emailL || !passL) {
      setError('Por favor ingresa correo y contraseña.');
      return;
    }

    if (emailL === 'admin@tudia.cl' && passL === 'admin123') {
      login({ email: emailL, nombre: 'Administrador', rol: 'admin' });
      alert('¡Bienvenido!');
      navigate('/admin');
    } else {
      login({ email: emailL, nombre: emailL.split('@')[0], rol: 'cliente' });
      alert('¡Bienvenido!');
      navigate('/');
    }
  };

  return (
    <div className="login-page-container">
      <main className="main-centrado login-card">
        <div className="cabecilla-login">
          <div className="icono-login">
            <img src="/img/logo2.png" alt="Logo Tu Día Especial" style={{ width: '120px' }} />
          </div>
        </div>

        <form className="caja-formulario" onSubmit={handleSubmit}>
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '15px' }}>Iniciar Sesión</h2>

          {error && <p style={{ color: '#ff6b6b', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}

          <div className="grupo-input">
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="admin@tudia.cl o cliente@tudia.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grupo-input">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="admin123 o cliente123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-accion">
            Ingresar
          </button>

          <a 
            href="#olvide" 
            onClick={(e) => { e.preventDefault(); alert('Instrucciones enviadas a tu correo.'); }} 
            className="l-contraseña"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </main>
    </div>
  );
}

export default Login;