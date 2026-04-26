import {
    clientes,
    vehiculos,
    conductores,
    contratos,
    beneficiarios,
    traslados,
} from "./env.js"

const main = document.getElementById("main");

const vistaTraslados = `
  <section>
    <h2>Registrar Traslado</h2>

    <form id="formTraslado">

      <label>Cliente</label>
      <select id="cliente"></select>
      <p class="error" id="errorCliente"></p>

      <label>Fecha</label>
      <input type="date" id="fecha">
      <p class="error" id="errorFecha"></p>

      <label>Hora</label>
      <input type="time" id="hora">
      <p class="error" id="errorHora"></p>

      <label>Dirección Inicial</label>
      <input type="text" id="direccionInicial">
      <p class="error" id="errorDireccionInicial"></p>

      <label>Dirección Final</label>
      <input type="text" id="direccionFinal">
      <p class="error" id="errorDireccionFinal"></p>

      <label>Conductor</label>
      <select id="conductor"></select>

      <label>Vehículo</label>
      <select id="vehiculo"></select>

      <label>Contrato</label>
      <select id="contrato"></select>

      <label>Beneficiarios</label>
      <select id="beneficiario"></select>

      <button type="submit">Guardar</button>
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
        </tr>
      </thead>
      <tbody id="tablaTraslados"></tbody>
    </table>

</section>
`;

main.innerHTML = vistaTraslados;

renderTraslados();

const selectCliente = document.getElementById("cliente");
selectCliente.innerHTML = `<option value="">Seleccione cliente</option>`;

clientes.forEach(cliente => {
  const option = document.createElement("option");

  option.value = cliente.idCliente;
  option.textContent = cliente.nombres;

  selectCliente.appendChild(option);
}); 

selectCliente.addEventListener("change", () => {
  const clienteId = Number(selectCliente.value);
  llenarContratos(clienteId);
});

const selectContrato = document.getElementById("contrato");

selectContrato.addEventListener("change", () => {
  const contratoId = Number(selectContrato.value);
  llenarBeneficiarios(contratoId)
})

const selectConductor = document.getElementById("conductor");
selectConductor.innerHTML = `<option value="">Seleccione conductor</option>`;

conductores.forEach(conductor => {
  const option = document.createElement("option");

  option.value = conductor.idConductor;
  option.textContent = conductor.nombre;

  selectConductor.appendChild(option);
});

const selectVehiculo = document.getElementById("vehiculo");
selectVehiculo.innerHTML = `<option value="">Seleccione el vehículo</option>`;

vehiculos.forEach(vehiculo => {
  const option = document.createElement("option");

  option.value = vehiculo.idVehiculo;
  option.textContent = vehiculo.placa;

  selectVehiculo.appendChild(option)
});

/*Esta función recibe el id de un cliente,
filtra los contratos que le pertenecen y actualiza el select para mostrar solo esos contratos.*/

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

function llenarBeneficiarios(contratoId) {
  const selectBeneficiario = document.getElementById("beneficiario");

  selectBeneficiario.innerHTML = `<option value="">Seleccione Beneficiario</option>`;

  const filtrados = beneficiarios.filter(b => b.idContrato === contratoId);

  filtrados.forEach(b => {
    const option = document.createElement("option");

    option.value = b.idBeneficiario;
    option.textContent = b.nombre;

    selectBeneficiario.appendChild(option);
  });
}

// función render para convertir datos en elementos visuales
function renderTraslados() {
  const tabla = document.getElementById("tablaTraslados");
  tabla.innerHTML = "";

  traslados.forEach(t => {
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

const form = document.getElementById("formTraslado");

form.addEventListener("submit", (e) => {
  e.preventDefault();   // evitar que los datos se pierdan o se recargue la página

  const cliente = parseInt(document.getElementById("cliente").value);  
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;
  const direccionInicial = document.getElementById("direccionInicial").value;
  const direccionFinal = document.getElementById("direccionFinal").value;
  const conductor = Number(document.getElementById("conductor").value);
  const vehiculo = Number(document.getElementById("vehiculo").value);
  const contrato = Number(document.getElementById("contrato").value)
  const beneficiario = Number(document.getElementById("beneficiario").value);

let hayError = false;

// limpiar errores
document.getElementById("errorCliente").textContent = "";
document.getElementById("errorFecha").textContent = "";
document.getElementById("errorHora").textContent = "";
document.getElementById("errorDireccionInicial").textContent = "";
document.getElementById("errorDireccionFinal").textContent = "";

// validar
if (!cliente) {
  document.getElementById("errorCliente").textContent = "Seleccione un cliente";
  hayError = true;
}

if (!fecha) {
  document.getElementById("errorFecha").textContent = "Seleccione una fecha";
  hayError = true;
}

if (!hora) {
  document.getElementById("errorHora").textContent = "Seleccione una hora";
  hayError = true;
}

if (!direccionInicial) {
  document.getElementById("errorDireccionInicial").textContent = "Ingrese dirección inicial";
  hayError = true;
}

if (!direccionFinal) {
  document.getElementById("errorDireccionFinal").textContent = "Ingrese dirección final";
  hayError = true;
}

if (hayError) return;

const nuevoTraslado = {
    idTraslado: traslados.length + 1,  // auto-crecimiento
    idCliente: cliente, // guarda el cliente seleccionado
    idConductor: conductor,
    idVehiculo: vehiculo,
    idContrato: contrato,      
    direccionInicial,
    direccionFinal,
    fechaTraslado: fecha,
    horaTraslado: hora,
    idBeneficiario: beneficiario
};

  traslados.push(nuevoTraslado);  // guarda en el array

  renderTraslados();

  form.reset();
  mostrarToast("Traslado registrado correctamente");
});


