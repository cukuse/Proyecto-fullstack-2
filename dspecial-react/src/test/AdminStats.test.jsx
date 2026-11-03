import { render, screen } from '@testing-library/react';
import AdminStats from '../components/AdminStats';

describe('5. Componente AdminStats', () => {
  test('calcula y muestra correctamente el porcentaje de la meta', () => {
    render(<AdminStats totalRecaudado={500000} totalProductos={5} totalVentas={3} metaVentas={1000000} />);

    expect(screen.getByText(/🎯 Meta Mensual \(50%\)/i)).toBeInTheDocument();
    expect(screen.getByText(/3 ventas registradas/i)).toBeInTheDocument();
  });
});