import React, { useState } from 'react';

function AdminFormProducto({ onAgregarProducto }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('matrimonios');
  const [aforo, setAforo] = useState('Aforo: 30 personas');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('/img/boda-catalgo.jpg');
  const [oferta, setOferta] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titulo || !precio) {
      alert('Por favor completa el nombre y el precio.');
      return;
    }

    const nuevoProducto = {
      id: Date.now(),
      titulo,
      categoria,
      aforo,
      precio: Number(precio),
      imagen,
      oferta
    };

    onAgregarProducto(nuevoProducto);

    // Limpiar formulario
    setTitulo('');
    setPrecio('');
    setOferta(false);
  };

  return (
    <section className="card shadow-sm mb-4">
      <div className="card-header bg-dark text-white fw-bold">
        ➕ Agregar Nuevo Evento al Catálogo
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* row g-3: Fila de Bootstrap con espacio entre campos */}
          <div className="row g-3">
            
            {/* Nombre del Evento */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Nombre del Evento *</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Ej. Boda en la Playa"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            {/* Categoría */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Categoría *</label>
              <select 
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="matrimonios">💍 Matrimonios</option>
                <option value="cumpleanos">🎂 Cumpleaños</option>
                <option value="corporativos">💼 Corporativos</option>
              </select>
            </div>

            {/* Precio */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Precio ($ CLP) *</label>
              <input 
                type="number" 
                className="form-control"
                placeholder="Ej. 150000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
            </div>

            {/* Aforo */}
            <div className="col-12 col-md-6">
              <label className="form-label fw-bold">Aforo Estimado</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Ej. Aforo: 50 personas"
                value={aforo}
                onChange={(e) => setAforo(e.target.value)}
              />
            </div>

            {/* Checkbox Oferta */}
            <div className="col-12">
              <div className="form-check">
                <input 
                  type="checkbox" 
                  className="form-check-input"
                  id="chkOfertaBs"
                  checked={oferta}
                  onChange={(e) => setOferta(e.target.checked)}
                />
                <label className="form-check-label fw-bold" htmlFor="chkOfertaBs">
                  🔥 Marcar como evento en oferta
                </label>
              </div>
            </div>

            {/* Botón de Enviar */}
            <div className="col-12">
              <button type="submit" className="btn btn-dark w-100 fw-bold">
                Guardar Producto en Catálogo
              </button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
}

export default AdminFormProducto;