/**
 * RESPONSIBILITY:
 * - Display the driver management interface.
 * - Register new drivers.
 * - Edit existing driver information.
 * - Delete drivers from the system.
 * - Validate form inputs.
 * - Manage location hierarchy (Department, Municipality, and Neighborhood).
 * - Dynamically update dependent select elements.
 * - Render driver records in the table.
 *
 * DEPENDENCIES:
 * - env.js
 *
 * MAIN FEATURES:
 * - CRUD operations for drivers.
 * - Dynamic DOM manipulation.
 * - Cascading select menus.
 * - Form validation.
 * - Table rendering and updates.
 */

import { conductores } from "./env.js";
import { departamentos, municipios, barrios } from "./env.js";


// Drivers view
const vistaConductores = `
    <section>
      <h2>Registrar Conductor</h2>

      <form id="formConductor" autocomplete="new-password">

      <div class="campo">
        <label>Nombre</label>
        <input type="text" id="nombre" autocomplete="off" placeholder="Ingrese nombre" maxlength="50">
        <p class="error" id="errorNombre"></p>
      </div>

      <div class="campo">
        <label>Apellido</label>
        <input type="text" id="apellido" autocomplete="off" placeholder="Ingrese apellido" maxlength="50">
        <p class="error" id="errorApellido"></p>
      </div>

      <div class="campo">
        <label>Cedula</label>
        <input type="text" id="cedula" autocomplete="off"  maxlength="10" placeholder="Ingrese cédula">
        <p class="error" id="errorCedula"></p>
      </div>

      <div class="campo">
        <label>Departamento</label>
        <select id="idDepartamento">
          <option value="">Seleccione departamento</option>
        </select>
        <p class="error" id="errorDepartamento"></p>
      </div>

      <div class="campo">
        <label>Municipio</label>
        <select id="idMunicipio" disabled>
          <option value="">Seleccione municipio</option>
        </select>
        <p class="error" id="errorMunicipio"></p>
      </div>

      <div class="campo">
        <label>Barrio</label>
        <select id="idBarrio" disabled>
          <option value="">Seleccione barrio</option>
        </select>
        <p class="error" id="errorBarrio"></p>
      </div>

      <div class="campo">
        <label>Direccion</label>
        <input type="text" id="direccion" autocomplete="off" placeholder="Ingrese dirección" maxlength="50">
        <p class="error" id="errorDireccion"></p>
      </div>

      <div class="campo">
        <label>WhatsApp</label>
        <input type="text" id="whatsapp" autocomplete="off" maxlength="10"  placeholder="Ingrese Whatsapp">
        <p class="error" id="errorWhatsapp"></p>
      </div>

      <div class="campo">
        <label>Email</label>
        <input type="text" id="email" autocomplete="off" placeholder="Ingrese email" maxlength="50">
        <p class="error" id="errorEmail"></p>
      </div>

    
      <div class="campo">
        <label>Número de Licencia</label>
        <input type="text" id="numeroLicenciaConduccion" autocomplete="off" placeholder="Ingrese licencia">
        <p class="error" id="errorLicencia"></p>
      </div>

        <button type="submit" id="btnGuardar">Guardar</button>
      </form>

    <h3>Conductores registrados</h3>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cédula</th>
          <th>Departamento</th>
          <th>Municipio</th>
          <th>Barrio</th>
          <th>Direccion</th>
          <th>WhatsApp</th>
          <th>Email</th>
          <th>Número de Licencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="tablaConductores"></tbody>
    </table>

</section>
`;

// Global variable 
let conductorEditable = null;


// Load drivers function
export function cargarConductores() {
  const main = document.getElementById("main");
  main.innerHTML = vistaConductores;

  cargarSelectDepartamentos(); // Load apartments at startup
  eventoCambiosSelects(); // Listen for changes in the select elements and disable them accordingly

  renderConductores(); 
  activarFormulario(); 
  activarEventosTabla(); // Button events in the table
}



// Function to load the “Departments” dropdown
function cargarSelectDepartamentos() {
  const select = document.getElementById("idDepartamento");
  select.innerHTML = '<option value="">Seleccione departamento</option>';

  departamentos.forEach(d => {
    const option = document.createElement("option");
    option.value = d.idDepartamento;
    option.textContent = d.nombre;
    select.appendChild(option);
  });
}


