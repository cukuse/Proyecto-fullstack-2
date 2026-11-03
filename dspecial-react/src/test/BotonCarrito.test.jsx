import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BotonCarrito from '../components/BotonCarrito';

describe('2. Componente BotonCarrito', () => {
  test('muestra el número total de ítems en el carrito', () => {
    render(
      <MemoryRouter>
        <BotonCarrito totalItems={5} />
      </MemoryRouter>
    );

    expect(screen.getByText(/🛒 Carrito \(5\)/i)).toBeInTheDocument();
  });
});