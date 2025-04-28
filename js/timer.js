
let startTime = Date.now();

// Función para actualizar el cronómetro en tiempo real
function actualizarCronometro() {
    let tiempoTranscurrido = (Date.now() - startTime) / 1000;
    document.getElementById("cronometro").textContent = tiempoTranscurrido.toFixed(2);
}

// Iniciar la actualización del cronómetro cada 100 milisegundos
let intervalo = setInterval(actualizarCronometro, 100);

// Guardar el tiempo del nivel antes de que el usuario salga de la página
window.onbeforeunload = function() {
    let endTime = Date.now();
    let elapsedTime = (endTime - startTime) / 1000;

    // Obtener tiempos guardados o iniciar un objeto vacío
    let levelTimes = JSON.parse(localStorage.getItem("levelTimes")) || {};

    // Guardar el tiempo en el nivel actual, sobrescribiendo si ya existe
    levelTimes[nivelActual] = elapsedTime;
    localStorage.setItem("levelTimes", JSON.stringify(levelTimes));

    // Calcular el tiempo total sumando todos los tiempos de los niveles registrados
    let totalTime = Object.values(levelTimes).reduce((acc, time) => acc + time, 0);
    localStorage.setItem("totalTime", totalTime);
};

// Mostrar los tiempos en una página de resumen (si corresponde)
document.addEventListener("DOMContentLoaded", function() {
    let timesList = document.getElementById("timesList");
    let totalTimeElement = document.getElementById("totalTime");

    if (timesList && totalTimeElement) {
        let levelTimes = JSON.parse(localStorage.getItem("levelTimes")) || {};
        let totalTime = parseFloat(localStorage.getItem("totalTime")) || 0;

        let nivelesOrdenados = Object.keys(levelTimes).sort(); // Asegurar orden de niveles

        // Mostrar solo los niveles jugados hasta el momento
        nivelesOrdenados.forEach((nivel) => {
            let listItem = document.createElement("li");
            listItem.textContent = `${nivel}: ${levelTimes[nivel].toFixed(2)} segundos`;
            timesList.appendChild(listItem);
        });

        totalTimeElement.textContent = `Tiempo total: ${totalTime.toFixed(2)} segundos`;
    }
});


document.addEventListener("DOMContentLoaded", function() {
    let resetButton = document.getElementById("resetButton");

    if (resetButton) {
        resetButton.addEventListener("click", function() {
            localStorage.removeItem("levelTimes"); // Borra tiempos individuales
            localStorage.removeItem("totalTime");  // Borra el tiempo total

            // Redirigir al index después de borrar los datos
            window.location.href = "index.html";
        });
    }
});
