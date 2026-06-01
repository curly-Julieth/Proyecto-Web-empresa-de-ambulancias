/**
 * RESPONSIBILITY:
 * This module manages the application's sidebar navigation.
 *
 * FEATURES:
 * - Renders the main navigation menu.
 * - Loads system modules dynamically.
 * - Controls active menu states.
 * - Handles theme switching (Light/Dark Mode).
 * - Handles user logout functionality.
 *
 * MODULES AVAILABLE:
 * - Dashboard
 * - Clients
 * - Drivers
 * - Vehicles
 * - Transfers
 * - Payments
 * - AI Assistant
 *
 * The application follows a Single Page Application (SPA)
 * architecture where each view is dynamically rendered
 * inside the main container without reloading the page.
 */

import { cargarResumen } from "./resumen.js";
import { cargarClientes } from "./clientes.js";
import { cargarConductores } from "./conductores.js";
import { cargarVehiculos } from "./vehiculos.js";
import { cargarTraslados } from "./traslados.js";
import { cargarPagos } from "./pagos.js";
import { cargarChatIA } from "./chatIA.js";
import { cerrarSesion } from "./cerrarSesion.js";


document.getElementById("menuPrincipalMount").innerHTML = `
    <div class="titleNav">
        <h3>Menú principal</h3>
    </div>
    <nav class="sidebarNav">
        <a href="#" class="navItem" id="btnResumen">Resumen</a>
        <a href="#" class="navItem" id="btnClientes">Clientes</a>
        <a href="#" class="navItem" id="btnConductores">Conductores</a>       
        <a href="#" class="navItem" id="btnVehiculos">Vehiculos</a>
        <a href="#" class="navItem" id="btnTraslados">Traslados</a>
        <a href="#" class="navItem" id="btnPagos">Pagos</a>
        <a href="#" class="navItem" id="btnChatIA">ChatIA</a>
    </nav>
    <div class="sideBarActions">
      <button id="btnTheme">Cambiar tema</button>
      <button id="btnLogout">Cerrar sesión</button>
    </div>
`


// Centralized navigation function
function navegar(vistaFn, btnId) {
  // Remove the “active” state from ALL buttons
  document.querySelectorAll(".navItem").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(btnId).classList.add("active");
  vistaFn();
}



// Navigation event listeners 
document.getElementById("btnResumen").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarResumen, "btnResumen");
});

document.getElementById("btnClientes").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarClientes, "btnClientes");
});

document.getElementById("btnConductores").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarConductores, "btnConductores");
});

document.getElementById("btnVehiculos").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarVehiculos, "btnVehiculos");
});

document.getElementById("btnTraslados").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarTraslados, "btnTraslados");
});

document.getElementById("btnPagos").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarPagos, "btnPagos");
});

document.getElementById("btnChatIA").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarChatIA, "btnChatIA");
});

document
  .getElementById("btnLogout")
  .addEventListener("click", cerrarSesion);


// Change theme (light/dark)
document.getElementById("btnTheme").addEventListener("click", () => {
  const app = document.getElementById("app");
  const currentTheme = app.getAttribute("data-theme");
  app.setAttribute("data-theme", currentTheme === "dark" ? "light" : "dark");
});

