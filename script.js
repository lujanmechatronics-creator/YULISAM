
const canvas = document.getElementById("starfield");
const context = canvas.getContext("2d");
const button = document.getElementById("valentinesButton");

// CONFIGURACION DEL CANVAS
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// ESTRELLAS ROSADAS Y BLANCAS
const stars = 500;
const colorrange = [320, 340, 0, 280];
const starArray = [];

function crearEstrellas() {
    starArray.length = 0;

    for (let i = 0; i < stars; i++) {
        starArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2,
            hue: colorrange[
                Math.floor(Math.random() * colorrange.length)
            ],
            sat: 50 + Math.random() * 50,
            opacity: Math.random()
        });
    }
}

crearEstrellas();

let frameNumber = 0;

// MENSAJES ESPECIALES PARA MI YULI
const messages = [
    [
        "Mi amor Yuli, hoy quiero recordarte",
        "lo mucho que te amo ❤️"
    ],
    [
        "Desde que llegaste a mi vida,",
        "mis dias son mucho mas bonitos"
    ],
    [
        "Tal vez no somos perfectos,",
        "pero cada dia aprendemos juntos"
    ],
    [
        "Siento que vamos por un buen camino,",
        "lleno de amor, paciencia y confianza"
    ],
    [
        "Quiero seguir construyendo contigo",
        "una historia hermosa y verdadera"
    ],
    [
        "Y aunque vengan dias dificiles,",
        "quiero seguir eligiendote siempre"
    ],
    [
        "Gracias por hacerme tan feliz,",
        "por tus sonrisas y por tu amor"
    ],
    [
        "15 DE OCTUBRE ❤️",
        "Te amo muchisimo, mi Yuli hermosa"
    ]
];

// TIEMPO DE CADA MENSAJE
const framesPerMessage = 400;

// DIBUJAR LAS ESTRELLAS
function drawStars() {
    starArray.forEach(star => {
        if (Math.random() > 0.99) {
            star.opacity = Math.random();
        }

        context.beginPath();
        context.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        context.fillStyle =
            `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;

        context.fill();
    });
}

// DIBUJAR MENSAJES ROMANTICOS
function drawMessage(lines, alpha, yOffset = 0) {
    const fontSize = Math.min(
        30,
        window.innerWidth / 17
    );

    context.font = `${fontSize}px Comic Sans MS`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    // EFECTO DE BRILLO ROSADO
    context.shadowColor = "rgba(255, 70, 150, 1)";
    context.shadowBlur = 14;

    context.fillStyle =
        `rgba(255, 175, 210, ${alpha})`;

    const lineHeight = fontSize * 1.65;

    const startY =
        canvas.height / 2 -
        ((lines.length - 1) * lineHeight / 2) +
        yOffset;

    lines.forEach((line, index) => {
        context.fillText(
            line,
            canvas.width / 2,
            startY + index * lineHeight,
            canvas.width * 0.92
        );
    });

    context.shadowBlur = 0;
}

// ANIMACION DE LOS MENSAJES
function drawText() {
    const index = Math.floor(
        frameNumber / framesPerMessage
    );

    if (index < messages.length) {
        const progress =
            frameNumber % framesPerMessage;

        let alpha = 1;

        // APARECER SUAVEMENTE
        if (progress < 100) {
            alpha = progress / 100;
        }

        // DESAPARECER SUAVEMENTE
        else if (progress > 300) {
            alpha =
                (framesPerMessage - progress) / 100;
        }

        drawMessage(
            messages[index],
            Math.max(0, alpha)
        );

    } else {

        // MENSAJE FINAL PERMANENTE
        drawMessage(
            [
                "Yuli, eres mi eleccion de cada dia ❤️",
                "Te amo, mi Yuli hermosa ♾️"
            ],
            1,
            -45
        );

        // MOSTRAR BOTON SORPRESA
        if (button) {
            button.style.display = "block";
            button.textContent =
                "Una sorpresa para ti ❤️";
        }
    }
}

// SORPRESA FINAL PARA YULI
if (button) {
    button.style.display = "none";

    button.addEventListener("click", () => {
        alert(
            "Mi amor Yuli ❤️\n\n" +
            "Gracias por estar en mi vida y " +
            "por seguir construyendo esta " +
            "historia tan bonita conmigo.\n\n" +
            "Se que vamos por un buen camino " +
            "y quiero seguir caminando " +
            "juntito a ti.\n\n" +
            "Quiero cuidarte, respetarte, " +
            "comprenderte y seguir " +
            "eligiendote todos los dias.\n\n" +
            "Te amo con todo mi corazon, " +
            "mi Yuli hermosa. ❤️♾️"
        );
    });
}

// ANIMACION PRINCIPAL
function draw() {
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawStars();
    drawText();

    frameNumber++;

    window.requestAnimationFrame(draw);
}

// ADAPTACION A CELULARES Y COMPUTADORAS
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    crearEstrellas();
});

// INICIAR ANIMACION
window.requestAnimationFrame(draw);
