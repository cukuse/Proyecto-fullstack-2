document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. VALIDACIÓN: LOGIN
    // ==========================================
    const formLogin = document.getElementById('form-login');
    if (formLogin) { // Solo se ejecuta si estamos en login.html
        formLogin.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let valido = true;

            const email = document.getElementById('usuario-email');
            const pass = document.getElementById('usuario-pass');
            const errEmail = document.getElementById('error-email');
            const errPass = document.getElementById('error-pass');

            // Limpiar errores
            email.classList.remove('input-error'); errEmail.style.display = 'none';
            pass.classList.remove('input-error'); errPass.style.display = 'none';

            if (email.value.trim() === '') {
                errEmail.textContent = 'Sugerencia: Ingresa tu correo o usuario.';
                errEmail.style.display = 'block';
                email.classList.add('input-error');
                valido = false;
            }

            if (pass.value.trim().length < 6) {
                errPass.textContent = 'Sugerencia: La contraseña debe tener al menos 6 caracteres.';
                errPass.style.display = 'block';
                pass.classList.add('input-error');
                valido = false;
            }

            if (valido) {
                alert('¡Iniciando sesión!');
                window.location.href = 'index.html'; 
            }
        });
    }

    // ==========================================
    // 2. VALIDACIÓN: CONTACTO
    // ==========================================
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

    // ==========================================
    // 3. VALIDACIÓN: AGENDAR EVENTO
    // ==========================================
    const formEvento = document.getElementById('form-evento');
    if (formEvento) { // Solo se ejecuta si estamos en evento.html
        formEvento.addEventListener('submit', function(evento) {
            evento.preventDefault();
            let valido = true;

            const invitados = document.getElementById('evento-invitados');
            const telefono = document.getElementById('evento-telefono');
            const errInvitados = document.getElementById('error-invitados');
            const errTelefono = document.getElementById('error-telefono');

            invitados.classList.remove('input-error'); errInvitados.style.display = 'none';
            telefono.classList.remove('input-error'); errTelefono.style.display = 'none';

            // Validar que invitados sea un número mayor a 0
            if (isNaN(invitados.value) || invitados.value <= 0) {
                errInvitados.textContent = 'Error: Ingresa una cantidad válida de invitados.';
                errInvitados.style.display = 'block';
                invitados.classList.add('input-error');
                valido = false;
            }

            // Validar teléfono chileno (+56 9 seguido de 8 números)
            const regexTelefono = /^\+56\s9\s\d{4}\s\d{4}$/;
            if (!regexTelefono.test(telefono.value.trim())) {
                errTelefono.textContent = 'Sugerencia: Usa el formato +56 9 XXXX XXXX';
                errTelefono.style.display = 'block';
                telefono.classList.add('input-error');
                valido = false;
            }

            if (valido) {
                alert('¡Evento agendado con éxito!');
                formEvento.reset();
            }
        });
    }
});