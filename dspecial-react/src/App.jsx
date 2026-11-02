import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Pie from './components/footer'
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import Catalogo from './pages/catalogo'
import Carrito from './pages/carrito'
import Blog from './pages/blog'
import Login from './pages/Login'   

import Cabecera from './components/cabecera'
import Navegacion from './components/navegacion'

function App() {
  //  Estado del Carrito
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito_tu_dia');
    return guardado ? JSON.parse(guardado) : [];
  });

  // Estado del Usuario 
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario_tu_dia');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  useEffect(() => {
    localStorage.setItem('carrito_tu_dia', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('usuario_tu_dia', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario_tu_dia');
    }
  }, [usuario]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  // Funciones de Sesión
  const loginUsuario = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const logoutUsuario = () => {
    setUsuario(null);
  };

  return (
    <>
      <Cabecera usuario={usuario} logout={logoutUsuario} />
      <Navegacion totalItems={carrito.length} usuario={usuario} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/Nosotros' element={<Nosotros />} />
        <Route path='/catalogo' element={<Catalogo agregarAlCarrito={agregarAlCarrito} />} />
        <Route path='/carrito' element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
        <Route path='/Blog' element={<Blog />} />
        
        <Route 
          path='/login' 
          element={<Login usuario={usuario} login={loginUsuario} logout={logoutUsuario} />} 
        />
      </Routes>

      <Pie />
    </>
  )
}

export default App