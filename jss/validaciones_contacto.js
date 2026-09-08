const formContacto = document.getElementById('form-contacto');
    if (formContacto) { // Solo se ejecuta si estamos en contacto.html
        formContacto.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let valido = true;

            const nombre = document.getElementById('contacto-nombre');
            const mensaje = document.getElementById('contacto-mensaje');
            const errNombre = document.getElementById('error-nombre');
            const errMensaje = document.getElementById('error-mensaje');

            nombre.classList.remove('input-error'); errNombre.style.display = 'none';
            mensaje.classList.remove('input-error'); errMensaje.style.display = 'none';

            // Validar que el nombre solo tenga letras y espacios (Expresión Regular básica)
            const regexLetras = /^[a-zA-Z\s]+$/;
            if (!regexLetras.test(nombre.value.trim())) {
                errNombre.textContent = 'Error: El nombre solo debe contener letras.';
                errNombre.style.display = 'block';
                nombre.classList.add('input-error');
                valido = false;
            }

            if (mensaje.value.trim().length < 10) {
                errMensaje.textContent = 'Sugerencia: Por favor, explícanos con más detalle (mínimo 10 caracteres).';
                errMensaje.style.display = 'block';
                mensaje.classList.add('input-error');
                valido = false;
            }

            if (valido) {
                alert('¡Mensaje enviado exitosamente!');
                formContacto.reset(); // Limpia el formulario
            }
        });
        }