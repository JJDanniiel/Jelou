const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const visualContent = document.getElementById("visual-content");
const messageText = document.getElementById("message-text");
const mainCard = document.getElementById("mainCard");

let intento = 0;

// Lista de tus imágenes y frases
const estados = [
  { txt: "¿Segura? 🤨", img: "Images/AMARILLO.png" },
  { txt: "Piénsalo otra vez! 🥺", img: "Images/RATA.png" },
  { txt: "Te daré chocolates :(", img: "Images/LLORA.png" },
  { txt: "Por qué no? :(((((", img: "Images/PERRO.png" },
  { txt: "Voy a llorar en 3, 2, 1 ...", img: "Images/POU.png" },
];

function huir() {
  // 1. Configurar posición fija para que pueda moverse por toda la pantalla
  noBtn.style.position = "fixed";

  // 2. Definir un margen para que el botón no quede pegado a los bordes
  const padding = 20;

  // 3. Calcular el espacio disponible en la pantalla (ancho y alto)
  const anchoDisponible = window.innerWidth - noBtn.offsetWidth - padding;
  const altoDisponible = window.innerHeight - noBtn.offsetHeight - padding;

  // 4. Generar coordenadas aleatorias dentro del área segura
  const x = Math.max(padding, Math.floor(Math.random() * anchoDisponible));
  const y = Math.max(padding, Math.floor(Math.random() * altoDisponible));

  // 5. Aplicar la nueva posición al botón "NO"
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // 6. Lógica del LOOP: calcular qué mensaje e imagen toca mostrar
  const indiceActual = intento % estados.length;

  // 7. Actualizar el texto del mensaje
  messageText.innerText = estados[indiceActual].txt;

  // 8. Actualizar la imagen dentro del contenedor (asegurando la ruta de la carpeta)
  visualContent.innerHTML = `<img src="${estados[indiceActual].img}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">`;

  // 9. Hacer crecer el botón "SÍ" progresivamente
  let escala = 1 + intento * 0.1;
  yesBtn.style.transform = `scale(${escala})`;

  // 10. Aumentar el contador para el siguiente clic
  intento++;
}

noBtn.addEventListener("click", huir);

yesBtn.addEventListener("click", () => {
  // 1. Lanzar el efecto de confeti
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff4d6d", "#ffafaf", "#ffffff"], // Colores románticos
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
      colors: ["#ff4d6d"],
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#ff4d6d"],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
});
