const excuses = [
  {
    title: "Internet inestable",
    text: "Se cayo mi conexion justo antes de entrar a la reunion.",
    response: "Hola equipo, tuve un problema de internet y ya me estoy reconectando. En breve me pongo al dia."
  },
  {
    title: "Reinicio del equipo",
    text: "Mi computadora se reinicio de forma inesperada.",
    response: "Perdon por la demora, el equipo se reinicio solo y ya estoy retomando la tarea."
  },
  {
    title: "Consulta medica",
    text: "Tuve una consulta medica inesperada.",
    response: "Gracias por la paciencia, ya volvi de la consulta y continuo con la entrega."
  },
  {
    title: "Bloqueo de acceso",
    text: "Se bloqueo mi acceso a una herramienta interna.",
    response: "Estoy gestionando el desbloqueo con soporte y en cuanto quede habilitado envio avance."
  },
  {
    title: "Retraso en transporte",
    text: "El transporte venia con mucho retraso.",
    response: "Llegue un poco tarde por el transporte, pero ya estoy conectado y avanzando."
  }
];

const excuseTitle = document.getElementById("excuseTitle");
const excuseText = document.getElementById("excuseText");
const responseText = document.getElementById("responseText");
const resultCard = document.getElementById("result");
const changeBtn = document.getElementById("changeBtn");
const copyBtn = document.getElementById("copyBtn");
const rootStyle = document.documentElement.style;

let lastIndex = -1;

function pickDifferentExcuse() {
  if (excuses.length === 1) {
    return 0;
  }

  let randomIndex = Math.floor(Math.random() * excuses.length);
  while (randomIndex === lastIndex) {
    randomIndex = Math.floor(Math.random() * excuses.length);
  }

  lastIndex = randomIndex;
  return randomIndex;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomHslColor(saturation, lightness) {
  const hue = randomInt(0, 360);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function randomizeCssTheme() {
  const angle = randomInt(95, 165);
  const colorA = randomHslColor(90, 86);
  const colorB = randomHslColor(94, 83);
  const colorC = randomHslColor(88, 88);
  const blobA = `hsla(${randomInt(0, 360)}, 90%, 64%, 0.52)`;
  const blobB = `hsla(${randomInt(0, 360)}, 82%, 45%, 0.33)`;
  const accent = randomHslColor(78, 50);
  const accent2 = randomHslColor(72, 45);

  rootStyle.setProperty("--bg-angle", `${angle}deg`);
  rootStyle.setProperty("--bg-a", colorA);
  rootStyle.setProperty("--bg-b", colorB);
  rootStyle.setProperty("--bg-c", colorC);
  rootStyle.setProperty("--blob-a", blobA);
  rootStyle.setProperty("--blob-b", blobB);
  rootStyle.setProperty("--accent", accent);
  rootStyle.setProperty("--accent-2", accent2);
}

function changeExcuse() {
  const item = excuses[pickDifferentExcuse()];
  excuseTitle.textContent = item.title;
  excuseText.textContent = item.text;
  responseText.textContent = item.response;
  randomizeCssTheme();

  resultCard.classList.remove("animate");
  void resultCard.offsetWidth;
  resultCard.classList.add("animate");
}

async function copyExcuse() {
  const content = `Excusa: ${excuseText.textContent}\nRespuesta: ${responseText.textContent}`;

  try {
    await navigator.clipboard.writeText(content);
    copyBtn.textContent = "Copiado";
    setTimeout(() => {
      copyBtn.textContent = "Copiar texto";
    }, 1300);
  } catch {
    copyBtn.textContent = "No se pudo copiar";
    setTimeout(() => {
      copyBtn.textContent = "Copiar texto";
    }, 1300);
  }
}

changeBtn.addEventListener("click", changeExcuse);
copyBtn.addEventListener("click", copyExcuse);

changeExcuse();
