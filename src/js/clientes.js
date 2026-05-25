import { clientes } from "./env.js";

// Vista de clientes
const vistaClientes =  `
<section>

  <button id="btnVerJSON" class="btnVerJSON">Ver JSON</button>

  <h2>Registrar Cliente</h2>

  <form id="formCliente" autocomplete="new-password">

    <label>Nombre</label>
    <input type="text" id="nombre" autocomplete="off" placeholder="Ingrese nombre" maxlength="50">
    <p class="error" id="errorNombre"></p>

    <label>Apellido</label>
    <input type="text" id="apellido" autocomplete="new-password" placeholder="Ingrese apellido" maxlength="50">
    <p class="error" id="errorApellido"></p>
    
    <label>Identificación</label>
    <input type="text" id="identificacion" autocomplete="new-password" placeholder="Ingrese identificación" maxlength="10">
    <p class="error" id="errorId"></p>

    <label>Email</label>
    <input type="text" id="email" autocomplete="new-password" placeholder="Ingrese email">
    <p class="error" id="errorEmail"></p>

    <button type="submit" id="btnGuardar">Guardar</button>
  </form>


  <h3>Clientes registrados</h3>
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Identificación</th>
        <th>Email</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="tablaClientes"></tbody>
  </table>


  <div id="modalJSON" class="modal">
    <div class="modal-contenido">
      <h3>Base de Datos JSON</h3>
      <pre id="jsonClientes"></pre>
      <button id="cerrarModal">Cerrar</button>
    </div>
  </div>

</section>
`;



// Variable global 
let clienteEditable = null;

// Funcion para guardar datos en JSON
function guardarClientesJSON() {
  localStorage.setItem("clientes", JSON.stringify(clientes));
}


// Funcion para cargar clientes
export function cargarClientes() {
  const main = document.getElementById("main");  
  main.innerHTML = vistaClientes;

  renderClientes();
  activarFormulario();
  activarModalJSON();
}



// Funcion para renderizar clientes
function renderClientes() {
  const tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";  

  clientes.forEach((c, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${c.idCliente}</td>
      <td>${c.nombres}</td>
      <td>${c.apellido}</td>
      <td>${c.identificacion}</td>
      <td>${c.email}</td>
      <td>
        <button class="btnEditar" data-index="${index}">Editar</button>
        <button class="btnEliminar" data-index="${index}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);   
  });

 // Uso de event delegation para diferenciar eliminar de editar
  tabla.addEventListener("click", function(e){
    if (e.target.classList.contains("btnEditar")){
        const indice = parseInt(e.target.getAttribute("data-index"));
        cargarEnFormulario(clientes[indice], indice);
    } else if (e.target.classList.contains("btnEliminar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      eliminarCliente(indice);
    }
  })
}



// Funcion para activar ventana modal donde se ve BD JSON
function activarModalJSON() {
    const btnJSON = document.getElementById("btnVerJSON");
    const modal = document.getElementById("modalJSON");
    const cerrar = document.getElementById("cerrarModal");
    const json = document.getElementById("jsonClientes");

    btnJSON.addEventListener("click", () => {
      json.textContent = JSON.stringify(clientes, null, 2);
      modal.classList.add("activo");
    });
    cerrar.addEventListener("click", () => {
      modal.classList.remove("activo");
})};




// Funcion cargar en formulario (editar)
function cargarEnFormulario(cliente, indice){
  document.getElementById("nombre").value = cliente.nombres;
  document.getElementById("apellido").value = cliente.apellido;
  document.getElementById("identificacion").value = cliente.identificacion;
  document.getElementById("email").value = cliente.email;

  clienteEditable = indice;

  document.getElementById("btnGuardar").textContent = "Actualizar";
  mostrarToast("Editando cliente...");
}




// Formulario activar formulario
function activarFormulario() {
  const form = document.getElementById("formCliente");

  form.addEventListener("submit", (e) => {  // se usa para detectar cuando se envía el formulario
    e.preventDefault(); //evita que se recargue la página y se pierda información

    // Se capturan los valores de los inputs
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const identificacion = document.getElementById("identificacion").value.trim();
    const email = document.getElementById("email").value.trim();

    let hayError = false;
    limpiarErrores();

    // Validaciones basicas
    if (!nombre || !validarNombre(nombre)) {
      document.getElementById("errorNombre").textContent = "Nombre inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

    if (!apellido || !validarApellido(apellido)) {
      document.getElementById("errorApellido").textContent = "Apellido inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

    if (!identificacion || !validarIdentificacion(identificacion)) {
      document.getElementById("errorId").textContent = "Identificación inválida (solo números, 7-10 digitos)";
      hayError = true;
    }

    if (!email || !validarEmail(email)) {
      document.getElementById("errorEmail").textContent = "Email inválido (Debe conteneder @ y nombre de dominio)";
      hayError = true;
    }


    // Verificar duplicaciones
    if (!hayError && clienteEditable === null) {
      const existe = clientes.some(c => c.identificacion === identificacion);
      if (existe) {
        document.getElementById("errorId").textContent = "Identificación ya registrada";
        hayError = true;
      }
    }

    // Mensaje error antes de guardar
    if (hayError) {
      mostrarToast("⚠️ Corrige los errores antes de guardar");
      return;
    }


    // Guardar y editar 
    if (clienteEditable !== null) {
      clientes[clienteEditable].nombres = nombre;
      clientes[clienteEditable].apellido = apellido;
      clientes[clienteEditable].identificacion = identificacion;
      clientes[clienteEditable].email = email;

      guardarClientesJSON();

      mostrarToast("Cliente actualizado con exito✅");
      clienteEditable = null;
    } else {
      const nuevoCliente = {
        idCliente: clientes.length + 1,
        nombres: nombre,
        apellido: apellido,
        identificacion,
        email
      };
  
      clientes.push(nuevoCliente);
      guardarClientesJSON(); // Se agrego para guardar el registro en BD JSON
      mostrarToast("Cliente registrado con éxito ✅");
    }

    renderClientes();  //se ejecuta para actualizar la tabla en pantalla
    form.reset();
    document.getElementById("btnGuardar").textContent = "Guardar";
  });
}



// Funcion eliminar cliente
function eliminarCliente(indice) {
  const cliente = clientes[indice];
  
  if (confirm(`¿Eliminar "${cliente.nombres} ${cliente.apellido}"?`)) {
    clientes.splice(indice, 1); 
    guardarClientesJSON(); 
    renderClientes();            
    mostrarToast("Cliente eliminado ✅");
  }
}



// Funciones de validacion complementarias
function validarNombre(nombre) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,50}$/.test(nombre);
}

function validarApellido(apellido) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,50}$/.test(apellido);
}

function validarIdentificacion(identificacion) {
  return /^\d{7,10}$/.test(identificacion);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// Funcion limpiar errores
function limpiarErrores() {
  ['errorNombre', 'errorApellido', 'errorId', 'errorEmail'].forEach(id => {
    document.getElementById(id).textContent = "";
  });
}



// Funcion para mostrar los mensajes
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add("show");
  toast.removeAttribute("hidden");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.setAttribute("hidden", "");
  }, 3000);
}

