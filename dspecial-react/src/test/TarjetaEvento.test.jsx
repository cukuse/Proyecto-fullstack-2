import { render, screen } from '@testing-library/react';
import TarjetaEvento from '../components/TarjetaEvento';

describe('3. Componente TarjetaEvento', () => {
  const eventoDePrueba = {
    id: 1,
    titulo: 'Boda al Aire Libre',
    aforo: 'Aforo: 50 personas',
    precio: 150000,
    oferta: true
  };

  test('muestra el nombre del evento y la insignia de oferta', () => {
    render(<TarjetaEvento evento={eventoDePrueba} agregarAlCarrito={() => {}} />);

    expect(screen.getByText('Boda al Aire Libre')).toBeInTheDocument();
    expect(screen.getByText('Aforo: 50 personas')).toBeInTheDocument();
    expect(screen.getByText(/🔥 OFERTA/i)).toBeInTheDocument();
  });
});