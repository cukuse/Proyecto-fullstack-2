import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Pie from './components/footer'
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import Nosotros from './pages/Nosotros'
import Catalogo from './pages/catalogo'
import Carrito from './pages/carrito'

import Cabecera from './components/cabecera'
import Formulario from './components/formulario'
import Navegacion from './components/navegacion'

function App() {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito_tu_dia');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito_tu_dia', JSON.stringify(carrito));
  }, [carrito]);

  // Nombre corregido
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <>
      <Cabecera />
      
      {/* Pasamos la cantidad de items a Navegacion */}
      <Navegacion totalItems={carrito.length} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/formulario' element={<Formulario />} />
        <Route path='/Nosotros' element={<Nosotros />} />
        <Route path='/catalogo' element={<Catalogo agregarAlCarrito={agregarAlCarrito} />} />
        <Route path='/carrito' element={<Carrito carrito={carrito} setCarrito={setCarrito} />} />
      </Routes>

      <Pie />
    </>
  )
}

export default App