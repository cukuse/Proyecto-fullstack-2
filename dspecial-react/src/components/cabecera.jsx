import { Link } from 'react-router-dom';
import "../css/header.css";

function Cabecera({ usuario, logout }) {
    return (
        <header className="inicio-cabecilla">
            <div className="logo">
                <Link to="/">
                    <img src="/img/logo2.png" alt="Logo"/>
                </Link> 
            </div>
            
            <div className="icono-usuario">
                {usuario ? (
                    <div className="usuario-logueado-header">
                        <Link to="/login" className="link-perfil-header">
                            <span className="avatar-mini">👤</span>
                            <span className="nombre-usuario-header">{usuario.nombre}</span>
                        </Link>
                        
                        <button 
                            onClick={logout} 
                            className="btn-logout-mini"
                            title="Cerrar sesión"
                        >
                            🚪
                        </button>
                    </div>
                ) : (
                    <Link to="/login">
                        <img src="/img/icono-usuario.png" alt="Usuario"/>
                    </Link>
                )}
            </div>
        </header> 
    );
}

export default Cabecera;