import { conductores } from "./env.js";

const main = document.getElementById("main");

// Vista conductores
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
        <input type="text" id="cedula" pattern="[0-9]*" autocomplete="off" placeholder="Ingrese cédula">
        <p class="error" id="errorCedula"></p>
      </div>

      <div class="campo">
        <label>Departamento</label>
        <input type="text" id="idDepartamento" autocomplete="off" placeholder="Ingrese departamento" maxlength="50">
        <p class="error" id="errorDepartamento"></p>
      </div>

      <div class="campo">
        <label>Municipio</label>
        <input type="text" id="idMunicipio" autocomplete="off" placeholder="Ingrese municipio" maxlength="50">
        <p class="error" id="errorDireccionMunicipio"></p>
      </div>

      <div class="campo">
        <label>Barrio</label>
        <input type="text" id="idBarrio" autocomplete="off" placeholder="Ingrese barrio" maxlength="50">
        <p class="error" id="errorDireccionBarrio"></p>
      </div>

      <div class="campo">
        <label>Direccion</label>
        <input type="text" id="direccion" autocomplete="off" placeholder="Ingrese dirección" maxlength="50">
        <p class="error" id="errorDireccion"></p>
      </div>

      <div class="campo">
        <label>WhatsApp</label>
        <input type="text" id="whatsapp" autocomplete="off" placeholder="Ingrese Whatsapp">
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
          <th>Municipio</th>
          <th>Barrio</th>
          <th>Direccion</th>
          <th>Número de Licencia</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="tablaConductores"></tbody>
    </table>

</section>
`;

// Variable global 
let conductorEditable = null;


// Funcion cargar conductores
export function cargarConductores() {
  const main = document.getElementById("main");
  main.innerHTML = vistaConductores;

  renderConductores();
  activarFormulario();
}




// Funcion renderizar conductores
function renderConductores() {
  const tabla = document.getElementById("tablaConductores");
  tabla.innerHTML = "";

  conductores.forEach((c, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${c.idConductor}</td>
      <td>${c.nombre}</td>
      <td>${c.apellido}</td>
      <td>${c.cedula}</td>
      <td>${c.idMunicipio}</td>
      <td>${c.idBarrio}</td>
      <td>${c.direccion}</td>
      <td>${c.numeroLicenciaConduccion}</td>
      <td>
        <button class="btnEditar" data-index="${index}">Editar</button>
        <button class="btnEliminar" data-index="${index}">Eliminar</button>
    </td>
    `;
    tabla.appendChild(fila);
  });

  // Uso de event delegation para diferenciar eliminar de editar
  tabla.addEventListener("click", function(e){
    if(e.target.classList.contains("btnEditar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      cargarEnFormulario(conductores[indice], indice);
    }else if(e.target.classList.contains("btnEliminar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      eliminarConductor(indice);
    }
  });
}




// Funcion cargar en formulario (editar)
function cargarEnFormulario(conductor, indice){

  document.getElementById("nombre").value = conductor.nombre;
  document.getElementById("apellido").value = conductor.apellido;
  document.getElementById("cedula").value = conductor.cedula;
  document.getElementById("idMunicipio").value = conductor.idMunicipio;
  document.getElementById("idBarrio").value = conductor.idBarrio;
  document.getElementById("direccion").value = conductor.direccion;
  document.getElementById("whatsapp").value = conductor.whatsapp;
  document.getElementById("email").value = conductor.email;
  document.getElementById("numeroLicenciaConduccion").value = conductor.numeroLicenciaConduccion;

  conductorEditable = indice;

  document.getElementById("btnGuardar").textContent = "Actualizar";
  mostrarToast("Editando conductor...");
}




// Funcion activar formulario
function activarFormulario() {
  const form = document.getElementById("formConductor");
  form.addEventListener("submit", (e) => {

    e.preventDefault();

     // Se capturan los valores de los inputs
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const municipio = document.getElementById("idMunicipio").value.trim();
    const barrio = document.getElementById("idBarrio").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const whatsapp = document.getElementById("whatsapp").value.trim();
    const email = document.getElementById("email").value.trim();
    const licencia = document.getElementById("numeroLicenciaConduccion").value.trim();

    let hayError = false;
    limpiarErrores();

    

    // Validaciones basicas
    if (!nombre || !validarNombre(nombre)) {
      document.getElementById("errorNombre").textContent =
        "Nombre inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

     if (!apellido || !validarNombre(apellido)) {
      document.getElementById("errorApellido").textContent =
        "Apellido inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

    if (!cedula || !validarCedula(cedula)) {
      document.getElementById("errorCedula").textContent =
        "Identificación inválida (solo números, 7-15 dígitos)";
      hayError = true;
    }

    if (!municipio) {
      document.getElementById("errorDireccionMunicipio").textContent =
        "Municipio requerido";
      hayError = true;
    }

    if (!barrio) {
      document.getElementById("errorDireccionBarrio").textContent =
        "Barrio requerido";
      hayError = true;
    }

    if (!direccion) {
      document.getElementById("errorDireccion").textContent =
        "Dirección requerida";
      hayError = true;
    }

    if (!whatsapp || !validarWhatsapp(whatsapp)) {
      document.getElementById("errorWhatsapp").textContent =
        "WhatsApp inválido (solo números, 10-15 dígitos)";
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


    // Verificar duplicaciones
    if (!hayError && conductorEditable === null) {
      const existe = conductores.some(c => c.cedula === cedula);
      if (existe) {
        document.getElementById("errorCedula").textContent = "Cédula ya registrada";
        hayError = true;
      }
    }

    // Mensaje error antes de guardar
    if (hayError) {
      mostrarToast("⚠️ Corrige los errores antes de guardar");
      return;
    }



    // Guardar y editar 
    if(conductorEditable !== null){
      conductores[conductorEditable].nombre = nombre;
      conductores[conductorEditable].apellido = apellido;
      conductores[conductorEditable].cedula = cedula;
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
        idConductor: conductores.length + 1,
        nombre,
        apellido,
        cedula,
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
    document.getElementById("btnGuardar").textContent = "Guardar";
  });
}




// Funcion eliminar conductor
function eliminarConductor(indice) {
  const conductor = conductores[indice];
  
  if (confirm(`¿Eliminar "${conductor.nombre} ${conductor.apellido}"?`)) {
    conductores.splice(indice, 1); 
    renderConductores();            
    mostrarToast("Conductor eliminado ✅");
  }
}



// Funciones de validacion complementarias
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
  return /^\d{10,15}$/.test(whatsapp);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarLicencia(licencia) {
  return /^[a-zA-Z0-9-]{5,20}$/.test(licencia);
}




// Funcion limpiar errores
function limpiarErrores() {
  ['errorNombre', 'errorApellido', 'errorCedula', 'errorDepartamento', 'errorDireccionMunicipio', 'errorDireccionBarrio', 'errorDireccion', 'errorWhatsapp', 'errorEmail', 'errorLicencia'].forEach(id => {
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