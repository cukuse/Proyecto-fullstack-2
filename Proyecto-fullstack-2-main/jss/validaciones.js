// ==========================================
// VALIDACIÓN DEL FORMULARIO DE LOGIN
// ==========================================

// document.addEventListener asegura que el código de JS no se ejecute 
// hasta que todo el HTML visual esté completamente cargado en la pantalla.
document.addEventListener('DOMContentLoaded', function() {

    // 1. SELECCIONAR: Atrapamos el formulario y los elementos usando su ID
    const formularioLogin = document.getElementById('form-login');
    const inputEmail = document.getElementById('usuario-email');
    const inputPass = document.getElementById('usuario-pass');
    
    // Atrapamos los párrafos vacíos donde meteremos el texto de error
    const errorEmail = document.getElementById('error-email');
    const errorPass = document.getElementById('error-pass');

    // 2. ESCUCHAR: Le decimos al formulario que escuche el evento 'submit' (cuando presionan el botón)
    formularioLogin.addEventListener('submit', function(evento) {
        
        // ¡CRÍTICO! evento.preventDefault() frena que la página se recargue automáticamente.
        // Nos da tiempo para revisar los datos antes de enviarlos.
        evento.preventDefault();

        // Creamos una variable para saber si el formulario pasó la prueba (true) o falló (false)
        let formularioValido = true;

        // Limpiamos errores previos por si el usuario está intentando de nuevo
        inputEmail.classList.remove('input-error');
        errorEmail.style.display = 'none';
        
        inputPass.classList.remove('input-error');
        errorPass.style.display = 'none';

        // 3. REACCIONAR Y VALIDAR: 
        
        // REGLA 1: El correo no puede estar vacío
        // .value extrae lo que escribió el usuario. .trim() le corta los espacios en blanco a los lados.
        if (inputEmail.value.trim() === '') {
            errorEmail.textContent = 'Sugerencia: El correo o usuario no puede estar vacío.';
            errorEmail.style.display = 'block'; // Lo hacemos visible
            inputEmail.classList.add('input-error'); // Pintamos la caja de rojo
            formularioValido = false; // Reprobó la prueba
        }

        // REGLA 2: La contraseña debe tener al menos 6 caracteres
        if (inputPass.value.trim() === '') {
            errorPass.textContent = 'Error: Por favor, ingresa tu contraseña.';
            errorPass.style.display = 'block';
            inputPass.classList.add('input-error');
            formularioValido = false;
        } else if (inputPass.value.length < 6) {
            errorPass.textContent = 'Sugerencia: La contraseña debe tener al menos 6 caracteres por seguridad.';
            errorPass.style.display = 'block';
            inputPass.classList.add('input-error');
            formularioValido = false;
        }

        // 4. VEREDICTO FINAL
        if (formularioValido) {
            // Si todo está bien, simulamos que entra. 
            // En la vida real aquí haríamos un fetch() hacia tu backend.
            alert('¡Inicio de sesión exitoso! Redirigiendo...');
            
            // Te redirige a la página principal temporalmente
            window.location.href = 'index.html'; 
        }
    });

});