// Event for changes in the dropdown menus 
function eventoCambiosSelects() {
  const selectDepto = document.getElementById("idDepartamento");
  const selectMun = document.getElementById("idMunicipio");
  const selectBarrio = document.getElementById("idBarrio");

  // Change Department -> Load Municipalities
  selectDepto.addEventListener("change", (e) => {
    const idDepto = Number(e.target.value);
    
    // Reset children
    selectMun.innerHTML = '<option value="">Seleccione municipio</option>';
    selectBarrio.innerHTML = '<option value="">Seleccione barrio</option>';
    selectMun.disabled = true;
    selectBarrio.disabled = true;

    if (idDepto) {
      selectMun.disabled = false;
      const listaMunicipios = municipios.filter(m => m.idDepartamento === idDepto);
      
      listaMunicipios.forEach(m => {
        const option = document.createElement("option");
        option.value = m.idMunicipio;
        option.textContent = m.nombre;
        selectMun.appendChild(option);
      });
    }
  });

  // Switch from “Municipality” to “Neighborhoods”
  selectMun.addEventListener("change", (e) => {
  const idMun = Number(e.target.value);

  selectBarrio.innerHTML = '<option value="">Seleccione barrio</option>';
  selectBarrio.disabled = true;

  if (idMun) {

    const listaBarrios = barrios.filter(
      b => b.idMunicipio === idMun
    );

    if (listaBarrios.length === 0) {
      selectBarrio.innerHTML =
        '<option value="">Sin barrios registrados</option>';

      selectBarrio.disabled = true;
      return;
    }

    selectBarrio.disabled = false;

    listaBarrios.forEach(b => {
      const option = document.createElement("option");
      option.value = b.idBarrio;
      option.textContent = b.nombre;
      selectBarrio.appendChild(option);
    });
  }
});
}





// Function to render drivers
function renderConductores() {
  const tabla = document.getElementById("tablaConductores");
  tabla.innerHTML = "";

  conductores.forEach((c, index) => {
    const fila = document.createElement("tr");

    const departamento = departamentos.find(
      d => d.idDepartamento == c.idDepartamento
    );

    const municipio = municipios.find(
      m => m.idMunicipio == c.idMunicipio
    );

    const barrio = barrios.find(
      b => b.idBarrio == c.idBarrio
    );

    fila.innerHTML = `
      <td>${c.idConductor}</td>
      <td>${c.nombre}</td>
      <td>${c.apellido}</td>
      <td>${c.cedula}</td>
      <td>${departamento?.nombre || ""}</td>
      <td>${municipio?.nombre || ""}</td>
      <td>${barrio?.nombre || ""}</td>
      <td>${c.direccion}</td>
      <td>${c.whatsapp}</td>
      <td>${c.email}</td>
      <td>${c.numeroLicenciaConduccion}</td>
      <td>
        <button class="btnEditar" data-index="${index}">Editar</button>
        <button class="btnEliminar" data-index="${index}">Eliminar</button>
    </td>
    `;
    tabla.appendChild(fila);
  });
}


