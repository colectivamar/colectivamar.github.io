// URL DEL GOOGLE SHEETS EN CSV
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1wk_XxOasJFf41t2DGelvTg8ouTB8S9Na2jPe5QAOlEM8ZOR7yTr8BH-J4pDxJZJMXmkDoYlLipql/pub?gid=0&single=true&output=csv";

const archivoContainer =
  document.getElementById("archivo-vivo");

// MODAL
const modal =
  document.getElementById("modal");

const modalContent =
  document.getElementById("modal-content");

async function cargarMemorias() {

  const response =
    await fetch(sheetURL);

  const data =
    await response.text();

  const filas =
    data.split("\n").slice(1);

  filas.forEach((fila) => {

    const columnas =
      fila.split(",");

    const fecha =
      columnas[1];

    const titulo =
      columnas[2];

    const lugar =
      columnas[3];

    const descripcion =
      columnas[4];

    const categoria =
      columnas[5];

    const participantes =
      columnas[6];

    const territorio =
      columnas[7];

    const aliadas =
      columnas[8];

    const instagram =
      columnas[9];

    crearOla({
      fecha,
      titulo,
      lugar,
      descripcion,
      categoria,
      participantes,
      territorio,
      aliadas,
      instagram
    });

  });

}

function crearOla(data) {

  const ola =
    document.createElement("div");

  ola.classList.add("ola");

  ola.innerHTML = `
  
    <div class="ola-contenido">

      <span>${data.categoria}</span>

      <h3>${data.titulo}</h3>

      <p>${data.lugar}</p>

      <br>

      <button class="ver-mas">
        Ver más
      </button>

    </div>
  
  `;

  // BOTÓN VER MÁS
  ola.querySelector(".ver-mas")
    .addEventListener("click", () => {

      modal.classList.remove("hidden");

      modalContent.innerHTML = `

        <button class="cerrar-modal">
          ✕
        </button>

        <span>${data.categoria}</span>

        <h2>${data.titulo}</h2>

        <p><strong>Fecha:</strong> ${data.fecha}</p>

        <p><strong>Lugar:</strong> ${data.lugar}</p>

        <p>${data.descripcion}</p>

        <p><strong>Participantes:</strong> ${data.participantes}</p>

        <p><strong>Territorio:</strong> ${data.territorio}</p>

        <p><strong>Aliadas:</strong> ${data.aliadas}</p>

        <br>

        <a href="${data.instagram}" target="_blank">
          Ver publicación ↗
        </a>

      `;

      // CERRAR MODAL
      document.querySelector(".cerrar-modal")
        .addEventListener("click", () => {

          modal.classList.add("hidden");

      });

  });

  archivoContainer.appendChild(ola);

}

cargarMemorias();
