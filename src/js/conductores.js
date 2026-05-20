import { conductores } from "./env";

const main = document.getElementById("main");

const vistaConductores = `
    <section>
    <h2>Registrar Conductor</h2>

    <form id="formConductor">

      <label>Nombre</label>
      <input type="text" id="nombre">
      <p class="error" id="errorNombre"></p>

      <label>Cedula</label>
      <input type="text" id="cedula" pattern="[0-9]*">
      <p class="error" id="errorCedula"></p>

      <label>Departamento</label>
      <input type="text" id="idDepartamento">
      <p class="error" id="errorDepartamento"></p>

      <label>Municipio</label>
      <input type="text" id="idMunicipio">
      <p class="error" id="errorDireccionMunicipio"></p>

      <label>Barrio</label>
      <input type="text" id="idBarrio">
      <p class="error" id="errorDireccionBarrio"></p>

      <label>Direccion</label>
      <input type="text" id="direccion">
      <p class="error" id="errorDireccion"></p>

      <label>WhatsApp</label>
      <input type="text" id="whatsapp">
      <p class="error" id="errorWhatsapp"></p>

      <label>Email</label>
      <input type="text" id="email">
      <p class="error" id="errorEmail"></p>

      <label>Número de Licencia</label>
      <input type="text" id="numeroLicenciaConduccion">
      <p class="error" id="errorLicencia"></p>

      <button type="submit">Guardar</button>
    </form>

    <h3>Conductores registrados</h3>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Municipio</th>
          <th>Barrio</th>
          <th>Direccion</th>
          <th>Número de Licencia</th>
        </tr>
      </thead>
      <tbody id="tablaConductores"></tbody>
    </table>

</section>
`;

export function cargarConductores() {
  const main = document.getElementById("main");
  main.innerHTML = vistaConductores;

  renderConductores();
}

// función render 
function renderConductores() {
  const tabla = document.getElementById("tablaConductores");
  tabla.innerHTML = "";

  conductores.forEach(c => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${c.idConductor}</td>
      <td>${c.nombre}</td>
      <td>${c.cedula}</td>
      <td>${c.idMunicipio}</td>
      <td>${c.idBarrio}</td>
      <td>${c.direccion}</td>
      <td>${c.numeroLicenciaConduccion}</td>
    `;

    tabla.appendChild(fila);
  });
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");

  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

const form = document.getElementById("formConductor");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const cedula = document.getElementById("cedula").value;
    const municipio = document.getElementById("idMunicipio").value;
    const barrio = document.getElementById("idBarrio").value;
    const direccion = document.getElementById("direccion").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const email = document.getElementById("email").value;
    const licencia = document.getElementById("numeroLicenciaConduccion").value;

let hayError = false;

// limpiar errores
document.getElementById("errorNombre").textContent = "";
document.getElementById("errorCedula").textContent = "";
document.getElementById("errorWhatsapp").textContent = "";
document.getElementById("errorEmail").textContent = "";

// validar
if (!nombre) {
  document.getElementById("errorNombre").textContent = "Ingrese el nombre";
  hayError = true;
}

if (!cedula) {
  document.getElementById("errorCedula").textContent = "Ingrese el número de Cédula";
  hayError = true;
}

if (!whatsapp) {
  document.getElementById("errorWhatsapp").textContent = "Ingrese número de whatsapp";
  hayError = true;
}

if (!email) {
  document.getElementById("errorEmail").textContent = "Ingrese el Email";
  hayError = true;
}

if (!licencia) {
  document.getElementById("errorLicencia").textContent = "Ingrese la licencia";
  hayError = true;
}

if (hayError) return;

    const nuevoConductor = {
        idConductor: conductores.length + 1,
        nombre,
        cedula,
        municipio,
        barrio,
        direccion,
        whatsapp,
        email,
        numeroLicenciaConduccion: licencia
    };

    conductores.push(nuevoConductor);

    renderConductores();

    form.reset();
    mostrarToast("Conductor registrado correctamente");
});

