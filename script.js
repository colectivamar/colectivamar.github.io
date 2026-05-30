const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS1wk_XxOasJFf41t2DGelvTg8ouTB8S9Na2jPe5QAOlEM8ZOR7yTr8BH-J4pDxJZJMXmkDoYlLipql/pub?gid=0&single=true&output=csv";

const archivoContainer =
  document.getElementById("archivo-vivo");

async function cargarMemorias() {

  try {

    const response =
      await fetch(sheetURL);

    const data =
      await response.text();

    const filas =
      data.split("\n").slice(1);

    filas.forEach((fila) => {

      if (!fila.trim()) return;

      const columnas =
        fila.split(",");

      const fecha =
        columnas[1] || "";

      const titulo =
        columnas[2] || "";

      const lugar =
        columnas[3] || "";

      const descripcion =
        columnas[4] || "";

      const ola =
        document.createElement("div");

      ola.classList.add("ola");

      ola.innerHTML = `
        <div class="ola-contenido">
          <span>${fecha}</span>
          <h3>${titulo}</h3>
          <p>${lugar}</p>

          <details>
            <summary>Ver más</summary>
            <br>
            <p>${descripcion}</p>
          </details>

        </div>
      `;

      archivoContainer.appendChild(ola);

    });

  } catch (error) {

    console.error(error);

  }

}

cargarMemorias();
