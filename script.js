const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1wk_XxOasJFf41t2DGelvTg8ouTB8S9Na2jPe5QAOlEM8ZOR7yTr8BH-J4pDxJZJMXmkDoYlLipql/pubhtml?gid=0&single=true";
const archivoContainer = document.getElementById("archivo-vivo");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

// Parsea una línea CSV respetando comillas
function parsearFila(linea) {
  const resultado = [];
  let campo = "";
  let dentroDeComillas = false;

  for (let i = 0; i < linea.length; i++) {
    const char = linea[i];
    if (char === '"') {
      dentroDeComillas = !dentroDeComillas;
    } else if (char === "," && !dentroDeComillas) {
      resultado.push(campo.trim());
      campo = "";
    } else {
      campo += char;
    }
  }
  resultado.push(campo.trim());
  return resultado;
}

async function cargarMemorias() {
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error("No se pudo cargar la hoja");
    const data = await response.text();

    const filas = data.split("\n").slice(1);

    filas.forEach((fila) => {
      if (!fila.trim()) return; // saltar filas vacías

      const columnas = parsearFila(fila);

      const fecha        = columnas[1]  || "";
      const titulo       = columnas[2]  || "";
      const lugar        = columnas[3]  || "";
      const descripcion  = columnas[4]  || "";
      const categoria    = columnas[5]  || "";
      const participantes = columnas[6] || "";
      const territorio   = columnas[7]  || "";
      const aliadas      = columnas[8]  || "";
      const instagram    = columnas[9]  || "#";
      const imagen       = columnas[10] || "";
      const etiquetas    = columnas[11] || "";

      const ola = document.createElement("div");
      ola.classList.add("ola");

      ola.innerHTML = `
        <div class="ola-contenido">
          <span>${fecha}</span>
          <h3>${titulo}</h3>
          <p>${lugar}</p>
          <button class="ver-mas">Ver más</button>
        </div>
      `;

      ola.querySelector(".ver-mas").addEventListener("click", () => {
        modal.classList.remove("hidden");
        modalContent.innerHTML = `
          <button class="cerrar-modal">✕</button>
          <h2>${titulo}</h2>
          <p><strong>Descripción:</strong><br>${descripcion}</p>
          <p><strong>Categoría:</strong> ${categoria}</p>
          <p><strong>Participantes:</strong> ${participantes}</p>
          <p><strong>Territorio:</strong> ${territorio}</p>
          <p><strong>Aliadas:</strong> ${aliadas}</p>
          <p><strong>Etiquetas:</strong> ${etiquetas}</p>
          <br>
          <a href="${instagram}" target="_blank" rel="noopener">Ver publicación ↗</a>
        `;

        document.querySelector(".cerrar-modal").addEventListener("click", () => {
          modal.classList.add("hidden");
        });
      });

      archivoContainer.appendChild(ola);
    });

  } catch (error) {
    console.error("Error cargando memorias:", error);
    archivoContainer.innerHTML =
      "<p style='opacity:0.6'>No se pudieron cargar las memorias. Intenta de nuevo más tarde.</p>";
  }
}

// Cerrar modal al hacer clic fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

cargarMemorias();
