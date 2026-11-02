import React from 'react';
import { useNavigate } from 'react-router-dom';

import AdminStats from '../components/AdminStats';
import AdminFormProducto from '../components/AdminFormProducto';
import AdminTablaProductos from '../components/AdminTablaProductos';
import AdminBitacora from '../components/AdminBitacora';

function Admin({ usuario, productos, setProductos, ventas, historial, registrarActividad }) {
  const navigate = useNavigate();

  // Si no está logueado como Admin
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

  // Métricas
  const totalRecaudado = ventas.reduce((acc, v) => acc + Number(v.monto || 0), 0);

  // Manejo de acciones
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
      {/* Encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">⚙️ Panel multi tareas del admin </h2>
          <small className="text-muted">Gestión interactiva de catálogo y métricas</small>
        </div>
        <span className="badge bg-dark fs-6 px-3 py-2">
          👤 {usuario.nombre} ({usuario.rol})
        </span>
      </div>

      {/* 1. Métricas / KPIs */}
      <AdminStats 
        totalRecaudado={totalRecaudado} 
        totalProductos={productos.length} 
        totalVentas={ventas.length} 
      />

      {/* 2. Formulario Agregar Producto */}
      <AdminFormProducto onAgregarProducto={handleAgregarProducto} />

      {/* 3. Tabla de Productos */}
      <AdminTablaProductos 
        productos={productos} 
        onEliminarProducto={handleEliminarProducto} 
      />

      {/* 4. Bitácora de Registro */}
      <AdminBitacora historial={historial} />
    </main>
  );
}

export default Admin;