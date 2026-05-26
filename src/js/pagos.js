// Importaciones desde env.js
import { 
  recibosCaja, 
  clientes, 
  formasPago, 
  bancos 
} from "./env.js";


// Vista pagos
const vistaPagos = `
<section>
  <h2>Registrar Pago</h2>

  <form id="formPago">
    <label>Cliente</label>
    <select id="cliente"></select>
    <p class="error" id="errorCliente"></p>

    <label>Concepto</label>
    <input type="text" id="concepto" placeholder="Ingrese concepto">
    <p class="error" id="errorConcepto"></p>


    <label>Valor</label>
    <input type="number" id="valor" placeholder="Ingrese valor">
    <p class="error" id="errorValor"></p>


    <label>Forma de pago</label>
    <select id="formaPago"></select>
    <p class="error" id="errorFormaPago"></p>


    <label>Banco</label>
    <select id="banco">
      <option value="">Seleccione banco</option>
    </select>
    <p class="error" id="errorBanco"></p>
    

    <button type="submit" id="btnGuardarPago">Guardar</button>
  </form>


  <h3>Pagos registrados</h3>
  <table border="1">
    <thead>
      <tr>
        <th>Consecutivo</th>
        <th>Cliente</th>
        <th>Concepto</th>
        <th>Valor</th>
        <th>Forma Pago</th>
        <th>Banco</th>
        <th>Acciones</th>
      </tr>
    </thead>

    <tbody id="tablaPagos"></tbody>
  </table>
</section>
`;



// Variable global
// Guarda el indice del pago que se esta editando
let pagoEditable = null;


// Funcion cargar pagos
export function cargarPagos() {
  const main = document.getElementById("main");
  main.innerHTML = vistaPagos;
  cargarSelectClientes();
  cargarSelectFormasPago();
  cargarSelectBancos();
  renderPagos();
  activarFormulario();
  activarEventosTabla();
  activarEventosFormulario();
}



// Cargar clientes
function cargarSelectClientes() {
  const selectCliente = document.getElementById("cliente");
  selectCliente.innerHTML = `<option value="">Seleccione cliente</option>`;

  clientes.forEach(cliente => {
    const option = document.createElement("option");
    option.value = cliente.idCliente;
    option.textContent = `${cliente.nombres} ${cliente.apellido}`;
    selectCliente.appendChild(option);
  });
}



// Cargar formas de pago
function cargarSelectFormasPago() {
  const selectFormaPago = document.getElementById("formaPago");
  selectFormaPago.innerHTML = `<option value="">Seleccione forma pago</option>`;

  formasPago.forEach(fp => {
    const option = document.createElement("option");
    option.value = fp.idFormaPago;
    option.textContent = fp.nombre;
    selectFormaPago.appendChild(option);
  });
}



// Cargar bancos
function cargarSelectBancos() {
  const selectBanco = document.getElementById("banco");
  selectBanco.innerHTML = ` <option value="">Seleccione banco</option>`;

  bancos.forEach(banco => {
    const option = document.createElement("option");
    option.value = banco.idBanco;
    option.textContent = banco.nombre;
    selectBanco.appendChild(option);
  });
}



