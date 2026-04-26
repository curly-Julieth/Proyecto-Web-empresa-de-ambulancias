// Importo el array de vehículos desde env.js donde se guardan todos los datos
import { vehiculos } from "./env.js"

// Obtengo la referencia del contenedor principal donde voy a inyectar todo el HTML dinámicamente
const main = document.getElementById("main")


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
        <button type="submit">Guardar</button>
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
        </tr>
      </thead>
      <!-- El tbody se llena dinámicamente con los datos del array vehiculos -->
      <tbody id="tablaAmbulancias"></tbody>
    </table>
  </section>
`


// FUNCIÓN: ACTUALIZAR LA TABLA


// Esta función recorre el array vehiculos y crea filas en la tabla dinámicamente
function actualizarTabla() {
    // Obtengo el elemento tbody donde voy a insertar las filas
    const tablaAmbulancias = document.getElementById("tablaAmbulancias")
    
    // Limpio la tabla para evitar duplicados (borro el contenido anterior)
    tablaAmbulancias.innerHTML = ""
    
    // Recorro cada ambulancia en el array vehiculos
    vehiculos.forEach(ambulancia => {
        // Creo una fila HTML con los datos de la ambulancia actual
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
            </tr>
        `
        // Agrego la fila al tbody (+= significa concatenar, no reemplazar)
        tablaAmbulancias.innerHTML += fila
    })
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
        if (!validarFormulario()) {
            // Si hay errores, muestro mensaje en consola y no continúo
            console.log("Formulario contiene errores");
            return;
        }

        // Calculo el siguiente ID automáticamente (el máximo actual + 1)
        const maxId = vehiculos.length > 0 
            ? Math.max(...vehiculos.map(v => v.idVehiculo))  // Busco el ID máximo
            : 0  // Si no hay vehículos, empiezo en 0
        
        // Creo un objeto con los datos del nuevo vehículo
        const nuevaAmbulancia = {
            idVehiculo: maxId + 1,  // ID autoincremental
            placa: document.getElementById("placa").value.toUpperCase(),  // Mayúsculas
            modelo: document.getElementById("modelo").value.trim(),  // Sin espacios
            snMotor: document.getElementById("snmotor").value.trim(),
            snChasis: document.getElementById("snchasis").value.trim(),
            numeroSoat: document.getElementById("numeroSOAT").value.trim(),
            fechaVencimientoSoat: document.getElementById("fechaVencimientoSOAT").value,  // Tal cual viene
            tarjetaPropiedad: document.getElementById("tarjetaPropiedad").value.trim(),
            capacidadPacientes: parseInt(document.getElementById("capacidadPacientes").value),  // Convierto a número entero
            numeroInterno: document.getElementById("numeroInterno").value.trim(),
            idGPS: document.getElementById("idGPS").value.trim()
        }

        // Agrego la nueva ambulancia al array vehiculos (guardado en memoria)
        vehiculos.push(nuevaAmbulancia)
        
        // Limpio el formulario (borro todos los campos)
        formVehiculos.reset()
        
        // Actualizo la tabla para mostrar el nuevo vehículo
        actualizarTabla()
        
        // Muestro en consola el vehículo guardado 
        console.log("Vehículo guardado:", nuevaAmbulancia);
    })
    
    // Actualizo la tabla inicialmente para mostrar los vehículos que ya existen
    actualizarTabla()
}


// Espero a que el DOM esté completamente cargado antes de ejecutar la función
document.addEventListener("DOMContentLoaded", mostrarVehiculos)

// Exporto la función para que otros archivos puedan usarla si es necesario
export { mostrarVehiculos }
