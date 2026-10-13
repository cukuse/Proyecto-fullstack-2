import '../css/formularios-extra.css'
function Contacto() {
  return (
    <>
      <main className="main-centrado">
        <h2 className="titulo-seccion">Envíanos un Mensaje</h2>
        <p className="subtitulo-seccion">
          ¿Tienes dudas sobre un evento? Escríbenos.
        </p>

        <form
          className="caja-formulario"
          action="#"
          method="POST"
          id="form-contacto"
        >
          <div className="grupo-input">
            <label>Nombre Completo</label>
            <input
              id="contacto-nombre"
              type="text"
              placeholder="Ej: Juan Pérez"
              required
            />
            <p className="mensaje-error" id="error-nombre"></p>
          </div>
          <div className="grupo-input">
            <label>Correo Electrónico</label>
            <input type="email" placeholder="tu@correo.com" required />
          </div>
          <div className="grupo-input">
            <label>Asunto</label>
            <select className="input-select">
              <option>Cotización</option>
              <option>Reclamo</option>
              <option>Trabaja con nosotros</option>
            </select>
          </div>
          <div className="grupo-input">
            <label>Mensaje</label>
            <textarea
              id="contacto-mensaje"
              rows="4"
              placeholder="Escribe tu consulta aquí..."
              required
            ></textarea>
            <p className="mensaje-error" id="error-mensaje"></p>
          </div>
          <button type="submit" className="btn-accion">
            Enviar Mensaje
          </button>
        </form>
      </main>
    </>
  );
}
export default Contacto;
