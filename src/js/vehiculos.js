// Importo el array de vehículos desde env.js donde se guardan todos los datos
import { vehiculos } from "./env.js"

// Obtengo la referencia del contenedor principal donde voy a inyectar todo el HTML dinámicamente
const main = document.getElementById("main")

// Variable para rastrear qué vehículo se está editando
let vehiculoEditable = null


// EXPRESIONES REGULARES PARA VALIDACIONES


// Regex para validar placa: debe ser ABC123 (3 letras mayúsculas + 3 números)
const regexPlaca = /^[A-Z]{3}[0-9]{3}$/; 

// Regex para SOAT: alfanumérico mínimo 8 caracteres
const regexNumeroSoat = /^[A-Z0-9]{8,}$/; 

// Regex para capacidad: solo números
const regexCapacidad = /^[0-9]+$/; 

// Regex para ID GPS: alfanumérico mínimo 3 caracteres
const regexIdGPS = /^[A-Z0-9]{3,}$/;


// TEMPLATE HTML DEL FORMULARIO Y TABLA


// Declaro la plantilla HTML con el formulario y la tabla en un string de múltiples líneas
// Esta estructura se va a inyectar en el DOM cuando se cargue la página
const vistaVehiculos = `
  <section>
    <h2>Vehículos</h2>

    <!-- FORMULARIO PARA REGISTRAR NUEVAS AMBULANCIAS -->
    <form id="formVehiculos">
        <!-- CAMPO: PLACA -->
        <label for="placa">Placa</label>
        <input type="text" id="placa" name="placa" required>
        <p id="errorPlaca" class="error"></p>

        <!-- CAMPO: MODELO -->
        <label for="modelo">Modelo</label>
        <input type="text" id="modelo" name="modelo" required>
        <p id="errorModelo" class="error"></p>

        <!-- CAMPO: NÚMERO DE SERIE DEL MOTOR -->
        <label for="snmotor">snMotor</label>
        <input type="text" id="snmotor" name="snmotor" required>
        <p id="errorSnMotor" class="error"></p>

        <!-- CAMPO: NÚMERO DE SERIE DEL CHASIS -->
        <label for="snchasis">snChasis</label>
        <input type="text" id="snchasis" name="snchasis" required>
        <p id="errorSnChasis" class="error"></p>

        <!-- CAMPO: NÚMERO SOAT (Seguro Obligatorio de Accidentes de Tránsito) -->
        <label for="numeroSOAT">Número SOAT</label>
        <input type="text" id="numeroSOAT" name="numeroSOAT" required>
        <p id="errorNumeroSOAT" class="error"></p>

        <!-- CAMPO: FECHA DE VENCIMIENTO DEL SOAT -->
        <label for="fechaVencimientoSOAT">Fecha de Vencimiento SOAT</label>
        <input type="date" id="fechaVencimientoSOAT" name="fechaVencimientoSOAT" required>
        <p id="errorFechaVencimientoSOAT" class="error"></p>

        <!-- CAMPO: NÚMERO DE TARJETA DE PROPIEDAD -->
        <label for="tarjetaPropiedad">Número Tarjeta de Propiedad</label>
        <input type="text" id="tarjetaPropiedad" name="tarjetaPropiedad" required>
        <p id="errorTarjetaPropiedad" class="error"></p>

        <!-- CAMPO: CAPACIDAD DE PACIENTES QUE TRANSPORTA LA AMBULANCIA -->
        <label for="capacidadPacientes">Capacidad de Pacientes</label>
        <input type="text" id="capacidadPacientes" name="capacidadPacientes" required>
        <p id="errorCapacidadPacientes" class="error"></p>

        <!-- CAMPO: NÚMERO INTERNO DE IDENTIFICACIÓN DE LA AMBULANCIA -->
        <label for="numeroInterno">Número Interno</label>
        <input type="text" id="numeroInterno" name="numeroInterno" required>
        <p id="errorNumeroInterno" class="error"></p>

        <!-- CAMPO: ID DEL DISPOSITIVO GPS DE RASTREO -->
        <label for="idGPS">ID GPS</label>
        <input type="text" id="idGPS" name="idGPS" required>
        <p id="errorIdGPS" class="error"></p>

        <!-- BOTÓN PARA GUARDAR EL VEHÍCULO -->
        <button type="submit" id="btnGuardar">Guardar</button>
    </form>

    <!-- TABLA QUE MUESTRA TODAS LAS AMBULANCIAS REGISTRADAS -->
    <h3>Ambulancias Registradas</h3>
    <table border="1">
      <thead>
        <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Modelo</th>
            <th>snMotor</th>
            <th>snChasis</th>
            <th>Número SOAT</th>
            <th>Fecha de Vencimiento SOAT</th>
            <th>Número Tarjeta de Propiedad</th>
            <th>Capacidad de Pacientes</th>
            <th>Número Interno</th>
            <th>ID GPS</th>
            <th>Acciones</th>
        </tr>
      </thead>
      <!-- El tbody se llena dinámicamente con los datos del array vehiculos -->
      <tbody id="tablaAmbulancias"></tbody>
    </table>
  </section>
`


