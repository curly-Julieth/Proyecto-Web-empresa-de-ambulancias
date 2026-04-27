// Menu principal (sidebar)

import { cargarClientes } from "./clientes.js";

document.getElementById("menuPrincipalMount").innerHTML = `
    <div class="titleNav">
        <h3>Menú principal</h3>
    </div>
    <nav class="sidebarNav">
        <a href="#" class="navItem">Resumen</a>
        <a href="#" class="navItem" id="btnClientes">Clientes</a>
        <a href="#" class="navItem">Conductores</a>
        <a href="#" class="navItem">Vehiculos</a>
        <a href="#" class="navItem">Traslados</a>
        <a href="#" class="navItem">Pagos</a>
    </nav>
`

document.getElementById("btnClientes")
  .addEventListener("click", (e) => {
    e.preventDefault();
    cargarClientes();
});