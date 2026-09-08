document.addEventListener('DOMContentLoaded', function() {
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
}); 