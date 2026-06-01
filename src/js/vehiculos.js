/**
 * RESPONSIBILITY:
 * - Display the vehicle management interface.
 * - Register new ambulance vehicles.
 * - Edit existing vehicle information.
 * - Delete vehicles from the system.
 * - Validate vehicle data using regular expressions.
 * - Render vehicle records dynamically in the table.
 * - Manage ambulance-related information such as plate number,
 *   SOAT, engine serial number, chassis serial number,
 *   passenger capacity, internal number, and GPS identifier.
 *
 * DEPENDENCIES:
 * - env.js
 *
 * MAIN FEATURES:
 * - CRUD operations for vehicles.
 * - Form validation using regular expressions.
 * - Dynamic DOM manipulation.
 * - Table rendering and updates.
 * - Ambulance fleet management.
 */


import { vehiculos } from "./env.js"

// main: retrieves the HTML element where we will inject all the content


// editableVehicle: stores the index of the vehicle being edited; null if it is new
let vehiculoEditable = null


// REGULAR EXPRESSIONS FOR VALIDATION
// regexPlaca: validates the ABC123 format with 3 uppercase letters and 3 numbers
const regexPlaca = /^[A-Z]{3}[0-9]{3}$/; 
// regexNumeroSoat: validates alphanumeric characters with a minimum of 8 characters
const regexNumeroSoat = /^[A-Z0-9]{8,}$/; 
// regexCapacity: validates only integers
const regexCapacidad = /^[0-9]+$/; 
// regexIdGPS: validates alphanumeric strings with at least 3 characters
const regexIdGPS = /^[A-Z0-9]{3,}$/;


// TEMPLATE HTML FOR THE FORM AND TABLE
// vistaVehiculos: contains all the HTML for the form and table as a large string
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


// FUNCTION: UPDATE THE TABLE
// actualizarTabla: function that iterates over vehicles, creates HTML rows, and handles button clicks
function actualizarTabla() {
    // ambulancesTable: retrieves the tbody element that will contain all the rows
    const tablaAmbulancias = document.getElementById("tablaAmbulancias")
    
    // Clear table: Delete previous content to avoid duplicates
    tablaAmbulancias.innerHTML = ""
    
    // forEach: loop through each vehicle in the array using its index
    vehiculos.forEach((ambulancia, index) => {
        // fila: HTML string containing data about an ambulance using template literals
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
        // concatenate: adds a new row without deleting the previous ones
        tablaAmbulancias.innerHTML += fila
    })
}



// FUNCTION: ACTIVATE TABLE EVENTS
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


// FUNCTION: LOAD DATA INTO THE FORM FOR EDITING
// cargarEnFormulario: loads vehicle data into the inputs for editing
// receives: ambulance with data and index of its position
function cargarEnFormulario(ambulancia, indice) {
    // value: property that assigns content to each input of the form
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

    // vehiculoEditable: stores the index to know which vehicle to update later
    vehiculoEditable = indice

    // textContent: changes the button text from Save to Update
    document.getElementById("btnGuardar").textContent = "Actualizar"
    
    // showToast: displays a temporary message indicating that editing is in progress
    mostrarToast("Editando vehiculos...")
}



// FUNCTION: DELETE VEHICLE
// eliminarVehiculo: removes a vehicle after user confirmation
// receives: index of the vehicle's position to delete
function eliminarVehiculo(indice) {
    // ambulancia: gets the vehicle at that position to display its plate
    const ambulancia = vehiculos[indice]
    
    // confirm: Displays a confirmation dialog; if canceled, the block is not executed
    if (confirm(`¿Eliminar vehículo con placa "${ambulancia.placa}"?`)) {
        // splice: removes 1 element from the array starting at position index
        vehiculos.splice(indice, 1)

        // actualizarTabla: redraws the table without the deleted vehicle
        actualizarTabla()

        // mostrarToast: displays a success message with emoji
        mostrarToast("Vehículo eliminado ✅")
    }
}


