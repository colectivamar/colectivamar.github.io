// URL DEL GOOGLE SHEETS EN CSV
const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1wk_XxOasJFf41t2DGelvTg8ouTB8S9Na2jPe5QAOlEM8ZOR7yTr8BH-J4pDxJZJMXmkDoYlLipql/pub?gid=0&single=true&output=csv";

// contenedor donde aparecerán las olas
const archivoContainer = document.getElementById("archivo-vivo");

// leer CSV
async function cargarMemorias() {
  const response = await fetch(sheetURL);
  const data = await response.text();

  // convertir CSV en filas
  const filas = data.split("\n").slice(1);

  filas.forEach((fila) => {
    const columnas = fila.split(",");

    const titulo = columnas[2];
    const lugar = columnas[3];
    const descripcion = columnas[4];
    const categoria = columnas[5];
    const imagen = columnas[10];
    const instagram = columnas[9];

    crearOla({
      titulo,
      lugar,
      descripcion,
      categoria,
      imagen,
      instagram,
    });
  });
}

// crear tarjeta/ola
function crearOla(data) {
  const ola = document.createElement("div");

  ola.classList.add("ola");

  ola.innerHTML = `
    <img src="${data.imagen}" alt="${data.titulo}">
    
    <div class="ola-contenido">
      <span>${data.categoria}</span>
      <h3>${data.titulo}</h3>
      <p>${data.lugar}</p>
      <p>${data.descripcion}</p>

      ${
        data.instagram
          ? `
      <a href="${data.instagram}" target="_blank">
        Ver memoria ↗
      </a>
      `
          : ""
      }
    </div>
  `;

  archivoContainer.appendChild(ola);
}

cargarMemorias();
