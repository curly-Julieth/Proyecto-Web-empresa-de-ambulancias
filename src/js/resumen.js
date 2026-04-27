
const vistaResumen = `
<section class="resumen">
  <h2>📊 Resumen General</h2>
  
  <div class="cards-resumen">
    <div class="card">
      <h3>Clientes</h3>
      <span id="totalClientes">0</span>
    </div>
    <div class="card">
      <h3>Conductores</h3>
      <span id="totalConductores">0</span>
    </div>
    <div class="card">
      <h3>Vehículos</h3>
      <span id="totalVehiculos">0</span>
    </div>
    <div class="card">
      <h3>Traslados</h3>
      <span id="totalTraslados">0</span>
    </div>
  </div>

  <div class="stats-recientes">
    <h3>Estadísticas Recientes</h3>
    <p>Próximamente más estadísticas...</p>
  </div>
</section>
`;


export function cargarResumen() {
  const main = document.getElementById("main");
  main.innerHTML = vistaResumen;
  
//   //Cargar estadísticas (por ahora solo clientes)
//     actualizarEstadisticas();
}

// function actualizarEstadisticas() {
//   // Import dinámico para acceder a clientes
//   import("./clientes.js").then(({ clientes }) => {
//     document.getElementById("totalClientes").textContent = clientes.length;
//   }).catch(() => {
//     document.getElementById("totalClientes").textContent = "0";
//   });
  
//   // Las demás se quedan en 0 hasta que existan
//   document.getElementById("totalConductores").textContent = "0";
//   document.getElementById("totalVehiculos").textContent = "0";
//   document.getElementById("totalTraslados").textContent = "0";
// }