// FUNCIÓN: ACTUALIZAR LA TABLA


// Esta función recorre el array vehiculos y crea filas en la tabla dinámicamente
// También usa event delegation para manejar clicks en botones de editar y eliminar
function actualizarTabla() {
    // Obtengo el elemento tbody donde voy a insertar las filas
    const tablaAmbulancias = document.getElementById("tablaAmbulancias")
    
    // Limpio la tabla para evitar duplicados (borro el contenido anterior)
    tablaAmbulancias.innerHTML = "" // innerHTML = "" elimina todo el contenido HTML anterior
    
    // Recorro cada ambulancia en el array vehiculos
    // forEach itera sobre cada elemento del array
    // (ambulancia, index) = ambulancia es el objeto actual, index es la posición (0, 1, 2...)
    vehiculos.forEach((ambulancia, index) => {
        // Creo una fila HTML con los datos de la ambulancia actual
        // El backtick (`) permite insertar variables usando ${} dentro de strings
        const fila = `
            <tr>
                <!-- Mostro el ID único de la ambulancia -->
                <td>${ambulancia.idVehiculo}</td>
                <!-- Mostro la placa de la ambulancia -->
                <td>${ambulancia.placa}</td>
                <!-- Mostro el modelo de la ambulancia -->
                <td>${ambulancia.modelo}</td>
                <!-- Mostro el número de serie del motor -->
                <td>${ambulancia.snMotor}</td>
                <!-- Mostro el número de serie del chasis -->
                <td>${ambulancia.snChasis}</td>
                <!-- Mostro el número SOAT (seguro) -->
                <td>${ambulancia.numeroSoat}</td>
                <!-- Mostro la fecha de vencimiento del SOAT -->
                <td>${ambulancia.fechaVencimientoSoat}</td>
                <!-- Mostro el número de tarjeta de propiedad -->
                <td>${ambulancia.tarjetaPropiedad}</td>
                <!-- Mostro la capacidad de pacientes que puede transportar -->
                <td>${ambulancia.capacidadPacientes}</td>
                <!-- Mostro el número interno de identificación -->
                <td>${ambulancia.numeroInterno}</td>
                <!-- Mostro el ID del dispositivo GPS -->
                <td>${ambulancia.idGPS}</td>
                <!-- Columna de acciones con botones de editar y eliminar -->
                <td>
                    <!-- Botón Editar con data-index para guardar la posición en el array -->
                    <button class="btnEditar" data-index="${index}">Editar</button>
                    <!-- Botón Eliminar con data-index para guardar la posición en el array -->
                    <button class="btnEliminar" data-index="${index}">Eliminar</button>
                </td>
            </tr>
        `
        // Agrego la fila al tbody (+= significa concatenar, no reemplazar)
        // += añade el contenido nuevo sin borrar lo anterior
        tablaAmbulancias.innerHTML += fila
    })

    // ============ EVENT DELEGATION ============
    // Event delegation es una técnica que coloca UN solo listener en el elemento padre
    // En lugar de agregar un listener a cada botón individualmente
    // El listener se ejecuta cuando se hace click en cualquier elemento dentro del tbody
    tablaAmbulancias.addEventListener("click", function(e) {
        // e.target es el elemento exacto donde se hizo click
        // classList.contains() verifica si el elemento tiene la clase "btnEditar"
        if (e.target.classList.contains("btnEditar")) {
            // getAttribute("data-index") obtiene el valor del atributo data-index
            // parseInt() convierte el string a número entero
            const indice = parseInt(e.target.getAttribute("data-index"))
            // Llama la función cargarEnFormulario con el vehículo y su posición
            cargarEnFormulario(vehiculos[indice], indice)
        } else if (e.target.classList.contains("btnEliminar")) {
            // Si el click fue en un botón con clase "btnEliminar"
            const indice = parseInt(e.target.getAttribute("data-index"))
            // Llama la función eliminarVehiculo con la posición del vehículo
            eliminarVehiculo(indice)
        }
    })
}


