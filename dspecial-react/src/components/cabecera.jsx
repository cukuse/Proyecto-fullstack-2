import { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu'; 
import "../css/estilo.css";

function Cabecera() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const alternarMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <>
            <header className="inicio-cabecilla">
                {/* Agregamos el evento onClick al icono para abrir el menú */}
                <div className="icono-buscar" onClick={alternarMenu} style={{ cursor: 'pointer' }}>
                    <img src="/img/icono-buscar.png" alt="Menú"/>
                </div>
                
                <div className="logo">
                    <Link to="/">
                        <img src="/img/logo2.png" alt="Logo"/>
                    </Link> 
                </div>
                
                <div className="icono-usuario">
                    {/* Corregimos login.html por /login y arreglamos la ruta de la imagen */}
                    <Link to="/login">
                        <img src="/img/icono-usuario.png" alt="Usuario"/>
                    </Link>
                </div>
            </header> 

            {/* Si menuAbierto es verdadero, renderizamos el overlay del Menú */}
            {menuAbierto && <Menu cerrarMenu={alternarMenu} />}
        </>
    );
}

export default Cabecera;