
const form = document.getElementById('forgotPasswordForm');
        const mostrarPreguntaBtn = document.getElementById('mostrarPregunta');
        const preguntaSeguridadDiv = document.getElementById('preguntaSeguridad');

        mostrarPreguntaBtn.addEventListener('click', async () => {
            const usuario = form.usuario.value;

            try {
                const response = await fetch('/users/getPreguntaSeguridad', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ usuario })
                });

                const data = await response.json();

                if (data.pregunta) {
                    preguntaSeguridadDiv.style.display = 'block';
                    document.querySelector('#preguntaSeguridad label').textContent = data.pregunta;
                    mostrarPreguntaBtn.style.display = 'none';
                } else {
                    alert('Usuario no encontrado.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
