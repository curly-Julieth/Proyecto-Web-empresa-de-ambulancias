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
    <div class="sideBarActions">
      <button id="btnTheme">Cambiar tema</button>
      <button id="btnLogout">Cerrar sesión</button>
    </div>
`


// Funcion centralizada de navegación
function navegar(vistaFn, btnId) {
  // Remover active de TODOS los botones
  document.querySelectorAll(".navItem").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(btnId).classList.add("active");
  vistaFn();
}



// Events listeners de navegación 
document.getElementById("btnResumen").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarResumen, "btnResumen");
});

document.getElementById("btnClientes").addEventListener("click", (e) => {
  e.preventDefault();
  navegar(cargarClientes, "btnClientes");
});



// Cambiar tema (claro/oscuro)
document.getElementById("btnTheme").addEventListener("click", () => {
  const app = document.getElementById("app");
  const currentTheme = app.getAttribute("data-theme");
  app.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
});

