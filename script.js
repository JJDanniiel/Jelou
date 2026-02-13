const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const visualContent = document.getElementById('visual-content');
const messageText = document.getElementById('message-text');
const mainCard = document.getElementById('mainCard');

let intento = 0;

// Lista de tus imágenes y frases
const estados = [
    { txt: "¿Segura? 🤨", img: "Images/AMARILLO.png" },
    { txt: "Piénsalo otra vez! 🥺", img: "Images/RATA.png" },
    { txt: "Te daré chocolates :(", img: "Images/LLORA.png" },
    { txt: "Por qué no? :(((((", img: "Images/PERRO.png" },
    { txt: "Voy a llorar en 3, 2, 1 ...", img: "Images/POU.png" }
];

function huir() {
    // Mover el botón
    noBtn.style.position = 'fixed';
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

    // Calcular el índice del loop
    const indiceActual = intento % estados.length;
    
    // Actualizar el texto
    messageText.innerText = estados[indiceActual].txt;
    
    // EXPLICACIÓN: Aquí creamos la etiqueta <img> real en lugar de solo poner el texto
    // Usamos las comillas invertidas `` para poder meter la variable ${...}
    visualContent.innerHTML = `<img src="${estados[indiceActual].img}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;
    
    // Hacer crecer el botón SÍ
    let scale = 1 + (intento * 0.1); 
    yesBtn.style.transform = `scale(${scale})`;
    
    intento++;
}

noBtn.addEventListener('click', huir);

yesBtn.addEventListener('click', () => {
    // 1. Lanzar el efecto de confeti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffafaf', '#ffffff'] // Colores románticos
    });
    mainCard.innerHTML = `
        <div class="box-placeholder" 
             style="border: none; 
                    transform: translateX(15px); /* <--- MUEVE TODO EL CUADRO A LA DERECHA */
                    margin: 0 auto 20px;"> 
            <img src="Images/ROSA.png" 
                 style="width: 100%; 
                        height: 100%; 
                        object-fit: cover; 
                        border-radius: 15px;">
        </div>
        <h1>¡SIIIIIIIII! ❤️</h1>
        <p>Ya sabía que aceptarías cabezona <3</p>
    `;

    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d']
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});