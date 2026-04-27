// Menu principal (sidebar)

import { cargarResumen } from "./resumen.js";
import { cargarClientes } from "./clientes.js";


document.getElementById("menuPrincipalMount").innerHTML = `
    <div class="titleNav">
        <h3>Menú principal</h3>
    </div>
    <nav class="sidebarNav">
        <a href="#" class="navItem" id="btnResumen">Resumen</a>
        <a href="#" class="navItem" id="btnClientes">Clientes</a>
        <a href="#" class="navItem" >Conductores</a>
        <a href="#" class="navItem">Vehiculos</a>
        <a href="#" class="navItem">Traslados</a>
        <a href="#" class="navItem">Pagos</a>
    </nav>
`

// document.getElementById("btnClientes")
//   .addEventListener("click", (e) => {
//     e.preventDefault();
//     cargarClientes();
// });


// ← NUEVA FUNCIÓN CENTRALIZADA ④
function navegar(vistaFn, btnId) {
  // Remover active de TODOS los botones
  document.querySelectorAll(".navItem").forEach(btn => {
    btn.classList.remove("active");
  });
  
  // Poner active SOLO en el botón actual
  document.getElementById(btnId).classList.add("active");
  
  // Cargar la vista
  vistaFn();
}

// ← NUEVOS EVENT LISTENERS ⑤
document.getElementById("btnResumen").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarResumen, "btnResumen");
});

document.getElementById("btnClientes").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarClientes, "btnClientes");
});