import { render, screen, fireEvent } from '@testing-library/react';
import ModalBoleta from '../components/ModalBoleta';

describe('10. Componente ModalBoleta', () => {
  const ventaFalsa = {
    id: 'V-1001',
    cliente: 'María López',
    evento: 'Boda al aire libre',
    monto: 150000,
    fecha: '2026-03-01',
    estado: 'Completado'
  };

  test('pasa al modo de edición al presionar el botón Editar', () => {
    render(
      <ModalBoleta 
        venta={ventaFalsa} 
        setVentas={() => {}} 
        registrarActividad={() => {}} 
        onClose={() => {}} 
      />
    );

    const btnEditar = screen.getByRole('button', { name: /✏️ Editar Datos de esta Boleta/i });
    expect(btnEditar).toBeInTheDocument();

    fireEvent.click(btnEditar);

    expect(screen.getByRole('button', { name: /Guardar Cambios en Boleta/i })).toBeInTheDocument();
  });
});