import { render, screen, fireEvent } from '@testing-library/react';
import FiltroCatalogo from '../components/FiltroCatalogo';

describe('4. Componente FiltroCatalogo', () => {
  test('actualiza la búsqueda cuando el usuario escribe', () => {
    const setBusquedaSimulado = vi.fn();

    render(
      <FiltroCatalogo 
        busqueda="" 
        setBusqueda={setBusquedaSimulado} 
        categoriaSeleccionada="todas" 
        setCategoriaSeleccionada={() => {}} 
      />
    );

    const inputBuscar = screen.getByPlaceholderText(/buscar evento por nombre/i);
    fireEvent.change(inputBuscar, { target: { value: 'Cumpleaños' } });

    expect(setBusquedaSimulado).toHaveBeenCalledWith('Cumpleaños');
  });
});