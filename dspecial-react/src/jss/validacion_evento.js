document.addEventListener('DOMContentLoaded', function() {
    const formEvento = document.getElementById('form-evento');
    
    if (formEvento) { // Solo se ejecuta si estamos en evento.html
        formEvento.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let valido = true;

            // 1. Capturar todos los elementos (Incluyendo la nueva fecha)
            const invitados = document.getElementById('evento-invitados');
            const telefono = document.getElementById('evento-telefono');
            const direccion = document.getElementById('evento-direccion');
            const fecha = document.getElementById('evento-fecha'); // Nuevo
            
            const errInvitados = document.getElementById('error-invitados');
            const errTelefono = document.getElementById('error-telefono');
            const errDireccion = document.getElementById('error-direccion');
            const errFecha = document.getElementById('error-fecha'); // Nuevo

            // 2. Limpiar errores anteriores
            invitados.classList.remove('input-error'); 
            errInvitados.style.display = 'none';
            
            telefono.classList.remove('input-error'); 
            errTelefono.style.display = 'none';
            
            direccion.classList.remove('input-error'); 
            errDireccion.style.display = 'none';       
            
            fecha.classList.remove('input-error'); // Nuevo
            errFecha.style.display = 'none';       // Nuevo

            // 3. Validar que invitados sea un número mayor a 0
            if (isNaN(invitados.value) || invitados.value <= 0) {
                errInvitados.textContent = 'Error: Ingresa una cantidad válida de invitados.';
                errInvitados.style.display = 'block';
                invitados.classList.add('input-error');
                valido = false;
            }

            // 4. Validar teléfono (+56 9 seguido de 8 números)
            const regexTelefono = /^\+56\s9\s\d{4}\s\d{4}$/;
            if (!regexTelefono.test(telefono.value.trim())) {
                errTelefono.textContent = 'Sugerencia: Usa el formato +56 9 XXXX XXXX';
                errTelefono.style.display = 'block';
                telefono.classList.add('input-error');
                valido = false;
            }

            // 5. Validar dirección 
            if (direccion.value.trim() === '') {
                errDireccion.textContent = 'Error: La dirección del evento es obligatoria.';
                errDireccion.style.display = 'block';
                direccion.classList.add('input-error');
                valido = false;
            } else if (direccion.value.trim().length < 10) {
                errDireccion.textContent = 'Sugerencia: Ingresa una dirección más detallada (calle y número).';
                errDireccion.style.display = 'block';
                direccion.classList.add('input-error');
                valido = false;
            }

            // 6. Validar fecha (El bloque nuevo)
            if (fecha.value === '') {
                errFecha.textContent = 'Error: Debes seleccionar una fecha en el calendario.';
                errFecha.style.display = 'block';
                fecha.classList.add('input-error');
                valido = false;
            }

            // 7. Ejecutar si todo es válido
            if (valido) {
                alert('¡Evento agendado con éxito!');
                formEvento.reset();
            }
        });
    }
});