// Function to trigger table events
function activarEventosTabla() {
  const tabla = document.getElementById("tablaConductores");
  tabla.addEventListener("click", function(e){
    if(e.target.classList.contains("btnEditar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      cargarEnFormulario(conductores[indice], indice);
    } else if(e.target.classList.contains("btnEliminar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      eliminarConductor(indice);
    }
  });
}


// Function to load the form (edit)
function cargarEnFormulario(conductor, indice){

  document.getElementById("nombre").value = conductor.nombre;
  document.getElementById("apellido").value = conductor.apellido;
  document.getElementById("cedula").value = conductor.cedula;
  document.getElementById("idDepartamento").value = conductor.idDepartamento;

  document.getElementById("idDepartamento")
  .dispatchEvent(new Event("change"));

  document.getElementById("idMunicipio").value = conductor.idMunicipio;

  document.getElementById("idMunicipio")
  .dispatchEvent(new Event("change"));

  document.getElementById("idBarrio").value = conductor.idBarrio;
  document.getElementById("direccion").value = conductor.direccion;
  document.getElementById("whatsapp").value = conductor.whatsapp;
  document.getElementById("email").value = conductor.email;
  document.getElementById("numeroLicenciaConduccion").value = conductor.numeroLicenciaConduccion;

  conductorEditable = indice;

  document.getElementById("btnGuardar").textContent = "Actualizar";
  mostrarToast("Editando conductor...");
}




// Function to submit the form
function activarFormulario() {
  const form = document.getElementById("formConductor");
  form.addEventListener("submit", (e) => {

    e.preventDefault();

    // The values of the input fields are captured
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const departamento = document.getElementById("idDepartamento").value.trim();
    const municipio = document.getElementById("idMunicipio").value.trim();
    const barrio = document.getElementById("idBarrio").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const email = document.getElementById("email").value.trim();
    const licencia = document.getElementById("numeroLicenciaConduccion").value.trim();

    let hayError = false;
    limpiarErrores();

    

    // Basic validations
    if (!nombre || !validarNombre(nombre)) {
      document.getElementById("errorNombre").textContent =
        "Nombre inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

     if (!apellido || !validarApellido(apellido)) {
      document.getElementById("errorApellido").textContent =
        "Apellido inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

    if (!cedula || !validarCedula(cedula)) {
      document.getElementById("errorCedula").textContent =
        "Identificación inválida (solo números, 7-10 dígitos)";
      hayError = true;
    }

    if (!departamento) {
      document.getElementById("errorDepartamento").textContent =
        "Departamento requerido";
      hayError = true;
    }

    if (!municipio) {
      document.getElementById("errorMunicipio").textContent =
        "Municipio requerido";
      hayError = true;
    }


    const listaBarriosMunicipio =
      barrios.filter(b => b.idMunicipio == municipio);
    if (listaBarriosMunicipio.length > 0 && !barrio) {
      document.getElementById("errorBarrio").textContent =
        "Barrio requerido";
      hayError = true;
    }


    if (!direccion) {
      document.getElementById("errorDireccion").textContent =
        "Dirección requerida";
      hayError = true;
    }

    console.log("WhatsApp:", whatsapp);
    console.log("Longitud:", whatsapp.length);
    if (!whatsapp || !validarWhatsapp(whatsapp)) {
      document.getElementById("errorWhatsapp").textContent =
        "WhatsApp inválido (solo números, 10 dígitos)";
      hayError = true;
    }

    if (!email || !validarEmail(email)) {
      document.getElementById("errorEmail").textContent =
        "Email inválido";
      hayError = true;
    }

    if (!licencia || !validarLicencia(licencia)) {
      document.getElementById("errorLicencia").textContent =
        "Licencia inválida (5-20 caracteres)";
      hayError = true;
    }


    // Check for duplicates
    if (!hayError && conductorEditable === null) {
      const existe = conductores.some(c => c.cedula === cedula);
      if (existe) {
        document.getElementById("errorCedula").textContent = "Cédula ya registrada";
        hayError = true;
      }
    }

    // Error message before saving
    if (hayError) {
      mostrarToast("⚠️ Corrige los errores antes de guardar");
      return;
    }



    // Save and edit 
    if(conductorEditable !== null){
      conductores[conductorEditable].nombre = nombre;
      conductores[conductorEditable].apellido = apellido;
      conductores[conductorEditable].cedula = cedula;
      conductores[conductorEditable].idDepartamento = departamento;
      conductores[conductorEditable].idMunicipio = municipio;
      conductores[conductorEditable].idBarrio = barrio;
      conductores[conductorEditable].direccion = direccion;
      conductores[conductorEditable].whatsapp = whatsapp;
      conductores[conductorEditable].email = email;
      conductores[conductorEditable].numeroLicenciaConduccion = licencia;

      mostrarToast("Conductor actualizado con exito✅");
      conductorEditable = null;
    } else {
      const nuevoConductor = {
        idConductor:
          conductores.length > 0
            ? Math.max(...conductores.map(c => c.idConductor)) + 1
            : 1,
        nombre,
        apellido,
        cedula,
        idDepartamento: departamento,
        idMunicipio: municipio,
        idBarrio: barrio,
        direccion,
        whatsapp,
        email,
        numeroLicenciaConduccion: licencia
      };

    conductores.push(nuevoConductor);
    mostrarToast("Conductor registrado con éxito ✅");
    }

    renderConductores();
    form.reset();

    // This disables the “municipality” and “neighborhood” fields when saving data
    document.getElementById("idMunicipio").innerHTML =
      '<option value="">Seleccione municipio</option>';

    document.getElementById("idBarrio").innerHTML =
      '<option value="">Seleccione barrio</option>';

    document.getElementById("idMunicipio").disabled = true;
    document.getElementById("idBarrio").disabled = true;


    document.getElementById("btnGuardar").textContent = "Guardar";
  });
}




// Function to remove a conductor
function eliminarConductor(indice) {
  const conductor = conductores[indice];
  
  if (confirm(`¿Eliminar "${conductor.nombre} ${conductor.apellido}"?`)) {
    conductores.splice(indice, 1); 
    renderConductores();            
    mostrarToast("Conductor eliminado ✅");
  }
}



// Additional validation functions
function validarNombre(nombre) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,50}$/.test(nombre);
}

function validarApellido(apellido) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,50}$/.test(apellido);
}

function validarCedula(Cedula) {
  return /^\d{7,10}$/.test(Cedula);
}

function validarWhatsapp(whatsapp) {
  return /^\d{9,10}$/.test(whatsapp);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarLicencia(licencia) {
  return /^[a-zA-Z0-9-]{5,20}$/.test(licencia);
}




// Error-cleaning function
function limpiarErrores() {
  ['errorNombre', 'errorApellido', 'errorCedula', 'errorDepartamento', 'errorMunicipio', 'errorBarrio', 'errorDireccion', 'errorWhatsapp', 'errorEmail', 'errorLicencia'].forEach(id => {
    document.getElementById(id).textContent = "";
  });
}


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