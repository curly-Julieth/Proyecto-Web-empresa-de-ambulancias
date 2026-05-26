// Importo array vehículos: trae datos desde archivo env.js
import { vehiculos } from "./env.js"

// main: obtiene elemento HTML donde inyectaremos todo el contenido
const main = document.getElementById("main")

// vehiculoEditable: guarda indice del vehículo que se está modificando, null si es nuevo
let vehiculoEditable = null


// EXPRESIONES REGULARES PARA VALIDACIONES
// regexPlaca: valida formato ABC123 con 3 letras mayúsculas y 3 números
const regexPlaca = /^[A-Z]{3}[0-9]{3}$/; 
// regexNumeroSoat: valida alfanuméricos con mínimo 8 caracteres
const regexNumeroSoat = /^[A-Z0-9]{8,}$/; 
// regexCapacidad: valida solo números enteros
const regexCapacidad = /^[0-9]+$/; 
// regexIdGPS: valida alfanuméricos con mínimo 3 caracteres
const regexIdGPS = /^[A-Z0-9]{3,}$/;


// TEMPLATE HTML DEL FORMULARIO Y TABLA
// vistaVehiculos: contiene todo el HTML del formulario y tabla en un string grande
const vistaVehiculos = `
  <section>
    <h2>Registrar vehículos</h2>

    <!-- FORMULARIO PARA REGISTRAR NUEVAS AMBULANCIAS -->
    <form id="formVehiculos">
        <!-- CAMPO: PLACA -->
        <div class="campo">
            <label for="placa">Placa</label>
            <input type="text" id="placa" name="placa" placeholder="Ingrese placa">
            <p id="errorPlaca" class="error"></p>
        </div>

        <!-- CAMPO: MODELO -->
        <div class="campo">
            <label for="modelo">Modelo</label>
            <input type="text" id="modelo" name="modelo" placeholder="Ingrese modelo">
            <p id="errorModelo" class="error"></p>
        </div>

        <!-- CAMPO: NÚMERO DE SERIE DEL MOTOR -->
        <div class="campo">
            <label for="snmotor">snMotor</label>
            <input type="text" id="snmotor" name="snmotor" placeholder="Ingrese número de serie del motor">
            <p id="errorSnMotor" class="error"></p>
        </div>

        <!-- CAMPO: NÚMERO DE SERIE DEL CHASIS -->
        <div class="campo">
            <label for="snchasis">snChasis</label>
            <input type="text" id="snchasis" name="snchasis" placeholder="Ingrese número de serie del chasis">
            <p id="errorSnChasis" class="error"></p>
        </div>

        <!-- CAMPO: NÚMERO SOAT (Seguro Obligatorio de Accidentes de Tránsito) -->
        <div class="campo">
            <label for="numeroSOAT">Número SOAT</label>
            <input type="text" id="numeroSOAT" name="numeroSOAT" placeholder="Ingrese número SOAT">
            <p id="errorNumeroSOAT" class="error"></p>
        </div>

        <!-- CAMPO: FECHA DE VENCIMIENTO DEL SOAT -->
        <div class="campo">
            <label for="fechaVencimientoSOAT">Fecha de Vencimiento SOAT</label>
            <input type="date" id="fechaVencimientoSOAT" name="fechaVencimientoSOAT" placeholder="Ingrese fecha de vencimiento del SOAT">
            <p id="errorFechaVencimientoSOAT" class="error"></p>
        </div>

        <!-- CAMPO: NÚMERO DE TARJETA DE PROPIEDAD -->
        <div class="campo">
            <label for="tarjetaPropiedad">Número Tarjeta de Propiedad</label>
            <input type="text" id="tarjetaPropiedad" name="tarjetaPropiedad" placeholder="Ingrese número de tarjeta de propiedad">
            <p id="errorTarjetaPropiedad" class="error"></p>
        </div>

        <!-- CAMPO: CAPACIDAD DE PACIENTES QUE TRANSPORTA LA AMBULANCIA -->
        <div class="campo">
            <label for="capacidadPacientes">Capacidad de Pacientes</label>
            <input type="text" id="capacidadPacientes" name="capacidadPacientes" placeholder="Ingrese capacidad de pacientes en ambulancia">
            <p id="errorCapacidadPacientes" class="error"></p>
        </div>

        <!-- CAMPO: NÚMERO INTERNO DE IDENTIFICACIÓN DE LA AMBULANCIA -->
        <div class="campo">
            <label for="numeroInterno">Número Interno</label>
            <input type="text" id="numeroInterno" name="numeroInterno" placeholder="Ingrese número interno de identificación de ambulancia">
            <p id="errorNumeroInterno" class="error"></p>
        </div>

        <!-- CAMPO: ID DEL DISPOSITIVO GPS DE RASTREO -->
        <div class="campo">
            <label for="idGPS">ID GPS</label>
            <input type="text" id="idGPS" name="idGPS" placeholder="Ingrese ID del dispositivo GPS de rastreo">
            <p id="errorIdGPS" class="error"></p>
        </div>

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

// actualizarTabla: función que recorre vehículos, crea filas HTML y maneja clicks en botones
function actualizarTabla() {
    // tablaAmbulancias: obtiene elemento tbody donde irán todas las filas
    const tablaAmbulancias = document.getElementById("tablaAmbulancias")
    
    // limpia tabla: borra contenido anterior para evitar duplicados
    tablaAmbulancias.innerHTML = ""
    
    // forEach: recorre cada vehículo del array con su índice
    vehiculos.forEach((ambulancia, index) => {
        // fila: string HTML con datos de una ambulancia usando template literals
        const fila = `
            <tr>
                <td>${ambulancia.idVehiculo}</td>
                <td>${ambulancia.placa}</td>
                <td>${ambulancia.modelo}</td>
                <td>${ambulancia.snMotor}</td>
                <td>${ambulancia.snChasis}</td>
                <td>${ambulancia.numeroSoat}</td>
                <td>${ambulancia.fechaVencimientoSoat}</td>
                <td>${ambulancia.tarjetaPropiedad}</td>
                <td>${ambulancia.capacidadPacientes}</td>
                <td>${ambulancia.numeroInterno}</td>
                <td>${ambulancia.idGPS}</td>
                <td>
                    <!-- btnEditar: botón con clase y atributo data-index que guarda la posición -->
                    <button class="btnEditar" data-index="${index}">Editar</button>
                    <!-- btnEliminar: botón con clase y atributo data-index que guarda la posición -->
                    <button class="btnEliminar" data-index="${index}">Eliminar</button>
                </td>
            </tr>
        `
        // concatena: añade fila nueva sin borrar anteriores
        tablaAmbulancias.innerHTML += fila
    })
}



// FUNCIÓN: ACTIVAR EVENTOS DE LA TABLA
function activarEventosTabla() {
    const tablaAmbulancias = document.getElementById("tablaAmbulancias");
    tablaAmbulancias.addEventListener("click", function(e) {
        if (e.target.classList.contains("btnEditar")) {
            const indice = parseInt(
                e.target.getAttribute("data-index")
            );
            cargarEnFormulario(
                vehiculos[indice],
                indice
            );
        } else if (
            e.target.classList.contains("btnEliminar")
        ) {
            const indice = parseInt(
                e.target.getAttribute("data-index")
            );
            eliminarVehiculo(indice);
        }
    });
}





// FUNCIÓN: CARGAR DATOS EN EL FORMULARIO PARA EDITAR
// cargarEnFormulario: carga datos de un vehículo en los inputs para editar
// recibe: ambulancia con datos y indice de su posición
function cargarEnFormulario(ambulancia, indice) {
    // value: propiedad que asigna contenido a cada input del formulario
    document.getElementById("placa").value = ambulancia.placa
    document.getElementById("modelo").value = ambulancia.modelo
    document.getElementById("snmotor").value = ambulancia.snMotor
    document.getElementById("snchasis").value = ambulancia.snChasis
    document.getElementById("numeroSOAT").value = ambulancia.numeroSoat
    document.getElementById("fechaVencimientoSOAT").value = ambulancia.fechaVencimientoSoat
    document.getElementById("tarjetaPropiedad").value = ambulancia.tarjetaPropiedad
    document.getElementById("capacidadPacientes").value = ambulancia.capacidadPacientes
    document.getElementById("numeroInterno").value = ambulancia.numeroInterno
    document.getElementById("idGPS").value = ambulancia.idGPS

    // vehiculoEditable: guarda el índice para saber cuál vehículo actualizar luego
    vehiculoEditable = indice

    // textContent: cambia el texto del botón de Guardar a Actualizar
    document.getElementById("btnGuardar").textContent = "Actualizar"
    
    // mostrarToast: muestra mensaje temporal indicando que se está editando
    mostrarToast("Editando vehiculos...")
}



// FUNCIÓN: ELIMINAR VEHÍCULO
// eliminarVehiculo: elimina un vehículo después de confirmación del usuario
// recibe: indice de la posición del vehículo a eliminar
function eliminarVehiculo(indice) {
    // ambulancia: obtiene el vehículo en esa posición para mostrar su placa
    const ambulancia = vehiculos[indice]
    
    // confirm: muestra diálogo de confirmación si cancelar, el bloque no se ejecuta
    if (confirm(`¿Eliminar vehículo con placa "${ambulancia.placa}"?`)) {
        // splice: elimina 1 elemento del array empezando en posición indice
        vehiculos.splice(indice, 1)
        
        // actualizarTabla: redibuja la tabla sin el vehículo eliminado
        actualizarTabla()
        
        // mostrarToast: muestra mensaje de éxito con emoji
        mostrarToast("Vehículo eliminado ✅")
    }
}


// FUNCIÓN: MOSTRAR NOTIFICACIÓN
// mostrarToast: muestra mensaje temporal que desaparece después de 3 segundos
// recibe: mensaje texto a mostrar al usuario
function mostrarToast(mensaje) {
    // toast: obtiene elemento del DOM que contiene las notificaciones
    const toast = document.getElementById("toast")
    
    // if: verifica que el elemento toast exista antes de modificarlo
    if (toast) {
        // textContent: asigna el mensaje al elemento toast
        toast.textContent = mensaje
        
        // classList.add: agrega clase CSS show que hace visible el toast
        toast.classList.add("show")
        
        // removeAttribute: elimina atributo hidden para que sea visible
        toast.removeAttribute("hidden")

        // setTimeout: ejecuta función anónima después de 3000 milisegundos
        setTimeout(() => {
            // classList.remove: quita clase show para ocultar el toast
            toast.classList.remove("show")
            
            // setAttribute: agrega atributo hidden para ocultarlo completamente
            toast.setAttribute("hidden", "")
        }, 3000)
    }
}



// FUNCIÓN: VALIDAR FORMULARIO
// validarFormulario: verifica que todos los inputs cumplan con validaciones, retorna true o false
function validarFormulario() {
    // toUpperCase: convierte placa a mayúsculas para uniformidad
    const placa = document.getElementById("placa").value.toUpperCase();
    
    // trim: elimina espacios en blanco del inicio y final de cada campo
    const modelo = document.getElementById("modelo").value.trim();
    const snMotor = document.getElementById("snmotor").value.trim();
    const snChasis = document.getElementById("snchasis").value.trim();
    const numeroSoat = document.getElementById("numeroSOAT").value.trim();
    const fechaVencimientoSoat = document.getElementById("fechaVencimientoSOAT").value;
    const tarjetaPropiedad = document.getElementById("tarjetaPropiedad").value.trim();
    const capacidadPacientes = document.getElementById("capacidadPacientes").value.trim();
    const numeroInterno = document.getElementById("numeroInterno").value.trim();
    const idGPS = document.getElementById("idGPS").value.trim();

    // errores: array que almacena mensajes de error encontrados
    let errores = [];

    // regexPlaca.test: verifica si placa cumple patrón ABC123
    if (!regexPlaca.test(placa)) {
        errores.push("La placa debe tener formato ABC123 (3 letras mayúsculas + 3 números)");
        document.getElementById("errorPlaca").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorPlaca").textContent = "";
    }

    // modelo.length: verifica que modelo tenga mínimo 3 caracteres
    if (modelo.length < 3) {
        errores.push("El modelo debe tener al menos 3 caracteres");
        document.getElementById("errorModelo").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorModelo").textContent = "";
    }

    // snMotor.length: verifica mínimo 3 caracteres
    if (snMotor.length < 3) {
        errores.push("El snMotor debe tener al menos 3 caracteres");
        document.getElementById("errorSnMotor").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorSnMotor").textContent = "";
    }

    // snChasis.length: verifica mínimo 3 caracteres
    if (snChasis.length < 3) {
        errores.push("El snChasis debe tener al menos 3 caracteres");
        document.getElementById("errorSnChasis").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorSnChasis").textContent = "";
    }

    // regexNumeroSoat.test: verifica alfanuméricos mínimo 8 caracteres
    if (!regexNumeroSoat.test(numeroSoat)) {
        errores.push("El número SOAT debe tener al menos 8 caracteres alfanuméricos");
        document.getElementById("errorNumeroSOAT").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorNumeroSOAT").textContent = "";
    }

    // new Date: verifica que fecha sea futura no pasada
    if (!fechaVencimientoSoat || new Date(fechaVencimientoSoat) < new Date()) {
        errores.push("La fecha de vencimiento debe ser futura");
        document.getElementById("errorFechaVencimientoSOAT").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorFechaVencimientoSOAT").textContent = "";
    }

    // tarjetaPropiedad.length: verifica mínimo 3 caracteres
    if (tarjetaPropiedad.length < 3) {
        errores.push("La tarjeta de propiedad debe tener al menos 3 caracteres");
        document.getElementById("errorTarjetaPropiedad").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorTarjetaPropiedad").textContent = "";
    }

    // regexCapacidad.test: verifica solo números, parseInt: convierte a número entero
    if (!regexCapacidad.test(capacidadPacientes) || parseInt(capacidadPacientes) < 1) {
        errores.push("La capacidad debe ser un número mayor a 0");
        document.getElementById("errorCapacidadPacientes").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorCapacidadPacientes").textContent = "";
    }

    // numeroInterno.length: verifica mínimo 3 caracteres
    if (numeroInterno.length < 3) {
        errores.push("El número interno debe tener al menos 3 caracteres");
        document.getElementById("errorNumeroInterno").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorNumeroInterno").textContent = "";
    }

    // regexIdGPS.test: verifica alfanuméricos mínimo 3 caracteres
    if (!regexIdGPS.test(idGPS)) {
        errores.push("El ID GPS debe tener al menos 3 caracteres alfanuméricos");
        document.getElementById("errorIdGPS").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorIdGPS").textContent = "";
    }

    // retorna: true si no hay errores, false si hay al menos uno
    return errores.length === 0;
}



// FUNCIÓN: MOSTRAR LA VISTA DE VEHÍCULOS
// Esta función inicializa toda la vista: carga el HTML, configura eventos y muestra los datos
function mostrarVehiculos() {
    // Inyecto el HTML de la plantilla en el contenedor principal
    main.innerHTML = vistaVehiculos

    activarEventosTabla();
    
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



// cargarVehiculos: función para cargar la vista de vehículos
export function cargarVehiculos() {
    mostrarVehiculos()
};
