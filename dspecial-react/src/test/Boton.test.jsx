import { render, screen, fireEvent } from '@testing-library/react';
import Boton from '../components/Boton';

describe('1. Componente Boton', () => {
  test('muestra el texto y ejecuta la función al hacer clic', () => {
    const funcionSimulada = vi.fn();

    render(<Boton onClick={funcionSimulada}>Agendar Evento</Boton>);

    const boton = screen.getByRole('button', { name: /agendar evento/i });
    expect(boton).toBeInTheDocument();

    fireEvent.click(boton);
    expect(funcionSimulada).toHaveBeenCalledTimes(1);
  });
});