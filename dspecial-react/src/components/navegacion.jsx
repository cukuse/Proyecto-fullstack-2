import '../css/estilo.css';

function Navegacion() {
    return (
        <>
        <nav>
        <a href="/catalogo"><button id="btn-nosotros" onclick="Animation">Catalogo</button></a>
        <a href="ofertas.html"><button id="btn-nosotros" onclick="Animation"> Ofertas</button></a>
        <a href="/Nosotros"><button id="btn-contactanos" onclick="Animation">Contactanos</button></a>
        <a href="nosotros.html"><button id="btn-nosotros" onclick="Animation">¿Quienes Somos?</button></a>
        <a href="blog.html"><button id="btn-nosotros" onclick="Animation"> Blog</button></a>
        <a href="carrito.html"><button id="btn-carrito" onclick="Animation">🛒</button></a>
        </nav>
        </>
    )
}
export default Navegacion