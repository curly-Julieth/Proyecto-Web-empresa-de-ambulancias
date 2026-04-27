import { clientes } from "./env.js";

const vistaClientes =  `
<section>
  <h2>Registrar Cliente</h2>

  <form id="formCliente">

    <label>Nombre</label>
    <input type="text" id="nombre">
    <p class="error" id="errorNombre"></p>

    <label>Identificación</label>
    <input type="text" id="identificacion">
    <p class="error" id="errorId"></p>

    <label>Email</label>
    <input type="email" id="email">
    <p class="error" id="errorEmail"></p>

    <button type="submit">Guardar</button>
  </form>

  <h3>Clientes registrados</h3>
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Identificación</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody id="tablaClientes"></tbody>
  </table>
</section>
`;

export function cargarClientes() {
  const main = document.getElementById("main");
  main.innerHTML = vistaClientes;

  renderClientes();
  activarFormulario();
}

//Esta función carga los datos en la tabla 

function renderClientes() {
  const tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";

  clientes.forEach(c => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${c.idCliente}</td>
      <td>${c.nombres}</td>
      <td>${c.identificacion}</td>
      <td>${c.email}</td>
    `;

    tabla.appendChild(fila);
  });
}

function activarFormulario() {
  const form = document.getElementById("formCliente");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); //evita que se recargue la página y se pierda información

    const nombre = document.getElementById("nombre").value;
    const identificacion = document.getElementById("identificacion").value;
    const email = document.getElementById("email").value;

    let hayError = false;

    // limpiar errores
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorId").textContent = "";
    document.getElementById("errorEmail").textContent = "";

    // validar
    if (!nombre) {
      document.getElementById("errorNombre").textContent = "Ingrese nombre";
      hayError = true;
    }

    if (!identificacion) {
      document.getElementById("errorId").textContent = "Ingrese identificación";
      hayError = true;
    }

    if (!email) {
      document.getElementById("errorEmail").textContent = "Ingrese email";
      hayError = true;
    }

    if (hayError) return;

    const nuevoCliente = {
      idCliente: clientes.length + 1,
      nombres: nombre,
      identificacion,
      email
    };

    clientes.push(nuevoCliente);

    renderClientes();

    form.reset();
  });
}