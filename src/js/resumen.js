
// Importar de .env
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


// Funcion que carga resumen
export function cargarResumen() {
  const main = document.getElementById("main");
  main.innerHTML = vistaResumen;

  actualizarEstadisticas();
}


// Función estadisticas
// Función estadisticas
function actualizarEstadisticas() {

  // 1. Filtrar pagos completados (estado = 1)
  const pagosCompletados = recibosCaja.filter(
    pago => Number(pago.estado) === 1
  );

  // 2. Filtrar pagos pendientes (estado = 2)
  const pagosPendientes = recibosCaja.filter(
    pago => Number(pago.estado) === 2
  );

  // 3. Sumar dinero de pagos completados
  // Nota: Es importante asegurar que valorPagado sea un número.
  const dineroTotal = pagosCompletados.reduce(
    (acumulador, pago) => acumulador + Number(pago.valorPagado), 0
  );

  // 4. Promedio de pagos
  const promedio = pagosCompletados.length > 0
    ? dineroTotal / pagosCompletados.length
    : 0;

  // 5. Mostrar los datos en pantalla
  document.getElementById("totalClientes").textContent = clientes.length;
  document.getElementById("totalConductores").textContent = conductores.length;
  document.getElementById("totalTraslados").textContent = traslados.length;
  document.getElementById("totalVehiculos").textContent = vehiculos.length;
  
  // Aquí estaba el error: escribiste 'pagosPendiente.length' (falta la 's' o la variable no existe)
  document.getElementById("promedioPago").textContent = `$${promedio.toFixed(2)} COP`;
  document.getElementById("pagosCompletos").textContent = pagosCompletados.length;
  document.getElementById("pagosPendientes").textContent = pagosPendientes.length; // CORREGIDO
  document.getElementById("totalDinero").textContent = `$${dineroTotal.toFixed(2)} COP`;
}








