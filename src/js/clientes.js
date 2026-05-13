//importa los clientes desde env.js para usarlos en esta sección, es decir, para mostrar los clientes registrados y para agregar nuevos clientes al array de clientes.
import { clientes } from "./env.js";

const vistaClientes =  `
<section>
  <h2>Registrar Cliente</h2>

  <form id="formCliente" autocomplete="new-password">

    <label>Nombre</label>
    <input type="text" id="nombre" autocomplete="off" placeholder="Ingrese nombre" maxlength="50">
    <p class="error" id="errorNombre"></p>

    <label>Apellido</label>
    <input type="text" id="apellido" autocomplete="new-password" placeholder="Ingrese apellido" maxlength="50">
    <p class="error" id="errorApellido"></p>
    

    <label>Identificación</label>
    <input type="text" id="identificacion" autocomplete="new-password" placeholder="Ingrese identificación" maxlength="10">
    <p class="error" id="errorId"></p>

    <label>Email</label>
    <input type="text" id="email" autocomplete="new-password" placeholder="Ingrese email">
    <p class="error" id="errorEmail"></p>

    <button type="submit" id="btnGuardar">Guardar</button>
  </form>

  <h3>Clientes registrados</h3>
  <table border="1">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Identificación</th>
        <th>Email</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody id="tablaClientes"></tbody>
  </table>
</section>
`;

// Variable para controlar si se está editando un cliente (null = nuevo cliente)  
let clienteEditable = null;

export function cargarClientes() {
  const main = document.getElementById("main");  //se inserta html dentro del main
  main.innerHTML = vistaClientes;

  renderClientes();
  activarFormulario();
}



