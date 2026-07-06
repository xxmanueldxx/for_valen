const pantalla = document.getElementById("pantalla");

        let presionando = false;
        let inicioX, inicioY, scrollIzquierda, scrollArriba;

        function iniciarArrastre(e) {
            presionando = true;
            inicioX = e.pageX - pantalla.offsetLeft;
            inicioY = e.pageY - pantalla.offsetTop;
            scrollIzquierda = pantalla.scrollLeft;
            scrollArriba = pantalla.scrollTop;
        }

        function detenerArrastre() {
            presionando = false;
        }

        function arrastrar(e) {
            if (!presionando) return;
            e.preventDefault(); 
            const x = e.pageX - pantalla.offsetLeft;
            const y = e.pageY - pantalla.offsetTop;
            const recorridoX = (x - inicioX) * 1.5; 
            const recorridoY = (y - inicioY) * 1.5;
            pantalla.scrollLeft = scrollIzquierda - recorridoX;
            pantalla.scrollTop = scrollArriba - recorridoY;
        }

        pantalla.addEventListener("mousedown", iniciarArrastre);
        pantalla.addEventListener("mouseleave", detenerArrastre);
        pantalla.addEventListener("mouseup", detenerArrastre);
        pantalla.addEventListener("mousemove", arrastrar);

        window.onload = () => {
            pantalla.scrollLeft = (pantalla.scrollWidth - pantalla.clientWidth) / 2;
            pantalla.scrollTop = (pantalla.scrollHeight - pantalla.clientHeight) / 2;
        };


const canvas = document.getElementById("lienzo-estrellas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const estrellas = [];

for (let i = 0; i < 200; i++) {
    estrellas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radio: Math.random() * 1.5,
        velocidadX: (Math.random() - 0.5) * 0.5,
        velocidadY: (Math.random() - 0.5) * 0.5
    });
}

function animarEstrellas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    estrellas.forEach(estrella => {
        ctx.beginPath();
        ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
        ctx.fill();

        estrella.x += estrella.velocidadX;
        estrella.y += estrella.velocidadY;

        if (estrella.x < 0) estrella.x = canvas.width;
        if (estrella.x > canvas.width) estrella.x = 0;
        if (estrella.y < 0) estrella.y = canvas.height;
        if (estrella.y > canvas.height) estrella.y = 0;
    });

    requestAnimationFrame(animarEstrellas);
}

animarEstrellas();

// --- PARTE 3: MAGIA DE LA TARJETA EMERGENTE (MODAL) ---
        const fotos = document.querySelectorAll('.foto');
        const modal = document.getElementById('modal');
        const imgModal = document.getElementById('img-modal');
        const textoModal = document.getElementById('texto-modal');
        const mensajeLargoModal = document.getElementById('mensaje-largo-modal'); // Atrapamos el nuevo párrafo
        const btnCerrar = document.getElementById('cerrar-modal');

        // Al tocar cualquier foto del universo
        fotos.forEach(foto => {
            foto.addEventListener('click', () => {
                // El código "roba" la foto, el título y el mensaje secreto de la estrellita que tocaste
                const imagenClickeada = foto.querySelector('img').src;
                const textoClickeado = foto.querySelector('p').innerText;
                
                // Verificamos si existe el mensaje secreto para evitar errores
                const cajaSecreta = foto.querySelector('.mensaje-secreto');
                const textoSecreto = cajaSecreta ? cajaSecreta.innerHTML : "";

                // Y se los inyecta a la tarjeta gigante
                imgModal.src = imagenClickeada;
                textoModal.innerText = textoClickeado;
                mensajeLargoModal.innerHTML = textoSecreto; // Inyecta el testamento único

                // Prende la tarjeta
                modal.classList.add('activo');
            });
        });

        // Para cerrar tocando la X
        btnCerrar.addEventListener('click', () => {
            modal.classList.remove('activo');
        });

        // Para cerrar si tocas fuera de la tarjeta (el fondo negro)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('activo');
            }
        });

        // --- PARTE 4: CONTROL DE LA MÚSICA ---
        const musica = document.getElementById('musica-fondo');
        const btnMusica = document.getElementById('btn-musica');

        // Función para encender o pausar desde el botón
        btnMusica.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que interfiera con los clics del fondo
            
            if (musica.paused) {
                musica.play();
                btnMusica.innerText = "🎵💗";
                btnMusica.classList.add('reproduciendo');
            } else {
                musica.pause();
                btnMusica.innerText = "🔇";
                btnMusica.classList.remove('reproduciendo');
            }
        });

        // TRUCO MAESTRO: En cuanto ella toque CUALQUIER PARTE de la pantalla por primera vez,
        // la música intentará arrancar automáticamente.
        document.body.addEventListener('click', () => {
            if (musica.paused) {
                musica.play().then(() => {
                    btnMusica.innerText = "🎵";
                    btnMusica.classList.add('reproduciendo');
                }).catch(error => {
                    console.log("El navegador bloqueó el inicio automático, requiere clic en el botón.");
                });
            }
        }, { once: true }); // El '{ once: true }' hace que este truco solo se ejecute el primerito clic.