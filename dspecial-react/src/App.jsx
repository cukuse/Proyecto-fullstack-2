import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Cabecera from './components/cabecera';
import Navegacion from './components/navegacion';
import Pie from './components/footer';

import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Catalogo from './pages/catalogo';
import Carrito from './pages/carrito';
import Blog from './pages/blog';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Perfil from './pages/Perfil';

const PRODUCTOS_INICIALES = [
  { id: 1, titulo: "Boda al aire libre", categoria: "matrimonios", aforo: "Aforo: 50 personas", precio: 150000, imagen: "/img/boda-catalgo.jpg", oferta: false },
  { id: 2, titulo: "Cumpleaños Temático", categoria: "cumpleanos", aforo: "Aforo: 30 personas", precio: 80000, precioAnterior: 100000, imagen: "/img/cumple-catalogo.jpg", oferta: true }
];

const VENTAS_INICIALES = [
  { id: 'V-1001', cliente: 'María López', evento: 'Boda al aire libre', monto: 150000, fecha: '2026-03-01', estado: 'Completado', banco: 'Banco de Chile', tarjeta: 'Visa **** 4321' }
];

const USUARIOS_INICIALES = [
  { id: 1, nombre: 'Administrador', email: 'admin@tudia.cl', rol: 'admin', telefono: '+56 9 9999 8888', direccion: 'Oficina Central #100', foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 2, nombre: 'Juan Pérez', email: 'cliente@tudia.cl', rol: 'cliente', telefono: '+56 9 1234 5678', direccion: 'Av. Siempre Viva 742', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' }
];

const HISTORIAL_INICIAL = [
  { id: 1, usuario: 'Sistema', accion: 'Inicialización de la plataforma', fecha: '2026-03-01 10:00:00', rol: 'admin' }
];

function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito_tu_dia');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario_tu_dia');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem('usuarios_tu_dia');
    return guardados ? JSON.parse(guardados) : USUARIOS_INICIALES;
  });

  const [productos, setProductos] = useState(() => {
    const guardados = localStorage.getItem('productos_tu_dia');
    return guardados ? JSON.parse(guardados) : PRODUCTOS_INICIALES;
  });

  const [ventas, setVentas] = useState(() => {
    const guardadas = localStorage.getItem('ventas_tu_dia');
    return guardadas ? JSON.parse(guardadas) : VENTAS_INICIALES;
  });

  const [historial, setHistorial] = useState(() => {
    const guardado = localStorage.getItem('historial_tu_dia');
    return guardado ? JSON.parse(guardado) : HISTORIAL_INICIAL;
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

  useEffect(() => {
    localStorage.setItem('usuarios_tu_dia', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('productos_tu_dia', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('ventas_tu_dia', JSON.stringify(ventas));
  }, [ventas]);

  useEffect(() => {
    localStorage.setItem('historial_tu_dia', JSON.stringify(historial));
  }, [historial]);

  const registrarActividad = (accion, rolEjecutor = 'cliente') => {
    const nuevoRegistro = {
      id: Date.now(),
      usuario: usuario ? usuario.email : 'Anónimo',
      accion,
      fecha: new Date().toLocaleString('es-CL'),
      rol: usuario ? usuario.rol : rolEjecutor
    };
    setHistorial(prev => [nuevoRegistro, ...prev]);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => [...prev, producto]);
    registrarActividad(`Producto "${producto.titulo}" agregado al carrito`);
  };

  const loginUsuario = (datosUsuario) => {
    setUsuario(datosUsuario);
    registrarActividad(`Inicio de sesión de ${datosUsuario.nombre}`, datosUsuario.rol);
  };

  const logoutUsuario = () => {
    if (usuario) {
      registrarActividad(`Cierre de sesión de ${usuario.nombre}`, usuario.rol);
    }
    setUsuario(null);
  };

  return (
    <>
      <Cabecera usuario={usuario} logout={logoutUsuario} />
      <Navegacion totalItems={carrito.length} usuario={usuario} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Blog" element={<Blog />} />

        <Route 
          path="/catalogo" 
          element={<Catalogo productos={productos} agregarAlCarrito={agregarAlCarrito} />} 
        />
        <Route 
          path="/carrito" 
          element={<Carrito carrito={carrito} setCarrito={setCarrito} />} 
        />
        <Route 
          path="/login" 
          element={<Login usuario={usuario} login={loginUsuario} logout={logoutUsuario} />} 
        />
        <Route 
          path="/perfil" 
          element={
          <Perfil 
        usuario={usuario} 
        setUsuario={setUsuario}
        setUsuarios={setUsuarios}
        registrarActividad={registrarActividad} 
          />}
        />
        <Route 
          path="/admin" 
          element={
            <Admin 
              usuario={usuario}
              productos={productos}
              setProductos={setProductos}
              ventas={ventas}
              setVentas={setVentas}
              usuarios={usuarios}
              setUsuarios={setUsuarios}
              historial={historial}
              registrarActividad={registrarActividad}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <Checkout 
              carrito={carrito}
              setCarrito={setCarrito}
              setVentas={setVentas}
              registrarActividad={registrarActividad}
              usuario={usuario}
            />
          } 
        />
      </Routes>

      <Pie />
    </>
  );
}

export default App;