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

      <label>Fecha</label>
      <input type="date" id="fecha">

      <label>Hora</label>
      <input type="time" id="hora">

      <button type="submit">Guardar</button>
    </form>
  </section>
`;

main.innerHTML = vistaTraslados;

const selectCliente = document.getElementById("cliente");
selectCliente.innerHTML = `<option value="">Seleccione cliente</option>`;

clientes.forEach(cliente => {
  const option = document.createElement("option");

  option.value = cliente.idCliente;
  option.textContent = cliente.nombres;

  selectCliente.appendChild(option);
}); 


const form = document.getElementById("formTraslado");

form.addEventListener("submit", (e) => {
  e.preventDefault();   // evitar que los datos se pierdan o se recargue la página

  const cliente = parseInt(document.getElementById("cliente").value);  
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  const nuevoTraslado = {
    idTraslado: traslados.length + 1,  // auto-crecimiento
    idCliente: cliente,      // guarda el cliente seleccionado
    fechaTraslado: fecha,
    horaTraslado: hora
  };

  traslados.push(nuevoTraslado);  // guarda en el array

  console.log("Traslados actuales:", traslados);
});