// Renderizar pagos
function renderPagos() {
  const tabla = document.getElementById("tablaPagos");
  tabla.innerHTML = "";

  recibosCaja.forEach((pago, index) => {
    // Buscar cliente
    const cliente = clientes.find(
      c => c.idCliente == pago.idCliente
    );
    // Buscar forma pago
    const formaPago = formasPago.find(
      fp => fp.idFormaPago == pago.idFormaPago
    );
    // Buscar banco
    const banco = bancos.find(
      b => b.idBanco == pago.idBanco
    );

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${pago.consecutivo}</td>
      <td>
        ${cliente 
          ? cliente.nombres + " " + cliente.apellido 
          : "No encontrado"}
      </td>
      <td>${pago.concepto}</td>
      <td>${pago.valorPagado.toLocaleString("es-CO")}</td>
      <td>${formaPago?.nombre || "No definido"}</td>
      <td>${banco?.nombre || "No aplica"}</td>
      <td>
        <button class="btnEditar" data-index="${index}">Editar</button>
        <button class="btnEliminar" data-index="${index}">Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}


// Activar eventos tabla
function activarEventosTabla() {
  const tabla = document.getElementById("tablaPagos");
  tabla.addEventListener("click", function(e) {
    if (e.target.classList.contains("btnEditar")) {
      const indice = parseInt(e.target.getAttribute("data-index"));
      cargarEnFormulario(recibosCaja[indice], indice);
    }else if (e.target.classList.contains("btnEliminar")) {
      const indice = parseInt(e.target.getAttribute("data-index"));
      eliminarPago(indice);
    }
  });
}



// Cargar en formulario
function cargarEnFormulario(pago, indice) {
  document.getElementById("cliente").value = pago.idCliente;
  document.getElementById("concepto").value = pago.concepto;
  document.getElementById("valor").value = pago.valorPagado;
  document.getElementById("formaPago").value = pago.idFormaPago;
  document.getElementById("banco").value = pago.idBanco || "";

  pagoEditable = indice;
  document.getElementById("btnGuardarPago").textContent = "Actualizar";
  mostrarToast("Editando pago...");
}


// Activar formulario
function activarFormulario() {
  const form = document.getElementById("formPago");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Capturar valores
    const cliente = document.getElementById("cliente").value;
    const concepto = document.getElementById("concepto").value.trim();
    const valor = Number(document.getElementById("valor").value);
    const formaPago = document.getElementById("formaPago").value;
    const banco = document.getElementById("banco").value;

    let hayError = false;
    limpiarErrores();
    
    // Validaciones basicas
    if (!cliente) {
      document.getElementById("errorCliente")
        .textContent = "Seleccione un cliente";
      hayError = true;
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]{5,100}$/.test(concepto)) {
      document.getElementById("errorConcepto")
        .textContent = "Concepto inválido";
      hayError = true;
    }

    if (isNaN(valor) || valor <= 0) {
      document.getElementById("errorValor")
        .textContent = "Valor inválido";
      hayError = true;
    }

    if (!formaPago) {
      document.getElementById("errorFormaPago")
        .textContent = "Seleccione forma de pago";
      hayError = true;
    }

    
    if (bancoRequerido() && !banco) {
      document.getElementById("errorBanco")
        .textContent = "Seleccione un banco";
      hayError = true;
    }

    
    // Mostrar error
    if (hayError) {
      mostrarToast("⚠️ Corrige los errores antes de guardar");
      return;
    }

    // Para editar
    if (pagoEditable !== null) {
      recibosCaja[pagoEditable].idCliente = Number(cliente);
      recibosCaja[pagoEditable].concepto = concepto;
      recibosCaja[pagoEditable].valorPagado = Number(valor);
      recibosCaja[pagoEditable].idFormaPago = Number(formaPago);
      recibosCaja[pagoEditable].idBanco = banco ? Number(banco) : null;
      mostrarToast("Pago actualizado correctamente ✅");
      pagoEditable = null;
    } else {
      const maxConsecutivo = recibosCaja.length > 0
          ? Math.max(
              ...recibosCaja.map(r =>
                Number(r.consecutivo.replace("RC-", ""))
              )
            )
          : 0;
      const nuevoPago = {
        idReciboCaja:
          recibosCaja.length > 0
            ? Math.max(
                ...recibosCaja.map(r => r.idReciboCaja)
              ) + 1
            : 1,
        consecutivo:  `RC-${String(maxConsecutivo + 1).padStart(3, "0")}`,
        fecha: new Date()
          .toISOString()
          .split("T")[0],
        idCliente: Number(cliente),
        valorPagado: Number(valor),
        concepto: concepto,
        idFormaPago: Number(formaPago),
        idBanco: banco
          ? Number(banco)
          : null
      };

      recibosCaja.push(nuevoPago);
      mostrarToast("Pago registrado ✅");
    }

    // Actualizar tabla
    renderPagos();
    // Reiniciar formulario
    form.reset();
    document.getElementById("banco").disabled = true;
    document.getElementById("btnGuardarPago").textContent = "Guardar";
  });
}


// Eliminar pago
function eliminarPago(indice) {
  const pago = recibosCaja[indice];
  if (confirm(`¿Eliminar recibo ${pago.consecutivo}?`)) {
    recibosCaja.splice(indice, 1);
    renderPagos();
    mostrarToast("Pago eliminado correctamente ✅");
  }
}

// Limpiar errores
function limpiarErrores() {
  [
    "errorCliente",
    "errorConcepto",
    "errorValor",
    "errorFormaPago",
    "errorBanco"
  ].forEach(id => {
    document.getElementById(id).textContent = "";

  });
}


function bancoRequerido() {
  const formaPago = Number(
    document.getElementById("formaPago").value
  );
  return formaPago > 1;
}


// Si se elige efectivo, desabilitar banco
function activarEventosFormulario() {
  const selectFormaPago = document.getElementById("formaPago");
  const selectBanco = document.getElementById("banco");
  selectFormaPago.addEventListener("change", () => {
    const formaPago =  Number(selectFormaPago.value);

    if (formaPago === 1) {
      selectBanco.disabled = true;
      selectBanco.value = "";
      document.getElementById("errorBanco").textContent = "";
    } else {
      selectBanco.disabled = false;
    }
  });

  if (!selectFormaPago.value || Number(selectFormaPago.value) === 1) {
    selectBanco.disabled = true;
  }
}



// Mensaje toast
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