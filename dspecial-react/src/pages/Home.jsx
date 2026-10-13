import '../css/estilo.css'

function Home() {
    
    return  (
        <>
        <main>
        <section className="agrevento-sect">
            <div className="imagen-inicio"><img src="/img/home 1.jpg" alt=""/></div>

            <a href="evento.html"><button id="btn-agregar-evento" onclick="Animation"> Agrendar Evento</button></a>
        </section>
        <section className="features">
            <div>
                <div className="icono-a"><img src="/img/icono-a.png" alt=""/></div>
                <p><strong>Aforos Pequeños</strong> Eventos Privados y Calidos</p>
            </div>
            <div>
                <div className="icono-b"><img src="/img/icono-b.png" alt=""/></div>
                <p><strong>Planificacion Segura</strong> Agendamiento anticipado Garantizado</p>
            </div>
            <div>
                <div className="icono-c"><img src="/img/icono-c.png" alt=""/></div>
                <p><strong className="sub-1">Detalles Unicos</strong> Personaliza Tu pedido Con Extras y Envios Especiales
                </p>
            </div>
        </section>
        </main>
        </>
    )
}

export default Home