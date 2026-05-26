import {
    clientes,
    vehiculos,
    conductores,
    contratos,
    beneficiarios,
    traslados,
} from "./env.js"

const main = document.getElementById("main");

// Vista traslados
const vistaTraslados = `
  <section>
    <h2>Registrar Traslado</h2>

    <form id="formTraslado">

      <div class="campo">
        <label>Cliente</label>
        <select id="cliente">
          <option value="">Seleccione un cliente</option>
        </select>
        <p class="error" id="errorCliente"></p>
      </div>

      <div class="campo">
        <label>Fecha</label>
        <input type="date" id="fecha">
        <p class="error" id="errorFecha"></p>
      </div>

      <div class="campo">
        <label>Hora</label>
        <input type="time" id="hora">
        <p class="error" id="errorHora"></p>
      </div>

      <div class="campo">
        <label>Dirección Inicial</label>
        <input
          type="text"
          id="direccionInicial"
          autocomplete="off"
          placeholder="Ingrese dirección inicial"
          maxlength="100"
        >
        <p class="error" id="errorDireccionInicial"></p>
      </div>

      <div class="campo">
        <label>Dirección Final</label>
        <input
          type="text"
          id="direccionFinal"
          autocomplete="off"
          placeholder="Ingrese dirección final"
          maxlength="100"
        >
        <p class="error" id="errorDireccionFinal"></p>
      </div>

      <div class="campo">
        <label>Conductor</label>
        <select id="conductor">
          <option value="">Seleccione conductor</option>
        </select>
        <p class="error" id="errorConductor"></p>
      </div>

      <div class="campo">
        <label>Vehículo</label>
        <select id="vehiculo">
          <option value="">Seleccione vehículo</option>
        </select>
        <p class="error" id="errorVehiculo"></p>
      </div>

      <div class="campo">
        <label>Contrato</label>
        <select id="contrato">
          <option value="">Seleccione contrato</option>
        </select>
        <p class="error" id="errorContrato"></p>
      </div>

      <div class="campo">
        <label>Beneficiario</label>
        <select id="beneficiario">
          <option value="">Seleccione beneficiario</option>
        </select>
        <p class="error" id="errorBeneficiario"></p>
      </div>

      <button type="submit" id="btnGuardar">
        Guardar
      </button>
    </form>

  <h3>Traslados registrados</h3>

  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Beneficiario</th>
        <th>Conductor</th>
        <th>Vehículo</th>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody id="tablaTraslados"></tbody>
  </table>

</section>
`;



// Variable global
let trasladoEditable = null;


// Funcion cargar traslados
export function cargarTraslados() {
  main.innerHTML = vistaTraslados;

  renderTraslados();
  llenarClientes();
  llenarConductores();
  llenarVehiculos();
  activarFormulario();
  activarEventos();
  activarEventosTabla();
}



