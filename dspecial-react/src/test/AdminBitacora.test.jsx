import { render, screen } from '@testing-library/react';
import AdminBitacora from '../components/AdminBitacora';

describe('7. Componente AdminBitacora', () => {
  const historialFalso = [
    {
      id: 101,
      fecha: '2026-03-01 10:00:00',
      usuario: 'admin@tudia.cl',
      rol: 'admin',
      accion: 'Inicio de sesión de Administrador'
    }
  ];

  test('renderiza correctamente el historial de actividades', () => {
    render(<AdminBitacora historial={historialFalso} />);

    expect(screen.getByText('admin@tudia.cl')).toBeInTheDocument();
    expect(screen.getByText('Inicio de sesión de Administrador')).toBeInTheDocument();
    expect(screen.getByText('ADMIN')).toBeInTheDocument();
  });
});