//Esta función carga los datos en la tabla de clientes cada vez que se agrega, edita o elimina un cliente. Primero limpia el contenido actual de la tabla y luego recorre el array de clientes para crear una fila por cada cliente registrado, mostrando su información y agregando botones para editar o eliminar cada cliente. Además, se utiliza event delegation para manejar los eventos de los botones de editar y eliminar, lo que permite que funcionen incluso después de actualizar la tabla.
function renderClientes() {
  const tabla = document.getElementById("tablaClientes");
  tabla.innerHTML = "";  // Limpia la tabla 
//utilizamos forEach para recorrer el array de clientes y crear una fila por cada cliente registrado, mostrando su información y agregando botones para editar o eliminar cada cliente.
  clientes.forEach((c, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${c.idCliente}</td>
      <td>${c.nombres}</td>
      <td>${c.apellido}</td>
      <td>${c.identificacion}</td>
      <td>${c.email}</td>
      <td>
        <button class="btnEditar" data-index="${index}">Editar</button>
        <button class="btnEliminar" data-index="${index}">Eliminar</button>
      </td>
    `;

    tabla.appendChild(fila);   // la agrega al DOM
  });

  // Uso de event delegation para manejar los eventos de los botones de editar y eliminar,
  //  lo que permite que funcionen incluso después de actualizar la tabla. 
  // Se agrega un solo event listener al elemento padre (la tabla) 
  // y se verifica si el elemento clickeado es un botón de editar o eliminar,
  //  obteniendo el índice del cliente correspondiente a través del atributo data-index.
  // c
  tabla.addEventListener("click", function(e){
    if (e.target.classList.contains("btnEditar")){
        const indice = parseInt(e.target.getAttribute("data-index"));
        cargarEnFormulario(clientes[indice], indice);
    } else if (e.target.classList.contains("btnEliminar")){
      const indice = parseInt(e.target.getAttribute("data-index"));
      eliminarCliente(indice);
    }
  })
}

// Carga los datos del cliente seleccionado en el formulario para su edición.
function cargarEnFormulario(cliente, indice){
  document.getElementById("nombre").value = cliente.nombres;
  document.getElementById("apellido").value = cliente.apellido;
  document.getElementById("identificacion").value = cliente.identificacion;
  document.getElementById("email").value = cliente.email;

  clienteEditable = indice;

  document.getElementById("btnGuardar").textContent = "Actualizar";
  mostrarToast("Editando...");
}




// Formulario para agregar o editar clientes. Se agrega un event listener al formulario para detectar
//  cuando se envía el formulario, evitando que se recargue la página.
//  Luego, se capturan los valores de los inputs
//  y se realizan validaciones para asegurarse de que los datos ingresados sean correctos.
//  Si hay errores, se muestran mensajes de error debajo de cada campo correspondiente.
// 
function activarFormulario() {
  const form = document.getElementById("formCliente");

  form.addEventListener("submit", (e) => {  // se usa para detectar cuando se envía el formulario
    e.preventDefault(); //evita que se recargue la página y se pierda información

    // se capturan los valores de los inputs
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const identificacion = document.getElementById("identificacion").value.trim();
    const email = document.getElementById("email").value.trim();


 // Se realizan validaciones para asegurarse de que los datos ingresados sean correctos.

    let hayError = false;

    limpiarErrores();


    // validar cada campo utilizando funciones de validación específicas para cada tipo de dato 
    // (nombre, apellido, identificación y email). 
    // Si algún campo no cumple con los criterios de validación,
    //  se muestra un mensaje de error debajo del campo correspondiente
    //  y se marca que hay un error para evitar que se guarden los datos hasta que se corrijan.
    if (!nombre || !validarNombre(nombre)) {
      document.getElementById("errorNombre").textContent = "Nombre inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

    if (!apellido || !validarApellido(apellido)) {
      document.getElementById("errorApellido").textContent = "Apellido inválido (solo letras, 4-50 caracteres)";
      hayError = true;
    }

    if (!identificacion || !validarIdentificacion(identificacion)) {
      document.getElementById("errorId").textContent = "Identificación inválida (solo números, 7-10 digitos)";
      hayError = true;
    }

    if (!email || !validarEmail(email)) {
      document.getElementById("errorEmail").textContent = "Email inválido (Debe conteneder @ y nombre de dominio)";
      hayError = true;
    }


    // verificar que la identificación sea única, es decir,
    //  que no exista otro cliente registrado con la misma identificación.
    if (!hayError && clienteEditable === null) {
      const existe = clientes.some(c => c.identificacion === identificacion);
      if (existe) {
        document.getElementById("errorId").textContent = "Identificación ya registrada";
        hayError = true;
      }
    }

    if (hayError) {
      mostrarToast("⚠️ Corrige los errores antes de guardar");
      return;
    }
 
    // guardar o actualizar cliente. Si clienteEditable es null, se está creando un nuevo cliente,
    //  por lo que se crea un nuevo objeto cliente con los datos ingresados y se agrega al array de clientes.
    //  Si clienteEditable no es null, se está editando un cliente existente, por lo que se actualizan los datos del cliente correspondiente en el array de clientes utilizando el índice almacenado en clienteEditable.  
    if (clienteEditable !== null) {
      clientes[clienteEditable].nombres = nombre;
      clientes[clienteEditable].apellido = apellido;
      clientes[clienteEditable].identificacion = identificacion;
      clientes[clienteEditable].email = email;

      mostrarToast("Cliente actualizado con exito✅");
      clienteEditable = null;

    } else {
      const nuevoCliente = {
        idCliente: clientes.length + 1,
        nombres: nombre,
        apellido: apellido,
        identificacion,
        email
      };
  
      clientes.push(nuevoCliente);

      mostrarToast("Cliente registrado con éxito ✅");
    }

    renderClientes();  //se ejecuta para actualizar la tabla en pantalla
    form.reset();
    document.getElementById("btnGuardar").textContent = "Guardar";
  });
}

// eliminar cliente. Se recibe el índice del cliente a eliminar, 
// se muestra una confirmación al usuario para evitar eliminaciones accidentales, 
// y si el usuario confirma, se elimina el cliente del array de clientes 
// utilizando el método splice() y se actualiza la tabla de clientes
//  en pantalla llamando a renderClientes().
//  Además, se muestra un mensaje de éxito utilizando la función mostrarToast() para informar al usuario que el cliente ha sido eliminado correctamente.
function eliminarCliente(indice) {
  const cliente = clientes[indice];
  
  if (confirm(`¿Eliminar "${cliente.nombres} ${cliente.apellido}"?`)) {
    clientes.splice(indice, 1);  
    renderClientes();            
    mostrarToast("Cliente eliminado ✅");
  }
}

// Funciones de validación para cada campo del formulario,
//  utilizando expresiones regulares para asegurarse de que los datos ingresados 
// cumplan con los criterios establecidos (por ejemplo, que el nombre y apellido solo contengan letras y tengan una longitud entre 4 y 50 caracteres,
//  que la identificación solo contenga números y tenga una longitud entre 7 y 10 dígitos,
//  y que el email tenga un formato válido).
function validarNombre(nombre) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,50}$/.test(nombre);
}

function validarApellido(apellido) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{4,50}$/.test(apellido);
}

function validarIdentificacion(identificacion) {
  return /^\d{7,15}$/.test(identificacion);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function limpiarErrores() {
  ['errorNombre', 'errorApellido', 'errorId', 'errorEmail'].forEach(id => {
    document.getElementById(id).textContent = "";
  });
}
// Función para mostrar un mensaje de toast (notificación temporal) en la pantalla,
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