// FUNCIÓN: CARGAR DATOS EN EL FORMULARIO PARA EDITAR

// Esta función carga los datos de un vehículo existente en el formulario para editarlo
// Recibe: ambulancia (objeto con datos) e indice (posición en el array)
function cargarEnFormulario(ambulancia, indice) {
    // .value establece el contenido del input
    // Cada línea obtiene un campo del formulario y lo llena con los datos de la ambulancia
    document.getElementById("placa").value = ambulancia.placa // Lleno el campo placa
    document.getElementById("modelo").value = ambulancia.modelo // Lleno el campo modelo
    document.getElementById("snmotor").value = ambulancia.snMotor // Lleno serie del motor
    document.getElementById("snchasis").value = ambulancia.snChasis // Lleno serie del chasis
    document.getElementById("numeroSOAT").value = ambulancia.numeroSoat // Lleno número SOAT
    document.getElementById("fechaVencimientoSOAT").value = ambulancia.fechaVencimientoSoat // Lleno fecha SOAT
    document.getElementById("tarjetaPropiedad").value = ambulancia.tarjetaPropiedad // Lleno tarjeta propiedad
    document.getElementById("capacidadPacientes").value = ambulancia.capacidadPacientes // Lleno capacidad
    document.getElementById("numeroInterno").value = ambulancia.numeroInterno // Lleno número interno
    document.getElementById("idGPS").value = ambulancia.idGPS // Lleno ID GPS

    // Guardo el índice del vehículo que se está editando
    // Esto es importante para saber cuál vehículo actualizar cuando se presione Guardar
    vehiculoEditable = indice

    // Cambio el texto del botón de "Guardar" a "Actualizar"
    // Para indicar al usuario que está editando, no creando un nuevo registro
    document.getElementById("btnGuardar").textContent = "Actualizar"
    
    // Muestro una notificación toast que dice "Editando..."
    mostrarToast("Editando...")
}

// FUNCIÓN: ELIMINAR VEHÍCULO

// Esta función elimina un vehículo después de confirmar
// Recibe: indice (posición del vehículo en el array que se quiere eliminar)
function eliminarVehiculo(indice) {
    // Obtengo la ambulancia en esa posición para mostrar sus datos en la confirmación
    const ambulancia = vehiculos[indice]
    
    // confirm() muestra un diálogo que pregunta si/no al usuario
    // Si da click en "Aceptar" retorna true, si da click en "Cancelar" retorna false
    // Aquí muestro la placa del vehículo para que sepa cuál va a eliminar
    if (confirm(`¿Eliminar vehículo con placa "${ambulancia.placa}"?`)) {
        // splice(indice, 1) elimina 1 elemento del array comenzando en la posición 'indice'
        // Si indice = 2, elimina el elemento en la posición 2
        vehiculos.splice(indice, 1) // Elimino el vehículo del array
        
        // Actualizo la tabla para que se vea reflejada la eliminación inmediatamente
        actualizarTabla()
        
        // Muestro un mensaje de éxito al usuario
        mostrarToast("Vehículo eliminado ✅")
    }
    // Si el usuario da click en "Cancelar", no sucede nada (la función termina)
}

// FUNCIÓN: MOSTRAR NOTIFICACIÓN

