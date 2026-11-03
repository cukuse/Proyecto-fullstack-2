import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navegacion from '../components/navegacion';

describe('8. Componente Navegacion', () => {
  test('muestra el botón Panel si el usuario es administrador', () => {
    const usuarioAdmin = { nombre: 'Admin', rol: 'admin' };

    render(
      <MemoryRouter>
        <Navegacion totalItems={0} usuario={usuarioAdmin} />
      </MemoryRouter>
    );

    expect(screen.getByText(/⚙️ Panel/i)).toBeInTheDocument();
  });

  test('oculta el botón Panel si el usuario es cliente', () => {
    const usuarioCliente = { nombre: 'Juan', rol: 'cliente' };

    render(
      <MemoryRouter>
        <Navegacion totalItems={0} usuario={usuarioCliente} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/⚙️ Panel/i)).not.toBeInTheDocument();
  });
});