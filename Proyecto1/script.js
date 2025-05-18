let seleccionadas = [];
let actual = 0;
let pausa = false;
let reconocimiento;
let buenas = 0;
let malas = 0;
let tiempo = 5000;

const palabraDiv = document.getElementById("palabraActual");
const resultadoDiv = document.getElementById("resultado");
const barra = document.getElementById("barra");
const puntaje = document.getElementById("puntaje");
const historial = document.getElementById("historial");
const campana = document.getElementById("campana");

document.getElementById("startBtn").addEventListener("click", comenzar);
document.getElementById("pauseBtn").addEventListener("click", pausar);
document.getElementById("endBtn").addEventListener("click", finalizar);
document.getElementById("resetBtn").addEventListener("click", reiniciar);
document.getElementById("repetirBtn").addEventListener("click", repetir);

function hablar(texto, idioma = 'es-ES') {
  const utter = new SpeechSynthesisUtterance(texto);
  utter.lang = idioma;
  speechSynthesis.speak(utter);
}

function cargarPreguntas() {
  const cantidad = parseInt(document.getElementById("cantidad").value);
  tiempo = parseInt(document.getElementById("tiempo").value) * 1000;
  seleccionadas = palabras.sort(() => 0.5 - Math.random()).slice(0, cantidad);
  actual = 0;
  buenas = 0;
  malas = 0;
  historial.innerHTML = "";
  actualizarProgreso();
}

function comenzar() {
  if (seleccionadas.length === 0) cargarPreguntas();
  if (pausa) {
    pausa = false;
    hacerPregunta();
  } else {
    hacerPregunta();
  }
}

function hacerPregunta() {
  if (actual >= seleccionadas.length || pausa) {
    resultadoDiv.innerText = "✅ Test finalizado.";
    mostrarResultados();
    return;
  }

  const palabra = seleccionadas[actual];
  palabraDiv.innerText = `${palabra.es} → ${palabra.en}`;
  hablar(`¿Cómo se dice en inglés la palabra ${palabra.es}?`);
  setTimeout(() => {
    campana.play();
    escucharRespuesta(palabra.en.toLowerCase(), palabra.es);
  }, tiempo);
}

function escucharRespuesta(correcta, palabraEs) {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    resultadoDiv.innerText = "🎤 Micrófono no disponible.";
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  reconocimiento = new SpeechRecognition();
  reconocimiento.lang = "en-US";
  reconocimiento.interimResults = false;
  reconocimiento.maxAlternatives = 2;

  // reconocimiento.onresult = function(event) {
  //   const dicho = event.results[0][0].transcript.toLowerCase();
  //   if (dicho.includes(correcta)) {
  //     resultadoDiv.innerText = "✅ ¡Correcto!";
  //     buenas++;
  //     hablar("Correct!", "en-US");
  //   } else {
  //     resultadoDiv.innerText = `❌ Incorrecto. Dijiste: ${dicho}`;
  //     malas++;
  //     hablar(`Incorrect. It is ${correcta}`, "en-US");
  //   }
  //   historial.innerHTML += `<div>${palabraEs} → ${correcta} | Tú dijiste: ${dicho}</div>`;
  //   actual++;
  //   actualizarProgreso();
  //   setTimeout(hacerPregunta, 3000);
  // };

  reconocimiento.onresult = function(event) {
    const dicho = event.results[0][0].transcript.toLowerCase();
    respuestaRecibida = true;
    if (dicho.includes(correcta)) {
      resultadoDiv.innerText = "✅ ¡Correcto!";
      buenas++;
      hablar(`Correct! ${correcta}`, "en-US");
    } else {
      resultadoDiv.innerText = `❌ Incorrecto. Dijiste: ${dicho}`;
      malas++;
      hablar(`Incorrect. The correct word is ${correcta}`, "en-US");
    }
    historial.innerHTML += `<div>${palabraEs} → ${correcta} | Tú dijiste: ${dicho}</div>`;
    actual++;
    actualizarProgreso();
    setTimeout(hacerPregunta, 3000);
  };

  reconocimiento.onerror = function() {
    resultadoDiv.innerText = "⚠️ No se entendió.";
    malas++;
    actual++;
    actualizarProgreso();
    setTimeout(hacerPregunta, 3000);
  };

  reconocimiento.start();
}

function actualizarProgreso() {
  const progreso = ((actual) / seleccionadas.length) * 100;
  barra.style.width = progreso + "%";
  puntaje.innerText = `✅ Buenas: ${buenas} | ❌ Malas: ${malas}`;
}

function mostrarResultados() {
  const total = buenas + malas;
  const porcentaje = total ? Math.round((buenas / total) * 100) : 0;
  puntaje.innerText = `🎯 Resultado final: ${buenas} buenas, ${malas} malas (${porcentaje}%)`;
}

function pausar() {
  pausa = true;
  resultadoDiv.innerText = "⏸️ Pausado";
  hablar("Pausado");
}

function finalizar() {
  pausa = true;
  actual = seleccionadas.length;
  resultadoDiv.innerText = "🏁 Test finalizado manualmente.";
  mostrarResultados();
}

function reiniciar() {
  pausa = false;
  actual = 0;
  resultadoDiv.innerText = "";
  cargarPreguntas();
  hablar("Reiniciando test");
}

function repetir() {
  if (actual < seleccionadas.length) {
    hablar(`¿Cómo se dice en inglés la palabra ${seleccionadas[actual].es}?`);
  }
}
