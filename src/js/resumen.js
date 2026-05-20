
const vistaResumen = `
<section class="resumen">
  <h2>📊 Resumen General</h2>
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