// FUNCTION: SHOW NOTIFICATION
// mostrarToast: shows a temporary message that disappears after 3 seconds
// receives: message text to display to the user
function mostrarToast(mensaje) {
    // toast: retrieves the DOM element that contains the notifications
    const toast = document.getElementById("toast")

    // if: checks that the toast element exists before modifying it
    if (toast) {
        // textContent: assigns the message to the toast element
        toast.textContent = mensaje

        // classList.add: adds CSS class show that makes the toast visible
        toast.classList.add("show")

        // removeAttribute: removes hidden attribute to make it visible
        toast.removeAttribute("hidden")

        // setTimeout: executes anonymous function after 3000 milliseconds
        setTimeout(() => {
            // classList.remove: removes class show to hide the toast
            toast.classList.remove("show")

            // setAttribute: adds hidden attribute to completely hide it
            toast.setAttribute("hidden", "")
        }, 3000)
    }
}



// FUNCTION: VALIDATE FORM
// validarFormulario: verifies that all inputs meet validations, returns true or false
function validarFormulario() {
    // toUpperCase: converts plate to uppercase for uniformity
    const placa = document.getElementById("placa").value.toUpperCase();

    // trim: removes whitespace from the beginning and end of each field
    const modelo = document.getElementById("modelo").value.trim();
    const snMotor = document.getElementById("snmotor").value.trim();
    const snChasis = document.getElementById("snchasis").value.trim();
    const numeroSoat = document.getElementById("numeroSOAT").value.trim();
    const fechaVencimientoSoat = document.getElementById("fechaVencimientoSOAT").value;
    const tarjetaPropiedad = document.getElementById("tarjetaPropiedad").value.trim();
    const capacidadPacientes = document.getElementById("capacidadPacientes").value.trim();
    const numeroInterno = document.getElementById("numeroInterno").value.trim();
    const idGPS = document.getElementById("idGPS").value.trim();

    // errors: array that stores error messages found
    let errores = [];

    // regexPlaca.test: checks if plate matches ABC123 pattern
    if (!regexPlaca.test(placa)) {
        errores.push("La placa debe tener formato ABC123 (3 letras mayúsculas + 3 números)");
        document.getElementById("errorPlaca").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorPlaca").textContent = "";
    }

    // modelo.length: Check that the model has at least 3 characters
    if (modelo.length < 3) {
        errores.push("El modelo debe tener al menos 3 caracteres");
        document.getElementById("errorModelo").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorModelo").textContent = "";
    }

    // snMotor.length: Check that snMotor has at least 3 characters
    if (snMotor.length < 3) {
        errores.push("El snMotor debe tener al menos 3 caracteres");
        document.getElementById("errorSnMotor").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorSnMotor").textContent = "";
    }

    // snChasis.length: Check that snChasis has at least 3 characters
    if (snChasis.length < 3) {
        errores.push("El snChasis debe tener al menos 3 caracteres");
        document.getElementById("errorSnChasis").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorSnChasis").textContent = "";
    }

    // regexNumeroSoat.test: verifies alphanumeric minimum 8 characters
    if (!regexNumeroSoat.test(numeroSoat)) {
        errores.push("El número SOAT debe tener al menos 8 caracteres alfanuméricos");
        document.getElementById("errorNumeroSOAT").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorNumeroSOAT").textContent = "";
    }

    // new Date: verifies that the date is future not past
    if (!fechaVencimientoSoat || new Date(fechaVencimientoSoat) < new Date()) {
        errores.push("La fecha de vencimiento debe ser futura");
        document.getElementById("errorFechaVencimientoSOAT").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorFechaVencimientoSOAT").textContent = "";
    }

    // tarjetaPropiedad.length: verifies minimum 3 characters
    if (tarjetaPropiedad.length < 3) {
        errores.push("La tarjeta de propiedad debe tener al menos 3 caracteres");
        document.getElementById("errorTarjetaPropiedad").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorTarjetaPropiedad").textContent = "";
    }

    // regexCapacidad.test: verifies only numbers, parseInt: converts to integer
    if (!regexCapacidad.test(capacidadPacientes) || parseInt(capacidadPacientes) < 1) {
        errores.push("La capacidad debe ser un número mayor a 0");
        document.getElementById("errorCapacidadPacientes").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorCapacidadPacientes").textContent = "";
    }

    // numeroInterno.length: verifies minimum 3 characters
    if (numeroInterno.length < 3) {
        errores.push("El número interno debe tener al menos 3 caracteres");
        document.getElementById("errorNumeroInterno").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorNumeroInterno").textContent = "";
    }

    // regexIdGPS.test: verifies alphanumeric minimum 3 characters      
    if (!regexIdGPS.test(idGPS)) {
        errores.push("El ID GPS debe tener al menos 3 caracteres alfanuméricos");
        document.getElementById("errorIdGPS").textContent = errores[errores.length - 1];
    } else {
        document.getElementById("errorIdGPS").textContent = "";
    }

    // retorna: true if there are no errors, false if there is at least one
    return errores.length === 0;
}



