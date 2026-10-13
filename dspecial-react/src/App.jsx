import { useState } from 'react'
import Cabecera from './components/cabecera'
import Pie from './components/footer'
import Home from './pages/Home'
import Contacto from './pages/Contacto'
import Menu from './components/Menu'
import { Routes, Route } from 'react-router-dom'
import Formulario from './components/formulario'
import Navegacion from './components/navegacion'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Cabecera></Cabecera>
    <Navegacion></Navegacion>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contacto' element={<Contacto/>}/>
      <Route path='/Menu' element={<Menu/>}/>
      <Route path='/formulario' element={<Formulario/>}/>
      <Route path='/formulario' element={<Formulario/>}/>

    </Routes>
    <Pie></Pie>
    </>
  )
}

export default App
