import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout / Componentes Globales
import Cabecera from './components/cabecera';
import Navegacion from './components/navegacion';
import Pie from './components/footer';

// Páginas / Vistas
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import Catalogo from './pages/catalogo';
import Carrito from './pages/carrito';
import Blog from './pages/blog';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';

// ----------------------------------------------------------------------
// DATOS INICIALES DE PRUEBA (MOCK DATA)
// ----------------------------------------------------------------------
const PRODUCTOS_INICIALES = [
  { id: 1, titulo: "Boda al aire libre", categoria: "matrimonios", aforo: "Aforo: 50 personas", precio: 150000, imagen: "/img/boda-catalgo.jpg", oferta: false },
  { id: 2, titulo: "Cumpleaños Temático", categoria: "cumpleanos", aforo: "Aforo: 30 personas", precio: 80000, precioAnterior: 100000, imagen: "/img/cumple-catalogo.jpg", oferta: true },
  { id: 3, titulo: "Evento Corporativo", categoria: "corporativos", aforo: "Aforo: 100 personas", precio: 250000, imagen: "/img/corporativo-catalogo.jpg", oferta: false },
  { id: 4, titulo: "Fiesta de Graduación", categoria: "corporativos", aforo: "Aforo: 80 personas", precio: 180000, precioAnterior: 220000, imagen: "/img/graduacion-catalogo.jpg", oferta: true },
  { id: 5, titulo: "Baby Shower Especial", categoria: "cumpleanos", aforo: "Aforo: 25 personas", precio: 60000, imagen: "/img/babyshower-catalogo.jpg", oferta: false }
];

const VENTAS_INICIALES = [
  { id: 'V-1001', cliente: 'María López', evento: 'Boda al aire libre', monto: 150000, fecha: '2026-03-01', estado: 'Completado', banco: 'Banco de Chile', tarjeta: 'Visa **** 4321' }
];

const HISTORIAL_INICIAL = [
  { id: 1, usuario: 'Sistema', accion: 'Inicialización de la plataforma', fecha: '2026-03-01 10:00:00', rol: 'admin' }
];

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL (APP)
// ----------------------------------------------------------------------
function App() {
  // --- 1. ESTADOS CON PERSISTENCIA EN LOCALSTORAGE ---
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito_tu_dia');
    return guardado ? JSON.parse(guardado) : [];
  });

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario_tu_dia');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
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

  // --- 2. EFECTOS (SINCRONIZACIÓN CON LOCALSTORAGE) ---
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
    localStorage.setItem('productos_tu_dia', JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    localStorage.setItem('ventas_tu_dia', JSON.stringify(ventas));
  }, [ventas]);

  useEffect(() => {
    localStorage.setItem('historial_tu_dia', JSON.stringify(historial));
  }, [historial]);

  // --- 3. FUNCIONES DE LÓGICA Y EVENTOS ---
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

  // --- 4. ESTRUCTURA Y RUTAS ---
  return (
    <>
      <Cabecera usuario={usuario} logout={logoutUsuario} />
      <Navegacion totalItems={carrito.length} usuario={usuario} />

      <Routes>
        {/* Rutas Estáticas */}
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Blog" element={<Blog />} />

        {/* Rutas Dinámicas con Estado */}
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
          path="/Admin" 
          element={
            <Admin 
              usuario={usuario}
              productos={productos}
              setProductos={setProductos}
              ventas={ventas}
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