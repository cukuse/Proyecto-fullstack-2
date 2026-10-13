import { useState } from "react"

function Formulario() {
    const [nombre, setNombre] = useState ("")
    const [Correo, setCorreo] =useState ("")
    const [mensaje, setMensaje] =useState ("")
    const [formlario, setFormulario]= useState("")



    function cambioFormulario(e) {
        setFormulario
        return
        
    }
    function CambioNombre(e){
        setNombre(e.target.value)

        
    }

    function cambioCorreo(e) {
        setCorreo(e.target.value)
        
    }

    function cambioMensaje(e) {
        setMensaje(e.target.value)
        
    }

    function Envio(e) {
        e.preventDefault()
        if(nombre.length<1 ){
            alert("su nombre no puede quedar en blanco")
            return
        }
        if (mensaje.length<1) {
            alert ("el mensaje debe ser mas largo y un buen contexto")
            return
        }
        alert("su mensaje se ha mandado de forma correcta")
        
    }

    return (
        <>
         <form action="" onSubmit={Envio}>
            <label htmlFor="">Nombre Completo</label>
            <input type="text" name="" id="" value={nombre} onChange={CambioNombre}/>
            <label htmlFor="">Correo Electronico</label>
            <input type="email" name="" id="" value={Correo} onChange={cambioCorreo}/>
            <label htmlFor="">tipo solicitud</label>
            <select name="" value={formlario} onChange={cambioFormulario}>
                <option >Cotización de Evento Privado</option>
                <option >Consulta sobre Aforos y Disponibilidad</option>
                <option >Personalización y Detalles Extras</option>
                <option >Modificación / Cambio de Fecha</option>
                <option >Consulta de Catálogo de Servicios</option>
                <option >Sugerencias o Reclamos</option>

            </select>
            <label htmlFor="">Mensaje </label>
            <input type="text" name="" id="" value={mensaje} onChange={cambioMensaje}/>
            <input type="submit" value="Enviar" />
         </form>
        </>
    )
    
}

export default Formulario