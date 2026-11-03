import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AdminStats from '../components/AdminStats';
import AdminFormProducto from '../components/AdminFormProducto';
import AdminTablaProductos from '../components/AdminTablaProductos';
import AdminTablaUsuarios from '../components/AdminTablaUsuarios';
import AdminTablaVentas from '../components/AdminTablaVentas';
import AdminBitacora from '../components/AdminBitacora';

function Admin({ usuario, productos, setProductos, ventas, setVentas, usuarios, setUsuarios, historial, registrarActividad }) {
  const navigate = useNavigate();
  const [pestana, setPestana] = useState('kpis'); // 'kpis' | 'productos' | 'usuarios' | 'ventas' | 'bitacora'

  if (!usuario || usuario.rol !== 'admin') {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger shadow-sm d-inline-block p-4">
          <h4>🚫 Acceso Restringido</h4>
          <p className="mb-3">Necesitas iniciar sesión con cuenta de Administrador.</p>
          <button className="btn btn-dark" onClick={() => navigate('/login')}>
            Ir a Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const totalRecaudado = ventas.reduce((acc, v) => acc + Number(v.monto || 0), 0);

  const handleAgregarProducto = (nuevoProd) => {
    setProductos([nuevoProd, ...productos]);
    registrarActividad(`Admin agregó el producto: "${nuevoProd.titulo}" ($${nuevoProd.precio})`, 'admin');
    alert('¡Producto agregado exitosamente!');
  };

  const handleEliminarProducto = (id, titulo) => {
    if (window.confirm(`¿Seguro que deseas eliminar "${titulo}"?`)) {
      setProductos(productos.filter(p => p.id !== id));
      registrarActividad(`Admin eliminó el producto: "${titulo}"`, 'admin');
    }
  };

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">⚙️ Panel Multi-Tareas Admin</h2>
          <small className="text-muted">Gestión de usuarios, órdenes, boletas e inventario</small>
        </div>
        <span className="badge bg-dark fs-6 px-3 py-2">
          👤 {usuario.nombre} ({usuario.rol})
        </span>
      </div>

      {/* MENÚ DE SECCIONES (TABS) */}
      <div className="btn-group w-100 mb-4" role="group">
        <button 
          className={`btn ${pestana === 'kpis' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setPestana('kpis')}
        >
          📊 Métricas
        </button>
        <button 
          className={`btn ${pestana === 'usuarios' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setPestana('usuarios')}
        >
          👥 Usuarios
        </button>
        <button 
          className={`btn ${pestana === 'ventas' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setPestana('ventas')}
        >
          🧾 Órdenes y Boletas
        </button>
        <button 
          className={`btn ${pestana === 'productos' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setPestana('productos')}
        >
          📦 Catálogo
        </button>
        <button 
          className={`btn ${pestana === 'bitacora' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => setPestana('bitacora')}
        >
          📜 Bitácora
        </button>
      </div>

      {/* CONTENIDO SEGÚN LA PESTAÑA SELECCIONADA */}
      {pestana === 'kpis' && (
        <AdminStats 
          totalRecaudado={totalRecaudado} 
          totalProductos={productos.length} 
          totalVentas={ventas.length} 
        />
      )}

      {pestana === 'usuarios' && (
        <AdminTablaUsuarios 
          usuarios={usuarios} 
          setUsuarios={setUsuarios} 
          registrarActividad={registrarActividad} 
        />
      )}

      {pestana === 'ventas' && (
        <AdminTablaVentas 
          ventas={ventas} 
          setVentas={setVentas} 
          registrarActividad={registrarActividad} 
        />
      )}

      {pestana === 'productos' && (
        <>
          <AdminFormProducto onAgregarProducto={handleAgregarProducto} />
          <AdminTablaProductos 
            productos={productos} 
            onEliminarProducto={handleEliminarProducto} 
          />
        </>
      )}

      {pestana === 'bitacora' && (
        <AdminBitacora historial={historial} />
      )}
    </main>
  );
}

export default Admin;