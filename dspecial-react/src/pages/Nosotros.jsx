import React from 'react';
import Boton from '../components/Boton';
import '../css/estilo.css';
import '../css/nosotros.css'; // Importación de su CSS dedicado

function Nosotros() {
  const handleNewsletter = (e) => {
    e.preventDefault();
    alert("¡Gracias por suscribirte! Pronto recibirás ofertas exclusivas en tu correo.");
  };

  return (
    <main className="main-centrado nosotros-contenedor">
      {/* Encabezado Principal */}
      <section className="nosotros-hero">
        <h2 className="titulo-seccion">¿Quiénes Somos?</h2>
        <p className="subtitulo-seccion">
          Hacemos de cada celebración un recuerdo inolvidable, íntimo y perfecto.
        </p>
      </section>

      {/* Mensaje de Marca (Marketing) */}
      <div className="texto-nosotros">
        <p>
          En <strong>Tu Día Especial</strong> nos apasiona convertir momentos ordinarios en experiencias mágicas. 
          Nos especializamos en <strong>aforos pequeños y exclusivos</strong> para garantizar que cada invitado viva 
          una atmósfera cálida, acogedora y llena de detalles únicos.
        </p>
      </div>

      {/* Pilares Clave */}
      <section className="features-nosotros">
        <div className="tarjeta-pilar">
          <div className="icono-pilar">✨</div>
          <p><strong>Exclusividad</strong> Eventos íntimos diseñados a tu medida.</p>
        </div>
        <div className="tarjeta-pilar">
          <div className="icono-pilar">🤝</div>
          <p><strong>Atención Cercana</strong> Acompañamiento en cada detalle.</p>
        </div>
        <div className="tarjeta-pilar">
          <div className="icono-pilar">🛡️</div>
          <p><strong>Reserva Garantizada</strong> Planificación sin sorpresas ni letra chica.</p>
        </div>
      </section>

      {/* Formulario de Suscripción */}
      <form className="caja-formulario form-newsletter" onSubmit={handleNewsletter}>
        <h3 className="titulo-newsletter">🎁 ¡Únete a nuestro Club de Beneficios!</h3>
        <p className="descripcion-newsletter">
          Suscríbete y recibe descuentos exclusivos y fechas prioritarias para tus reservas.
        </p>
        <div className="grupo-input">
          <input 
            type="email" 
            placeholder="Ingresa tu correo electrónico" 
            required 
            className="input-newsletter"
          />
        </div>
        <Boton type="submit" className="btn-newsletter">
          Suscribirme
        </Boton>
      </form>
    </main>
  );
}

export default Nosotros;