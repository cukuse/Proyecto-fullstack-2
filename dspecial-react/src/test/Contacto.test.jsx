import { render, screen } from '@testing-library/react';
import Contacto from '../pages/Contacto';

describe('9. Página Contacto', () => {
  test('renderiza los campos principales del formulario de contacto', () => {
    render(<Contacto />);

    expect(screen.getByText(/Envíanos un Mensaje/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej: Juan Pérez/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu@correo.com/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });
});