// Esta función muestra un mensaje temporal (toast) al usuario
// El toast es una notificación que aparece por unos segundos y desaparece
function mostrarToast(mensaje) {
    // Obtengo el elemento del DOM que muestra los toasts
    // Este elemento debe existir en el HTML principal (index.html)
    const toast = document.getElementById("toast")
    
    // Verifico que el elemento toast exista antes de modificarlo
    // if (toast) = si toast existe
    if (toast) {
        // textContent cambia el texto que se muestra en el elemento
        toast.textContent = mensaje // Asigno el mensaje a mostrar
        
        // classList.add("show") agrega la clase CSS "show" al elemento
        // La clase "show" probablemente tiene estilos que hacen visible el toast
        toast.classList.add("show") // Hago visible el toast
        
        // removeAttribute("hidden") elimina el atributo hidden
        // Algunos elementos pueden estar ocultos con hidden, así los muestro
        toast.removeAttribute("hidden") // Aseguro que sea visible

        // setTimeout ejecuta una función después de X milisegundos
        // 3000 milisegundos = 3 segundos
        setTimeout(() => {
            // Esta función se ejecutará después de 3 segundos
            // Remuevo la clase "show" para ocultar el toast
            toast.classList.remove("show") // Oculto el toast
            
            // Agrego el atributo hidden para ocultarlo completamente
            toast.setAttribute("hidden", "") // Lo oculto del DOM
        }, 3000) // 3000 ms = 3 segundos
    }
}

// FUNCIÓN: VALIDAR FORMULARIO


// Esta función valida que todos los datos ingresados cumplan con el formato correcto
function validarFormulario() {
    // Obtengo todos los valores del formulario y los limpio
    
    // Placa: convierto a mayúsculas para que sea uniforme
    const placa = document.getElementById("placa").value.toUpperCase();
    
    // trim() elimina espacios en blanco al inicio y final
    const modelo = document.getElementById("modelo").value.trim();
    const snMotor = document.getElementById("snmotor").value.trim();
    const snChasis = document.getElementById("snchasis").value.trim();
    const numeroSoat = document.getElementById("numeroSOAT").value.trim();
    const fechaVencimientoSoat = document.getElementById("fechaVencimientoSOAT").value;
    const tarjetaPropiedad = document.getElementById("tarjetaPropiedad").value.trim();
    const capacidadPacientes = document.getElementById("capacidadPacientes").value.trim();
    const numeroInterno = document.getElementById("numeroInterno").value.trim();
    const idGPS = document.getElementById("idGPS").value.trim();

    // Array para almacenar los errores encontrados
    let errores = [];

    // ---- VALIDAR PLACA ----
    // La placa debe cumplir el patrón ABC123
    if (!regexPlaca.test(placa)) {
        // Si no cumple, agrego el mensaje de error
        errores.push("La placa debe tener formato ABC123 (3 letras mayúsculas + 3 números)");
        // Muestro el error en el elemento designado
        document.getElementById("errorPlaca").textContent = errores[errores.length - 1];
    } else {
        // Si es válido, limpio el mensaje de error
        document.getElementById("errorPlaca").textContent = "";
    }

    // ---- VALIDAR MODELO ----
    // El modelo debe tener al menos 3 caracteres
    if (modelo.length < 3) {
        errores.push("El modelo debe tener al menos 3 caracteres");
        document.getElementById("errorModelo").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorModelo").textContent = "";
    }

    // ---- VALIDAR NÚMERO DE SERIE DEL MOTOR ----
    // Debe tener al menos 3 caracteres
    if (snMotor.length < 3) {
        errores.push("El snMotor debe tener al menos 3 caracteres");
        document.getElementById("errorSnMotor").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorSnMotor").textContent = "";
    }

    // ---- VALIDAR NÚMERO DE SERIE DEL CHASIS ----
    // Debe tener al menos 3 caracteres
    if (snChasis.length < 3) {
        errores.push("El snChasis debe tener al menos 3 caracteres");
        document.getElementById("errorSnChasis").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorSnChasis").textContent = "";
    }

    // ---- VALIDAR NÚMERO SOAT ----
    // Debe ser alfanumérico con mínimo 8 caracteres
    if (!regexNumeroSoat.test(numeroSoat)) {
        errores.push("El número SOAT debe tener al menos 8 caracteres alfanuméricos");
        document.getElementById("errorNumeroSOAT").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorNumeroSOAT").textContent = "";
    }

    // ---- VALIDAR FECHA DE VENCIMIENTO SOAT ----
    // La fecha debe existir y ser mayor a la fecha actual (fecha futura)
    if (!fechaVencimientoSoat || new Date(fechaVencimientoSoat) < new Date()) {
        errores.push("La fecha de vencimiento debe ser futura (YYYY-MM-DD)");
        document.getElementById("errorFechaVencimientoSOAT").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorFechaVencimientoSOAT").textContent = "";
    }

    // ---- VALIDAR TARJETA DE PROPIEDAD ----
    // Debe tener al menos 3 caracteres
    if (tarjetaPropiedad.length < 3) {
        errores.push("La tarjeta de propiedad debe tener al menos 3 caracteres");
        document.getElementById("errorTarjetaPropiedad").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorTarjetaPropiedad").textContent = "";
    }

    // ---- VALIDAR CAPACIDAD DE PACIENTES ----
    // Debe ser un número válido y mayor a 0
    if (!regexCapacidad.test(capacidadPacientes) || parseInt(capacidadPacientes) < 1) {
        errores.push("La capacidad debe ser un número mayor a 0");
        document.getElementById("errorCapacidadPacientes").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorCapacidadPacientes").textContent = "";
    }

    // ---- VALIDAR NÚMERO INTERNO ----
    // Debe tener al menos 3 caracteres
    if (numeroInterno.length < 3) {
        errores.push("El número interno debe tener al menos 3 caracteres");
        document.getElementById("errorNumeroInterno").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorNumeroInterno").textContent = "";
    }

    // ---- VALIDAR ID GPS ----
    // Debe ser alfanumérico con mínimo 3 caracteres
    if (!regexIdGPS.test(idGPS)) {
        errores.push("El ID GPS debe tener al menos 3 caracteres alfanuméricos");
        document.getElementById("errorIdGPS").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorIdGPS").textContent = "";
    }

    // Si no hay errores, retorno true (formulario válido), si hay errores retorno false
    return errores.length === 0;
}

