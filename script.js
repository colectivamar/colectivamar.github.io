const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1wk_XxOasJFf41t2DGelvTg8ouTB8S9Na2jPe5QAOlEM8ZOR7yTr8BH-J4pDxJZJMXmkDoYlLipql/pub?gid=0&single=true&output=csv";

const archivoContainer =
  document.getElementById("archivo-vivo");

const modal =
  document.getElementById("modal");

const modalContent =
  document.getElementById("modal-content");

async function cargarMemorias() {

  const response = await fetch(sheetURL);

  const data = await response.text();

  const filas =
    data.split("\n").slice(1);

  filas.forEach((fila) => {

    const columnas = fila.split(",");

    const fecha = columnas[1];
    const titulo = columnas[2];
    const lugar = columnas[3];

    const descripcion = columnas[4];
    const categoria = columnas[5];
    const participantes = columnas[6];
    const territorio = columnas[7];
    const aliadas = columnas[8];
    const instagram = columnas[9];
    const imagen = columnas[10];
    const etiquetas = columnas[11];

    const ola =
      document.createElement("div");

    ola.classList.add("ola");

    // TARJETA SIMPLE
    ola.innerHTML = `

      <div class="ola-contenido">

        <span>${fecha}</span>

        <h3>${titulo}</h3>

        <p>${lugar}</p>

        <button class="ver-mas">
          Ver más
        </button>

      </div>

    `;

    // BOTÓN
    ola.querySelector(".ver-mas")
      .addEventListener("click", () => {

      modal.classList.remove("hidden");

      modalContent.innerHTML = `

        <button class="cerrar-modal">
          ✕
        </button>

        <h2>${titulo}</h2>

        <p><strong>Descripción:</strong><br>${descripcion}</p>

        <p><strong>Categoría:</strong> ${categoria}</p>

        <p><strong>Participantes:</strong> ${participantes}</p>

        <p><strong>Territorio:</strong> ${territorio}</p>

        <p><strong>Aliadas:</strong> ${aliadas}</p>

        <p><strong>Etiquetas:</strong> ${etiquetas}</p>

        <br>

        <a href="${instagram}" target="_blank">
          Ver publicación ↗
        </a>

      `;

      document.querySelector(".cerrar-modal")
        .addEventListener("click", () => {

          modal.classList.add("hidden");

      });

    });

    archivoContainer.appendChild(ola);

  });

}

cargarMemorias();
