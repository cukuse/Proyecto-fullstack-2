import { render, screen } from '@testing-library/react';
import AdminTablaProductos from '../components/AdminTablaProductos';

describe('6. Componente AdminTablaProductos', () => {
  test('muestra un mensaje de advertencia cuando no hay productos', () => {
    render(<AdminTablaProductos productos={[]} onEliminarProducto={() => {}} />);

    expect(screen.getByText(/No hay productos registrados en el catálogo/i)).toBeInTheDocument();
  });
});