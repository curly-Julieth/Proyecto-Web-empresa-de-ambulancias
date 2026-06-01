/*
 * FILE: resumen.js
 *
 * RESPONSIBILITY:
 * - Display a general dashboard with key system statistics.
 * - Calculate and show information about clients, drivers,
 *   vehicles, transfers, and payments.
 * - Summarize completed and pending payments.
 * - Calculate total revenue and average payment value.
 * - Update the dashboard dynamically using the current data
 *   stored in the application.
 *
 * DEPENDENCIES:
 * - env.js:
 *   traslados, conductores, recibosCaja,
 *   clientes, vehiculos.
 *
 * NOTES:
 * - All statistics are calculated from the arrays stored in memory.
 * - The dashboard is generated dynamically when the user opens
 *   the Summary section.
 * - No data is created, edited, or deleted in this module.
 */


// Import from .env
import {
  traslados,
  conductores,
  recibosCaja,
  clientes,
  vehiculos
} from "./env.js";



const vistaResumen = `
<section class="resumen">
  <h2>📊 Resumen General</h2>

  <div id="cards_container">
    <div class="cards">
      <h3>Total de clientes</h3>
      <p id ="totalClientes" class="resumen-cards"></p>
    </div>

    <div class="cards">
      <h3>Total de traslados</h3>
      <p id ="totalTraslados" class="resumen-cards"></p>
    </div>

    <div class="cards">
      <h3>Total de conductores</h3>
      <p id ="totalConductores" class="resumen-cards"></p>
    </div>

    <div class="cards">
      <h3>Total de ambulancias</h3>
      <p id ="totalVehiculos" class="resumen-cards"></p>
    </div>

    <div class="cards">
      <h3>Promedio de pagos</h3>
      <p id ="promedioPago" class="resumen-cards"></p>
    </div>

    <div class="cards">
      <h3>Pagos completos</h3>
      <p id ="pagosCompletos" class="resumen-cards"></p>
    </div>

    <div class="cards">
      <h3>Pagos pendientes</h3>
      <p id ="pagosPendientes" class="resumen-cards"></p>
    </div>


    <div class="cards">
      <h3>Dinero recaudado</h3>
      <p id ="totalDinero" class="resumen-cards"></p>
    </div>
  </div>

</section>
`;


// Function to load the summary
export function cargarResumen() {
  const main = document.getElementById("main");
  main.innerHTML = vistaResumen;

  actualizarEstadisticas();
}


// Function to update statistics
function actualizarEstadisticas() {

  // 1. Filter completed payments (status = 1)
  const pagosCompletados = recibosCaja.filter(
    pago => Number(pago.estado) === 1
  );

  // 2. Filter pending payments (status = 2)
  const pagosPendientes = recibosCaja.filter(
    pago => Number(pago.estado) === 2
  );

  // 3. Sum the amounts of completed payments
  // Note: Ensure `valorPagado` is converted to a number.
  const dineroTotal = pagosCompletados.reduce(
    (acumulador, pago) => acumulador + Number(pago.valorPagado), 0
  );

  // 4. Average payments
  const promedio = pagosCompletados.length > 0
    ? dineroTotal / pagosCompletados.length
    : 0;

  // 5. Show the data on screen
  document.getElementById("totalClientes").textContent = clientes.length;
  document.getElementById("totalConductores").textContent = conductores.length;
  document.getElementById("totalTraslados").textContent = traslados.length;
  document.getElementById("totalVehiculos").textContent = vehiculos.length;

  // Here was the error: you wrote 'pagosPendiente.length' (missing 's' or the variable does not exist)
  document.getElementById("promedioPago").textContent = `$${promedio.toFixed(2)} COP`;
  document.getElementById("pagosCompletos").textContent = pagosCompletados.length;
  document.getElementById("pagosPendientes").textContent = pagosPendientes.length; // CORREGIDO
  document.getElementById("totalDinero").textContent = `$${dineroTotal.toFixed(2)} COP`;
}