// FUNCTION: SHOW VEHICLES VIEW
// This function initializes the entire view: loads the HTML, sets up events, and displays the data
function mostrarVehiculos() {
    // Inject the template HTML into the main container
    main.innerHTML = vistaVehiculos

    activarEventosTabla();
    
    // I get references to the form and the table after injecting the HTML
    const formVehiculos = document.getElementById("formVehiculos")
    const tablaAmbulancias = document.getElementById("tablaAmbulancias")

    // I set up the event when submitting the form (when clicking Save)
    formVehiculos.addEventListener("submit", function(event) {
        // I prevent the default behavior (page reload)
        event.preventDefault()

        // I validate that all data is correct before saving
        // validarFormulario() returns true if there are no errors, false if there are errors
        if (!validarFormulario()) { 
            console.log("Formulario contiene errores");

            // I show a toast with a warning message to the user
            mostrarToast("⚠️ Corrige los errores antes de guardar");

            // return; stops the execution of the function
            // Does not continue with the rest of the code
            return;
        }

        // If we are editing an existing vehicle
        // vehiculoEditable !== null means the value is not null (it's different from null)
        // If vehiculoEditable has an index (0, 1, 2...), we are editing
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
            // Else = if the previous condition (vehiculoEditable !== null) is false
            // We reach here when vehiculoEditable === null (that is, we are NOT editing)
            // This means we are going to CREATE a new vehicle

            // I calculate the next ID automatically (the current max + 1)
            // vehiculos.length > 0 checks if there are vehicles in the array
            const maxId = vehiculos.length > 0
                ? Math.max(...vehiculos.map(v => v.idVehiculo))
                : 0  // If there are no vehicles, I start with ID = 0

            // I create an object with the data of the new vehicle
            // {} creates an empty object, I add properties inside
            const nuevaAmbulancia = {
                // VehicleID will be the maximum ID + 1 (auto-increment)
                idVehiculo: maxId + 1,  // Auto-incrementing ID

                // toUpperCase() converts to uppercase (ABC123)
                placa: document.getElementById("placa").value.toUpperCase(),  // License plate in uppercase

                // trim() removes spaces from the beginning and end
                modelo: document.getElementById("modelo").value.trim(),  // Model without spaces
                snMotor: document.getElementById("snmotor").value.trim(), // Engine serial without spaces
                snChasis: document.getElementById("snchasis").value.trim(), // Chassis serial without spaces
                numeroSoat: document.getElementById("numeroSOAT").value.trim(), // SOAT without spaces

                // The date is saved as it comes from the input type="date"
                fechaVencimientoSoat: document.getElementById("fechaVencimientoSOAT").value,  // Date without changes

                tarjetaPropiedad: document.getElementById("tarjetaPropiedad").value.trim(), // Card without spaces

                // parseInt() converts the text to an integer
                // "5" -> 5 (string to number)
                capacidadPacientes: parseInt(document.getElementById("capacidadPacientes").value),  // Capacity as a number

                numeroInterno: document.getElementById("numeroInterno").value.trim(), // Internal number without spaces
                idGPS: document.getElementById("idGPS").value.trim() // GPS ID without spaces
            }

            // push() adds an element to the end of the array
            // vehicles.push(newAmbulance) adds the new object to the array
            vehiculos.push(nuevaAmbulancia) // Add the new ambulance to the array

            // Show a success toast to the user
            mostrarToast("Vehiculo registrado correctamente ✅")
        }
        
        // Clear the form (erase all fields)
        // .reset() is a special method of forms that clears all its inputs
        // All fields will be empty after saving
        formVehiculos.reset() 
        
        // Update the table to reflect the change
        // If a new vehicle was created, it will appear in the table
        // If a vehicle was edited, the table will show the updated data
        actualizarTabla() 
        
        // Restore the button to its initial state
        // If we were editing, the button read "Actualizar"
        // Now change it back to "Guardar" for new records
        document.getElementById("btnGuardar").textContent = "Guardar" 
    })

    // Update the table initially to show existing vehicles
    actualizarTabla()
}



// loadVehicles: function to load the vehicle view
export function cargarVehiculos() {
    mostrarVehiculos()
};