// FUNCIÓN: MOSTRAR LA VISTA DE VEHÍCULOS


// Esta función inicializa toda la vista: carga el HTML, configura eventos y muestra los datos
function mostrarVehiculos() {
    // Inyecto el HTML de la plantilla en el contenedor principal
    main.innerHTML = vistaVehiculos
    
    // Obtengo referencias al formulario y la tabla después de inyectar el HTML
    const formVehiculos = document.getElementById("formVehiculos")
    const tablaAmbulancias = document.getElementById("tablaAmbulancias")
    
    // Configuro el evento al hacer submit del formulario (al hacer click en Guardar)
    formVehiculos.addEventListener("submit", function(event) {
        // Prevengo el comportamiento por defecto (recargar página)
        event.preventDefault()

        // Valido que todos los datos sean correctos antes de guardar
        // validarFormulario() retorna true si no hay errores, false si hay errores
        if (!validarFormulario()) { // ! significa NOT (negación)
            // Si hay errores (validarFormulario retorna false), entro aquí
            // console.log() muestra un mensaje en la consola del navegador (F12)
            console.log("Formulario contiene errores");
            
            // Muestro un toast con un mensaje de advertencia al usuario
            mostrarToast("⚠️ Corrige los errores antes de guardar");
            
            // return; detiene la ejecución de la función
            // No continúa con el resto del código
            return;
        }

        // Si estamos editando un vehículo existente
        // vehiculoEditable !== null significa que el valor no es null (es diferente de null)
        // Si vehiculoEditable tiene un índice (0, 1, 2...), estamos editando
        if (vehiculoEditable !== null) {
            vehiculos[vehiculoEditable].placa = document.getElementById("placa").value.toUpperCase()
            vehiculos[vehiculoEditable].modelo = document.getElementById("modelo").value.trim()
            vehiculos[vehiculoEditable].snMotor = document.getElementById("snmotor").value.trim()
            vehiculos[vehiculoEditable].snChasis = document.getElementById("snchasis").value.trim()
            vehiculos[vehiculoEditable].numeroSoat = document.getElementById("numeroSOAT").value.trim()
            vehiculos[vehiculoEditable].fechaVencimientoSoat = document.getElementById("fechaVencimientoSOAT").value
            vehiculos[vehiculoEditable].tarjetaPropiedad = document.getElementById("tarjetaPropiedad").value.trim()
            vehiculos[vehiculoEditable].capacidadPacientes = parseInt(document.getElementById("capacidadPacientes").value)
            vehiculos[vehiculoEditable].numeroInterno = document.getElementById("numeroInterno").value.trim()
            vehiculos[vehiculoEditable].idGPS = document.getElementById("idGPS").value.trim()

            mostrarToast("Vehículo actualizado con éxito ✅")
            vehiculoEditable = null
        } else {
            // Else = si la condición anterior (vehiculoEditable !== null) es falsa
            // Llegamos aquí cuando vehiculoEditable === null (es decir, NO estamos editando)
            // Esto significa que vamos a CREAR un nuevo vehículo
            
            // Calculo el siguiente ID automáticamente (el máximo actual + 1)
            // vehiculos.length > 0 verifica si hay vehículos en el array
            const maxId = vehiculos.length > 0 
                ? Math.max(...vehiculos.map(v => v.idVehiculo))  // Si hay vehículos, busco el ID máximo
                // El operador ? : es ternario (si_es_true ? si_es_true : si_es_false)
                // map() crea un array solo con los IDs: [1, 2, 3, 4...]
                // Math.max(...) busca el número más grande en el array
                : 0  // Si no hay vehículos, empiezo con ID = 0
            
            // Creo un objeto con los datos del nuevo vehículo
            // {} crea un objeto vacío, dentro agrego propiedades
            const nuevaAmbulancia = {
                // idVehiculo será el ID máximo + 1 (autoincremental)
                // Ejemplo: si el máximo es 3, el nuevo será 4
                idVehiculo: maxId + 1,  // ID autoincremental
                
                // toUpperCase() convierte a mayúsculas (ABC123)
                placa: document.getElementById("placa").value.toUpperCase(),  // Placa en mayúsculas
                
                // trim() elimina espacios del inicio y final
                modelo: document.getElementById("modelo").value.trim(),  // Modelo sin espacios
                snMotor: document.getElementById("snmotor").value.trim(), // Serie motor sin espacios
                snChasis: document.getElementById("snchasis").value.trim(), // Serie chasis sin espacios
                numeroSoat: document.getElementById("numeroSOAT").value.trim(), // SOAT sin espacios
                
                // La fecha se guarda tal como viene del input type="date"
                fechaVencimientoSoat: document.getElementById("fechaVencimientoSOAT").value,  // Fecha sin cambios
                
                tarjetaPropiedad: document.getElementById("tarjetaPropiedad").value.trim(), // Tarjeta sin espacios
                
                // parseInt() convierte el texto a número entero
                // "5" -> 5 (string a número)
                capacidadPacientes: parseInt(document.getElementById("capacidadPacientes").value),  // Capacidad como número
                
                numeroInterno: document.getElementById("numeroInterno").value.trim(), // Número interno sin espacios
                idGPS: document.getElementById("idGPS").value.trim() // ID GPS sin espacios
            }

            // push() agrega un elemento al final del array
            // vehiculos.push(nuevaAmbulancia) añade el nuevo objeto al array
            vehiculos.push(nuevaAmbulancia) // Agrego la nueva ambulancia al array
            
            // Muestro un toast de éxito al usuario
            mostrarToast("Vehículo registrado con éxito ✅")
        }
        
        // Limpio el formulario (borro todos los campos)
        // .reset() es un método especial de los formularios que limpia todos sus inputs
        // Todos los campos vuelven a estar vacíos después de guardar
        formVehiculos.reset() // Borro todos los campos del formulario
        
        // Actualizo la tabla para mostrar el cambio
        // Si creé un nuevo vehículo, aparecerá en la tabla
        // Si edité un vehículo, la tabla mostrará los datos actualizados
        actualizarTabla() // Llamo la función para actualizar la tabla
        
        // Restablezco el botón a su estado inicial
        // Si estábamos editando, el botón decía "Actualizar"
        // Ahora lo cambio de vuelta a "Guardar" para nuevos registros
        document.getElementById("btnGuardar").textContent = "Guardar" // Restauro el texto del botón
    })
    
    // Actualizo la tabla inicialmente para mostrar los vehículos que ya existen
    actualizarTabla()
}


// Espero a que el DOM esté completamente cargado antes de ejecutar la función
document.addEventListener("DOMContentLoaded", mostrarVehiculos)

// Exporto la función para que otros archivos puedan usarla si es necesario
export { mostrarVehiculos }
