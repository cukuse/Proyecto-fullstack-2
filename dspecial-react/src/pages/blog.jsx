import '../css/estilo.css'
import '../css/nosotros-blog.css'
import { Link } from 'react-router-dom'
import React from 'react'

function    Blog() {
    return (
        <>
        <main class="main-blog">
        <div class="cabecera-blog">
            <h2 class="titulo-seccion">Blog & Consejos</h2>
            <p>Tendencias e ideas para planificar tu próxima celebración.</p>
        </div>

        <div class="grilla-blog">
            <article class="tarjeta-blog">
                <div class="img-blog-placeholder">
                    <img src="img/boda-catalgo.jpg" alt="Matrimonios Íntimos"/>
                </div>  
                <div class="contenido-blog">
                    <span class="fecha-post">15 Septiembre, 2026</span>
                    <h3>5 Tips para organizar un Matrimonio Íntimo Inolvidable</h3>
                    <p>Descubre cómo aprovechar un aforo reducido para crear una experiencia llena de detalles únicos y significativos para tus invitados.</p>
                    <a href="#" class="link-leer-mas" onclick="alert('Próximamente disponible el artículo completo.'); return false;">Leer artículo →</a>
                </div>
            </article>

            <article class="tarjeta-blog">
                <div class="img-blog-placeholder">
                    <img src="img/cumple-catalogo.jpg" alt="Cumpleaños Temáticos"/>
                </div>
                <div class="contenido-blog">
                    <span class="fecha-post">02 Septiembre, 2026</span>
                    <h3>Ideas Creativas para Cumpleaños Temáticos</h3>
                    <p>Guía paso a paso para elegir paletas de colores, decoración y sorpresas personalizadas sin complicarte la vida.</p>
                    <a href="#" class="link-leer-mas" onclick="alert('Próximamente disponible el artículo completo.'); return false;">Leer artículo →</a>
                </div>
            </article>


            <article class="tarjeta-blog">
                <div class="img-blog-placeholder">
                    <img src="img/corporativo-catalogo.jpg" alt="Eventos Corporativos"/>
                </div>
                <div class="contenido-blog">
                    <span class="fecha-post">20 Agosto, 2026</span>
                    <h3>Cómo Planificar un Evento Corporativo Exitoso</h3>
                    <p>Claves para la organización anticipada, elección de fechas y gestión eficiente de la lista de asistentes.</p>
                    <a href="#" class="link-leer-mas" onclick="alert('Próximamente disponible el artículo completo.'); return false;">Leer artículo →</a>
                </div>
            </article>
        </div>
    </main>
        </>
    )
}

export default Blog;