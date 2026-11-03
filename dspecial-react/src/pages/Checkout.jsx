import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Checkout({ carrito = [], setCarrito, setVentas, registrarActividad, usuario }) {
  const navigate = useNavigate();

  // Estados del flujo: 'formulario' | 'procesando' | 'exito' | 'error'
  const [paso, setPaso] = useState('formulario'); 
  const [metodoPago, setMetodoPago] = useState('tarjeta'); 

  // Simulación de prueba para el desarrollador/usuario
  const [simularError, setSimularError] = useState(false);
  const [detalleError, setDetalleError] = useState(null);

  // Campos del Formulario
  const [banco, setBanco] = useState('Banco de Chile');
  const [numeroTarjeta, setNumeroTarjeta] = useState('4500 1234 5678 9010');
  const [nombreTitular, setNombreTitular] = useState(usuario ? usuario.nombre : 'Juan Pérez');
  const [vencimiento, setVencimiento] = useState('12/28');
  const [cvv, setCvv] = useState('123');
  const [cuotas, setCuotas] = useState('1');

  // Comprobante de Venta Exitosa
  const [comprobante, setComprobante] = useState(null);

  const totalPagar = carrito.reduce((suma, item) => suma + Number(item.precio || 0), 0);

  if (carrito.length === 0 && paso !== 'exito' && paso !== 'error') {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning shadow-sm d-inline-block p-4">
          <h4>🛒 Tu carrito está vacío</h4>
          <p className="mb-3">Agrega eventos desde nuestro catálogo para continuar con el pago.</p>
          <Link to="/catalogo" className="btn btn-dark">
            ← Ir al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  // Procesador de pago ficticio con manejo de fallas
  const handlePagar = (e) => {
    e.preventDefault();
    setPaso('procesando');

    setTimeout(() => {
      // Regla de error: Si activó el switch o si la tarjeta termina en 0000 o CVV es 000
      const esTarjetaInvalida = numeroTarjeta.endsWith('0000') || cvv === '000';

      if (simularError || esTarjetaInvalida) {
        const motivosFalla = [
          { codigo: 'ERR_INSUFFICIENT_FUNDS', titulo: 'Fondos o cupo insuficiente', causa: 'La cuenta o tarjeta seleccionada no posee el cupo disponible para completar la transacción.' },
          { codigo: 'ERR_CARD_DECLINED', titulo: 'Transacción rechazada por el banco emisor', causa: 'Tu banco bloqueó temporalmente esta compra por medidas de seguridad o verificación.' },
          { codigo: 'ERR_EXPIRED_CARD', titulo: 'Datos de tarjeta inválidos o vencidos', causa: 'El número de tarjeta, la fecha de expiración o el código CVV no coinciden.' }
        ];

        const errorSeleccionado = motivosFalla[Math.floor(Math.random() * motivosFalla.length)];
        setDetalleError(errorSeleccionado);
        setPaso('error');

        registrarActividad(
          `🔴 INTENTO DE PAGO FALLIDO (${errorSeleccionado.codigo}) por $${totalPagar.toLocaleString('es-CL')} [${banco}]`,
          usuario ? usuario.rol : 'cliente'
        );
      } else {
        const idVenta = `V-${Math.floor(1000 + Math.random() * 9000)}`;
        const nuevaVenta = {
          id: idVenta,
          cliente: usuario ? usuario.nombre : nombreTitular,
          evento: carrito.map((item) => item.titulo).join(', '),
          monto: totalPagar,
          fecha: new Date().toLocaleDateString('es-CL'),
          estado: 'Completado',
          banco: banco,
          tarjeta: metodoPago === 'tarjeta' ? `Tarjeta **** ${numeroTarjeta.slice(-4)}` : 'Transferencia'
        };

        setVentas((prev) => [nuevaVenta, ...prev]);
        registrarActividad(
          `🟢 Compra procesada exitosamente #${idVenta} por $${totalPagar.toLocaleString('es-CL')} (${banco})`,
          usuario ? usuario.rol : 'cliente'
        );

        setComprobante(nuevaVenta);
        setCarrito([]);
        setPaso('exito');
      }
    }, 2200);
  };

  return (
    <main className="container py-4" style={{ maxWidth: '900px' }}>
      
      {/* ---------------- VISTA 1: FORMULARIO DE PAGO ---------------- */}
      {paso === 'formulario' && (
        <div className="row g-4">
          
          <div className="col-12 col-md-7">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-dark text-white fw-bold py-3 d-flex justify-content-between align-items-center">
                <span>💳 Pasarela de Pago Segura</span>
                <span className="badge bg-danger">WebPay / Transbank</span>
              </div>
              <div className="card-body p-4">
                
                {/* SIMULADOR DE PRUEBA */}
                <div className="form-check form-switch mb-4 p-2 bg-light rounded border">
                  <input 
                    className="form-check-input ms-0 me-2" 
                    type="checkbox" 
                    id="switchError"
                    checked={simularError}
                    onChange={(e) => setSimularError(e.target.checked)}
                  />
                  <label className="form-check-label fw-bold text-dark small" htmlFor="switchError">
                    🧪 Modo Pruebas: {simularError ? '🔴 Simular Error de Pago' : '🟢 Simular Pago Exitoso'}
                  </label>
                </div>

                <div className="btn-group w-100 mb-4" role="group">
                  <button
                    type="button"
                    className={`btn ${metodoPago === 'tarjeta' ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setMetodoPago('tarjeta')}
                  >
                    💳 Crédito / Débito
                  </button>
                  <button
                    type="button"
                    className={`btn ${metodoPago === 'transferencia' ? 'btn-dark' : 'btn-outline-dark'}`}
                    onClick={() => setMetodoPago('transferencia')}
                  >
                    🏦 Transferencia Directa
                  </button>
                </div>

                <form onSubmit={handlePagar}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Selecciona tu Banco</label>
                    <select 
                      className="form-select" 
                      value={banco} 
                      onChange={(e) => setBanco(e.target.value)}
                    >
                      <option value="Banco de Chile">Banco de Chile</option>
                      <option value="BancoEstado">BancoEstado / CuentaRUT</option>
                      <option value="Banco Santander">Banco Santander</option>
                      <option value="BCI">BCI</option>
                      <option value="Scotiabank">Scotiabank</option>
                    </select>
                  </div>

                  {metodoPago === 'tarjeta' ? (
                    <>
                      <div className="card bg-secondary text-white p-3 mb-3 shadow-sm rounded-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold fs-5">{banco}</span>
                          <span className="badge bg-warning text-dark">VISA / MC</span>
                        </div>
                        <div className="fs-5 font-monospace mb-2">
                          {numeroTarjeta || '**** **** **** ****'}
                        </div>
                        <div className="d-flex justify-content-between align-items-center text-uppercase fs-7">
                          <span>{nombreTitular || 'NOMBRE TITULAR'}</span>
                          <span>EXP: {vencimiento || 'MM/AA'}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Número de Tarjeta</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="4500 0000 0000 0000"
                          maxLength="19"
                          value={numeroTarjeta}
                          onChange={(e) => setNumeroTarjeta(e.target.value)}
                          required 
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label fw-bold">Nombre del Titular</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          placeholder="Juan Pérez"
                          value={nombreTitular}
                          onChange={(e) => setNombreTitular(e.target.value)}
                          required 
                        />
                      </div>

                      <div className="row g-2 mb-3">
                        <div className="col-6">
                          <label className="form-label fw-bold">Vencimiento</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="MM/AA"
                            maxLength="5"
                            value={vencimiento}
                            onChange={(e) => setVencimiento(e.target.value)}
                            required 
                          />
                        </div>
                        <div className="col-6">
                          <label className="form-label fw-bold">CVV</label>
                          <input 
                            type="password" 
                            className="form-control" 
                            placeholder="123"
                            maxLength="4"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-bold">Cuotas</label>
                        <select 
                          className="form-select" 
                          value={cuotas} 
                          onChange={(e) => setCuotas(e.target.value)}
                        >
                          <option value="1">1 Cuota (${totalPagar.toLocaleString('es-CL')})</option>
                          <option value="3">3 Cuotas sin interés (${Math.round(totalPagar / 3).toLocaleString('es-CL')}/mes)</option>
                          <option value="6">6 Cuotas sin interés (${Math.round(totalPagar / 6).toLocaleString('es-CL')}/mes)</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <div className="alert alert-info border-0 p-3 mb-4">
                      <h6>📌 Datos para Transferencia Bancaria:</h6>
                      <ul className="mb-0 small">
                        <li><strong>Razón Social:</strong> Tu Día Especial SpA</li>
                        <li><strong>RUT:</strong> 76.543.210-K</li>
                        <li><strong>Banco:</strong> {banco}</li>
                        <li><strong>Cuenta Corriente:</strong> 00-12345-09</li>
                        <li><strong>Correo:</strong> pagos@tudia.cl</li>
                      </ul>
                    </div>
                  )}

                  <button type="submit" className="btn btn-danger w-100 py-3 fw-bold fs-5">
                    Pagar ${totalPagar.toLocaleString('es-CL')}
                  </button>
                </form>

              </div>
            </div>
          </div>

          <div className="col-12 col-md-5">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-secondary text-white fw-bold py-3">
                📋 Resumen de la Reserva
              </div>
              <div className="card-body">
                {carrito.map((item, index) => (
                  <div key={index} className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                    <div>
                      <h6 className="mb-0 fw-bold">{item.titulo}</h6>
                      <small className="text-muted">{item.aforo}</small>
                    </div>
                    <span className="fw-bold">${Number(item.precio).toLocaleString('es-CL')}</span>
                  </div>
                ))}

                <div className="d-flex justify-content-between align-items-center fs-5 fw-bold mt-3 pt-2">
                  <span>Total:</span>
                  <span className="text-danger">${totalPagar.toLocaleString('es-CL')}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ---------------- VISTA 2: PROCESANDO ---------------- */}
      {paso === 'procesando' && (
        <div className="text-center py-5 my-5">
          <div className="spinner-border text-danger" style={{ width: '4rem', height: '4rem' }} role="status">
            <span className="visually-hidden">Procesando...</span>
          </div>
          <h4 className="mt-4 fw-bold">Conectando con {banco}...</h4>
          <p className="text-muted">Por favor no cierres ni recargues la página.</p>
        </div>
      )}

      {/* ---------------- VISTA 3: PANTALLA DE ERROR DE PAGO ---------------- */}
      {paso === 'error' && detalleError && (
        <div className="card shadow-lg border-0 mx-auto my-4" style={{ maxWidth: '650px' }}>
          <div className="card-header bg-danger text-white text-center py-4">
            <div className="fs-1 mb-1">⚠️</div>
            <h3 className="fw-bold mb-0">¡Pago No Procesado!</h3>
            <small className="text-white-50">Código: {detalleError.codigo}</small>
          </div>

          <div className="card-body p-4">
            <div className="alert alert-danger border text-start mb-4">
              <h5 className="alert-heading fw-bold mb-2">❌ {detalleError.titulo}</h5>
              <p className="mb-0 small">{detalleError.causa}</p>
            </div>

            <div className="bg-light p-3 rounded mb-4 border">
              <h6 className="fw-bold text-dark mb-2">💡 Sugerencias para resolverlo:</h6>
              <ul className="mb-0 small text-muted ps-3">
                <li>Verifica que el número de tarjeta, fecha y CVV estén correctamente escritos.</li>
                <li>Asegúrate de contar con cupo o saldo disponible suficiente.</li>
                <li>Consulta con tu banco si tienes compras por internet habilitadas.</li>
                <li>Prueba cambiar a opción de <strong>Transferencia Bancaria</strong>.</li>
              </ul>
            </div>

            <div className="d-grid gap-2">
              <button 
                className="btn btn-danger py-2 fw-bold"
                onClick={() => setPaso('formulario')}
              >
                🔄 Reintentar Pago con otros datos
              </button>
              <button 
                className="btn btn-outline-dark py-2"
                onClick={() => {
                  setMetodoPago('transferencia');
                  setSimularError(false);
                  setPaso('formulario');
                }}
              >
                🏦 Cambiar a Transferencia Bancaria
              </button>
              <Link to="/carrito" className="btn btn-link text-muted text-center mt-1">
                ← Volver al Carrito
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- VISTA 4: COMPROBANTE DE ÉXITO ---------------- */}
      {paso === 'exito' && comprobante && (
        <div className="card shadow border-0 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-header bg-success text-white text-center py-4">
            <div className="fs-1">🎉</div>
            <h3 className="fw-bold mb-0">¡Pago Confirmado!</h3>
            <small>Reserva agendada exitosamente</small>
          </div>

          <div className="card-body p-4">
            <div className="alert alert-light border text-center mb-4">
              <span className="text-muted d-block">Número de Comprobante</span>
              <strong className="fs-4 text-dark">{comprobante.id}</strong>
            </div>

            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td className="text-muted">Cliente:</td>
                  <td className="fw-bold text-end">{comprobante.cliente}</td>
                </tr>
                <tr>
                  <td className="text-muted">Eventos Reservados:</td>
                  <td className="fw-bold text-end">{comprobante.evento}</td>
                </tr>
                <tr>
                  <td className="text-muted">Banco:</td>
                  <td className="fw-bold text-end">{comprobante.banco}</td>
                </tr>
                <tr>
                  <td className="text-muted">Medio de Pago:</td>
                  <td className="fw-bold text-end">{comprobante.tarjeta}</td>
                </tr>
                <tr>
                  <td className="text-muted">Fecha:</td>
                  <td className="fw-bold text-end">{comprobante.fecha}</td>
                </tr>
                <tr className="border-top">
                  <td className="fs-5 fw-bold">Monto Pagado:</td>
                  <td className="fs-5 fw-bold text-end text-success">${comprobante.monto.toLocaleString('es-CL')}</td>
                </tr>
              </tbody>
            </table>

            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>
                🏠 Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default Checkout;