// Funcion renderizar traslados
function renderTraslados() {
  const tabla = document.getElementById("tablaTraslados");
  tabla.innerHTML = "";

  traslados.forEach((t, index) => {
    const clienteObj = clientes.find(c => c.idCliente === t.idCliente);
    const beneficiarioObj = beneficiarios.find(b => b.idBeneficiario === t.idBeneficiario);
    const conductorObj = conductores.find(c => c.idConductor === t.idConductor);
    const vehiculoObj = vehiculos.find(v => v.idVehiculo === t.idVehiculo);
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${t.idTraslado}</td>
      <td>${clienteObj?.nombres || "N/A"}</td>
      <td>${beneficiarioObj?.nombre || "N/A"}</td>
      <td>${conductorObj?.nombre || "N/A"}</td>
      <td>${vehiculoObj?.placa || "N/A"}</td>
      <td>${t.fechaTraslado}</td>
      <td>${t.horaTraslado}</td>
      <td>
        <button class="btnEditar" data-index="${index}">Editar</button>
        <button class="btnEliminar" data-index="${index}">Eliminar</button>
      </td>
    `;

    tabla.appendChild(fila);
  });
}


// Funcion activar eventos tabla
function activarEventosTabla() {
  const tabla = document.getElementById("tablaTraslados");
  tabla.addEventListener("click", function(e){
    if(e.target.classList.contains("btnEditar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      cargarEnFormulario(traslados[indice], indice);
    } else if(e.target.classList.contains("btnEliminar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      eliminarTraslado(indice);
    }
  });
}





// Funcion cargar traslado en formulario
function cargarEnFormulario(traslado, indice){
  document.getElementById("cliente").value = traslado.idCliente;
  llenarContratos(traslado.idCliente);
  document.getElementById("contrato").value = traslado.idContrato;
  llenarBeneficiarios(traslado.idContrato);
  document.getElementById("beneficiario").value = traslado.idBeneficiario;
  document.getElementById("fecha").value = traslado.fechaTraslado;
  document.getElementById("hora").value = traslado.horaTraslado;
  document.getElementById("direccionInicial").value = traslado.direccionInicial;
  document.getElementById("direccionFinal").value = traslado.direccionFinal;
  document.getElementById("conductor").value = traslado.idConductor;
  document.getElementById("vehiculo").value = traslado.idVehiculo;

  trasladoEditable = indice;
  document.getElementById("btnGuardar").textContent = "Actualizar";
  mostrarToast("Editando traslado...");
}




// Funcion llenar clientes
function llenarClientes() {
  const selectCliente = document.getElementById("cliente");
  selectCliente.innerHTML = `<option value="">Seleccione cliente</option>`;

  clientes.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.idCliente;
    option.textContent = cliente.nombres;
    selectCliente.appendChild(option);
  });
}


// Funcion llenar conductores
function llenarConductores() {
  const selectConductor = document.getElementById("conductor");
  selectConductor.innerHTML = `<option value="">Seleccione conductor</option>`;

  conductores.forEach(conductor => {
    const option = document.createElement("option");
    option.value = conductor.idConductor;
    option.textContent = conductor.nombre;
    selectConductor.appendChild(option);
  });
}



// Funcion llenar vehiculos
function llenarVehiculos() {
  const selectVehiculo = document.getElementById("vehiculo");
  selectVehiculo.innerHTML = `<option value="">Seleccione vehículo</option>`;
  vehiculos.forEach(vehiculo => {
    const option = document.createElement("option");
    option.value = vehiculo.idVehiculo;
    option.textContent = vehiculo.placa;
    selectVehiculo.appendChild(option);
  });
}



// Funcion activar eventos
function activarEventos() {
  const selectCliente = document.getElementById("cliente");
  selectCliente.addEventListener("change", () => {
    const clienteId = Number(selectCliente.value);
    llenarContratos(clienteId);
  });

  const selectContrato = document.getElementById("contrato");
  selectContrato.addEventListener("change", () => {
    const contratoId = Number(selectContrato.value);
    llenarBeneficiarios(contratoId);
  });
}




// Funcion llenar contratos
function llenarContratos(clienteId) {
  const selectContrato = document.getElementById("contrato");
  selectContrato.innerHTML = `<option value="">Seleccione contrato</option>`;
  const contratosFiltrados = contratos.filter(c => c.idCliente === clienteId);

  contratosFiltrados.forEach(contrato => {
    const option = document.createElement("option");
    option.value = contrato.idContrato;
    option.textContent = contrato.numeroContrato;
    selectContrato.appendChild(option);
  });
}



// Funcion llenar beneficiarios
function llenarBeneficiarios(contratoId) {
  const selectBeneficiario = document.getElementById("beneficiario");
  selectBeneficiario.innerHTML = `<option value="">Seleccione beneficiario</option>`;
  const filtrados = beneficiarios.filter(b => b.idContrato === contratoId);

  filtrados.forEach(b => {
    const option = document.createElement("option");
    option.value = b.idBeneficiario;
    option.textContent = b.nombre;
    selectBeneficiario.appendChild(option);
  });
}





// Funcion activar formulario
function activarFormulario() {
  const form = document.getElementById("formTraslado");

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const cliente = Number(document.getElementById("cliente").value);
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const direccionInicial = document.getElementById("direccionInicial").value.trim();
    const direccionFinal = document.getElementById("direccionFinal").value.trim();
    const conductor = Number(document.getElementById("conductor").value);
    const vehiculo = Number(document.getElementById("vehiculo").value);
    const contrato = Number(document.getElementById("contrato").value);
    const beneficiario = Number(document.getElementById("beneficiario").value);

    let hayError = false;
    limpiarErrores();


    // Validaciones basicas
    if (!cliente) {
      document.getElementById("errorCliente").textContent =
        "Seleccione un cliente";
      hayError = true;
    }

    if (!fecha) {
      document.getElementById("errorFecha").textContent =
        "Seleccione una fecha";
      hayError = true;
    }

    if (!hora) {
      document.getElementById("errorHora").textContent =
        "Seleccione una hora";
      hayError = true;
    }

    if (!direccionInicial) {
      document.getElementById("errorDireccionInicial").textContent =
        "Dirección inicial requerida";
      hayError = true;
    }

    if (!direccionFinal) {
      document.getElementById("errorDireccionFinal").textContent =
        "Dirección final requerida";
      hayError = true;
    }

    if (!conductor) {
      document.getElementById("errorConductor").textContent =
        "Seleccione conductor";
      hayError = true;
    }

    if (!vehiculo) {
      document.getElementById("errorVehiculo").textContent =
        "Seleccione vehículo";
      hayError = true;
    }

    if (!contrato) {
      document.getElementById("errorContrato").textContent =
        "Seleccione contrato";
      hayError = true;
    }

    if (!beneficiario) {
      document.getElementById("errorBeneficiario").textContent =
        "Seleccione beneficiario";
      hayError = true;
    }


    if (hayError) {
      mostrarToast("⚠️ Corrige los errores");
      return;
    }

    // Editar traslado
    if(trasladoEditable !== null){
      traslados[trasladoEditable].idCliente = cliente;
      traslados[trasladoEditable].idConductor = conductor;
      traslados[trasladoEditable].idVehiculo = vehiculo;
      traslados[trasladoEditable].idContrato = contrato;
      traslados[trasladoEditable].idBeneficiario = beneficiario;
      traslados[trasladoEditable].direccionInicial = direccionInicial;
      traslados[trasladoEditable].direccionFinal = direccionFinal;
      traslados[trasladoEditable].fechaTraslado = fecha;
      traslados[trasladoEditable].horaTraslado = hora;

      mostrarToast("Traslado actualizado ✅");
      trasladoEditable = null;
    } else {
      const nuevoTraslado = {
        idTraslado: traslados.length + 1,
        idCliente: cliente,
        idConductor: conductor,
        idVehiculo: vehiculo,
        idContrato: contrato,
        idBeneficiario: beneficiario,
        direccionInicial,
        direccionFinal,
        fechaTraslado: fecha,
        horaTraslado: hora
      };
      traslados.push(nuevoTraslado);
      mostrarToast("Traslado registrado con éxito ✅");
    }

    renderTraslados();
    form.reset();
    document.getElementById("btnGuardar").textContent = "Guardar";
  });
}




// Funcion eliminar traslado
function eliminarTraslado(indice){
  const traslado = traslados[indice];
  if(confirm(`¿Eliminar traslado #${traslado.idTraslado}?`)){
    traslados.splice(indice, 1);
    renderTraslados();
    mostrarToast("Traslado eliminado ✅");
  }
}



// Funcion limpiar errores
function limpiarErrores() {

  [
    "errorCliente",
    "errorFecha",
    "errorHora",
    "errorDireccionInicial",
    "errorDireccionFinal",
    "errorConductor",
    "errorVehiculo",
    "errorContrato",
    "errorBeneficiario"
  ].forEach(id => {

    document.getElementById(id).textContent = "";
  });
}




// Funcion mostrar toast
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



