import {render, screen } from "@testing-library/react";
import App from "../App";
import Navegacion from "../components/navegacion";

describe("componente navegacio" , () =>{
    test("renderiza el componente correctamente", () => {
    render(<Navegacion/>);
    const componente =screen.getByRole("button")
    expect(componente).toBeInDocument();
    });
});