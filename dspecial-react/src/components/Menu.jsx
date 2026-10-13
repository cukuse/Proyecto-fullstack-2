import { Link } from 'react-router-dom'
import '../css/estilo_menu.css'

function Menu({ cerrarMenu }) {
  return (
    <div className="menu-overlay">
      <div className="logo-menu-superior">
        <img src="/img/icono-login.svg" alt="Logo Empresa" />
      </div>

      <button className="boton-cerrar" onClick={cerrarMenu}>
        X
      </button>

      <nav className="menu-enlaces">
        <Link to="/" onClick={cerrarMenu} className="enlace-item">
          <span className="parentesis">(</span>
          <img src="/img/icono-a.png" alt="" className="icono-link" />
          <span>Inicio</span>
          <span className="parentesis">)</span>
        </Link>

        <Link to="/agendar" onClick={cerrarMenu} className="enlace-item">
          <span className="parentesis">(</span>
          <img src="/img/icono-b.png" alt="" className="icono-link" />
          <span>Agendar Evento</span>
          <span className="parentesis">)</span>
        </Link>

        <Link to="/catalogo" onClick={cerrarMenu} className="enlace-item">
          <span className="parentesis">(</span>
          <img src="/img/icono-c.png" alt="" className="icono-link" />
          <span>Catalogo De Eventos</span>
          <span className="parentesis">)</span>
        </Link>

        <div className="linea-separadora"></div>

        <Link to="/perfil" onClick={cerrarMenu} className="enlace-item">
          <span className="parentesis">(</span>
          <img src="/img/icono-usuario.png" alt="" className="icono-link" />
          <span>Mi Perfil</span>
          <span className="parentesis">)</span>
        </Link>

        <Link to="/contacto" onClick={cerrarMenu} className="enlace-item">
          <span className="parentesis">(</span>
          <img src="/img/icono-buscar.png" alt="" className="icono-link" />
          <span>Contactanos</span>
          <span className="parentesis">)</span>
        </Link>

        <Link to="/quienes-somos" onClick={cerrarMenu} className="enlace-item">
          <span className="parentesis">(</span>
          <img src="/img/icono-a.png" alt="" className="icono-link" />
          <span>¿Quienes Somos?</span>
          <span className="parentesis">)</span>
        </Link>
      </nav>
    </div>
  )
}

export default Menu