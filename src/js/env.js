/*
  ARCHIVO TIPO .ENV (ENTORNO DE LA APLICACIÓN)

  Propósito:
  - Centralizar la declaración e inicialización de variables, constantes y arrays globales del proyecto.
  - Mantener el proyecto simple, legible y mantenible para estudiantes.

  Reglas de este archivo:
  - NO contiene funciones (estricto).
  - Define únicamente datos globales (arrays/variables/constantes) que serán usados por el resto del sistema.
  - El resto del código NO debe redeclarar estos identificadores globales.
*/

/* Versión de la aplicación (requisito: 1.1 Crear Clientes) */
export const appVersion = "1.1";

/* Array Departamentos: debe contener el registro 66 Risaralda */
export const departamentos = [{ idDepartamento: 66, nombre: "Risaralda" }];

// Array municipios

export const municipios = [
  { idMunicipio: 66001, nombre: "Pereira", idDepartamento: 66 },
  { idMunicipio: 66045, nombre: "Apía", idDepartamento: 66 },
  { idMunicipio: 66075, nombre: "Balboa", idDepartamento: 66 },
  { idMunicipio: 66088, nombre: "Belén de Umbría", idDepartamento: 66 },
  { idMunicipio: 66170, nombre: "Dosquebradas", idDepartamento: 66 },
  { idMunicipio: 66318, nombre: "Guática", idDepartamento: 66 },
  { idMunicipio: 66383, nombre: "La Celia", idDepartamento: 66 },
  { idMunicipio: 66400, nombre: "La Virginia", idDepartamento: 66 },
  { idMunicipio: 66440, nombre: "Marsella", idDepartamento: 66 },
  { idMunicipio: 66456, nombre: "Mistrató", idDepartamento: 66 },
  { idMunicipio: 66572, nombre: "Pueblo Rico", idDepartamento: 66 },
  { idMunicipio: 66594, nombre: "Quinchía", idDepartamento: 66 },
  { idMunicipio: 66682, nombre: "Santa Rosa de Cabal", idDepartamento: 66 },
  { idMunicipio: 66687, nombre: "Santuario", idDepartamento: 66 },
];

// Array barrios 

export const barrios = [
  { idBarrio: 1, nombre: "Belalcázar", idMunicipio: 66001 },
  { idBarrio: 2, nombre: "Bosques de la Salle", idMunicipio: 66001 },
  { idBarrio: 3, nombre: "Boston", idMunicipio: 66001 },
  { idBarrio: 4, nombre: "Caminos de Canaán", idMunicipio: 66001 },
  { idBarrio: 5, nombre: "Centenario", idMunicipio: 66001 },
  { idBarrio: 6, nombre: "Central", idMunicipio: 66001 },
  { idBarrio: 7, nombre: "Ciudad Palermo", idMunicipio: 66001 },
  { idBarrio: 8, nombre: "Ciudad Pereira", idMunicipio: 66001 },
  { idBarrio: 9, nombre: "El Vergel", idMunicipio: 66001 },
  { idBarrio: 10, nombre: "Gaviotas", idMunicipio: 66001 },
  { idBarrio: 11, nombre: "Guaduales de Canaán", idMunicipio: 66001 },
  { idBarrio: 12, nombre: "La Arboleda", idMunicipio: 66001 },
  { idBarrio: 13, nombre: "La Florida", idMunicipio: 66001 },
  { idBarrio: 14, nombre: "La Laguna", idMunicipio: 66001 },
  { idBarrio: 15, nombre: "La Lorena I", idMunicipio: 66001 },
  { idBarrio: 16, nombre: "La Lorena II", idMunicipio: 66001 },
  { idBarrio: 17, nombre: "La Lorena III", idMunicipio: 66001 },
  { idBarrio: 18, nombre: "La Lorena IV", idMunicipio: 66001 },
  { idBarrio: 19, nombre: "La Platanera", idMunicipio: 66001 },
  { idBarrio: 20, nombre: "La Unidad", idMunicipio: 66001 },
  { idBarrio: 21, nombre: "Los Almendros", idMunicipio: 66001 },
  { idBarrio: 22, nombre: "Los Profesionales", idMunicipio: 66001 },
  { idBarrio: 23, nombre: "Mejía Robledo", idMunicipio: 66001 },
  { idBarrio: 24, nombre: "Olaya Herrera", idMunicipio: 66001 },
  { idBarrio: 25, nombre: "Providencia", idMunicipio: 66001 },
  { idBarrio: 26, nombre: "San Luis Gonzaga", idMunicipio: 66001 },
  { idBarrio: 27, nombre: "San Remo", idMunicipio: 66001 },
  { idBarrio: 28, nombre: "Terminal", idMunicipio: 66001 },
  { idBarrio: 29, nombre: "Tulcán I", idMunicipio: 66001 },
  { idBarrio: 30, nombre: "Tulcán II", idMunicipio: 66001 },
];

/*
  Array Cliente (tabla transaccional):
  - Se llena al crear clientes.
  - idCliente es consecutivo automático (se calcula en el guardado).
*/
export const clientes = [
  {
    idCliente: 1,
    identificacion: "1000000001",
    nombres: "Ana María Pérez",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 1,
    direccion: "Calle 10 # 12-34 Apto 202",
    whatsapp: "3001234567",
    telefono: "6041234",
    email: "ana.perez@correo.com",
  },
  {
    idCliente: 2,
    identificacion: "1000000002",
    nombres: "Juan David Gómez",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 2,
    direccion: "Carrera 7 # 20-15",
    whatsapp: "3012345678",
    telefono: null,
    email: "juan.gomez@correo.com",
  },
  {
    idCliente: 3,
    identificacion: "1000000003",
    nombres: "Luisa Fernanda Rodríguez",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 3,
    direccion: "Avenida 30 # 5-10",
    whatsapp: "3023456789",
    telefono: "6078901",
    email: "luisa.rodriguez@correo.com",
  },
  {
    idCliente: 4,
    identificacion: "1000000004",
    nombres: "Carlos Andrés Martínez",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 4,
    direccion: "Calle 22 # 8-45",
    whatsapp: "3034567890",
    telefono: null,
    email: "carlos.martinez@correo.com",
  },
  {
    idCliente: 5,
    identificacion: "1000000005",
    nombres: "Sofía Alejandra López",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 5,
    direccion: "Diagonal 15 # 9-30",
    whatsapp: "3045678901",
    telefono: "6034567",
    email: "sofia.lopez@correo.com",
  },
  {
    idCliente: 6,
    identificacion: "1000000006",
    nombres: "Miguel Ángel Torres",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 6,
    direccion: "Calle 5 # 3-12",
    whatsapp: "3056789012",
    telefono: null,
    email: "miguel.torres@correo.com",
  },
  {
    idCliente: 7,
    identificacion: "1000000007",
    nombres: "Valentina Ramírez",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 7,
    direccion: "Carrera 12 # 14-08",
    whatsapp: "3067890123",
    telefono: "6054321",
    email: "valentina.ramirez@correo.com",
  },
  {
    idCliente: 8,
    identificacion: "1000000008",
    nombres: "Sebastián Herrera",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 8,
    direccion: "Transversal 9 # 18-20",
    whatsapp: "3078901234",
    telefono: null,
    email: "sebastian.herrera@correo.com",
  },
  {
    idCliente: 9,
    identificacion: "1000000009",
    nombres: "Camila Sánchez",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 9,
    direccion: "Calle 18 # 6-50",
    whatsapp: "3089012345",
    telefono: "6067890",
    email: "camila.sanchez@correo.com",
  },
  {
    idCliente: 10,
    identificacion: "1000000010",
    nombres: "Diego Nicolás Vargas",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 10,
    direccion: "Carrera 3 # 11-25",
    whatsapp: "3090123456",
    telefono: null,
    email: "diego.vargas@correo.com",
  },
];

// Array vehículos

export let vehiculos = [{
    idVehiculo: 1,
    placa: "ABC123",
    modelo: "Toyota 2020",
    snMotor: "MTR123",
    snChasis: "CHS123",
    numeroSoat: "SOAT123",
    fechaVencimientoSoat: "2026-12-31",
    tarjetaPropiedad: "TP123",
    capacidadPacientes: 2,
    numeroInterno: "AMB-01",
    idGPS: "GPS001" 
    },
    {
    idVehiculo: 2,
    placa: "ABC234",
    modelo: "Toyota 2020",
    snMotor: "MTR128",
    snChasis: "CHS234",
    numeroSoat: "SOAT234",
    fechaVencimientoSoat: "2027-01-01",
    tarjetaPropiedad: "TP234",
    capacidadPacientes: 2,
    numeroInterno: "AMB-02",
    idGPS: "GPS002"
    },
    {
    idVehiculo: 3,
    placa: "ABC345",
    modelo: "Toyota 2022",
    snMotor: "MTR135",
    snChasis: "CHS345",
    numeroSoat: "SOAT345",
    fechaVencimientoSoat: "2027-02-15",
    tarjetaPropiedad: "TP345",
    capacidadPacientes: 3,
    numeroInterno: "AMB-03",
    idGPS: "GPS003"
    },
    {
    idVehiculo: 4,
    placa: "ABC456",
    modelo: "Toyota 2025",
    snMotor: "MTR140",
    snChasis: "CHS456",
    numeroSoat: "SOAT456",
    fechaVencimientoSoat: "2027-04-10",
    tarjetaPropiedad: "TP456",
    capacidadPacientes: 3,
    numeroInterno: "AMB-04",
    idGPS: "GPS004"
    },
    {
    idVehiculo: 5,
    placa: "ABC567",
    modelo: "Toyota 2027",
    snMotor: "MTR200",
    snChasis: "CHS567",
    numeroSoat: "SOAT567",
    fechaVencimientoSoat: "2028-05-15",
    tarjetaPropiedad: "TP567",
    capacidadPacientes: 3,
    numeroInterno: "AMB-05",
    idGPS: "GPS005"
    }
];

export let conductores = [{
    idConductor: 1,
    cedula: "123456789",
    nombre: "Carlos Pérez",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 1,
    direccion: "Calle 1",
    whatsapp: "3124582083",
    telefono: "1234567",
    email: "carlos@mail.com",
    numeroLicenciaConduccion: "LIC123"
    },
    {
    idConductor: 2,
    cedula: "122894490",
    nombre: "David Hernandez",
    idDepartamento: 66,
    idMunicipio: 66088,
    idBarrio: 24,
    direccion: "Calle 15",
    whatsapp: "315728530",
    telefono: "1324764",
    email: "dav.he@mail.com",
    numeroLicenciaConduccion: "LIC167"
    },
    {
    idConductor: 3,
    cedula: "178352683",
    nombre: "Mario Rojas",
    idDepartamento: 66,
    idMunicipio: 66170,
    idBarrio: 3,
    direccion: "Calle 19 Mz 8",
    whatsapp: "322639526",
    telefono: "1324861",
    email: "mario.rojas@mail.com",
    numeroLicenciaConduccion: "LIC156"
    },
    {
    idConductor: 4,
    cedula: "167293629",
    nombre: "Andrea Cruz",
    idDepartamento: 66,
    idMunicipio: 66001,
    idBarrio: 4,
    direccion: "Caminos de Canaán casa 134",
    whatsapp: "312369027",
    telefono: "1298354",
    email: "cruz.andi@mail.com",
    numeroLicenciaConduccion: "LIC190"
    },
    {
    idConductor: 5,
    cedula: "123953840",
    nombre: "José Mejía",
    idDepartamento: 66,
    idMunicipio: 66400,
    idBarrio: 20,
    direccion: "Calle 22",
    whatsapp: "314297763",
    telefono: "1327093",
    email: "josemej@mail.com",
    numeroLicenciaConduccion: "LIC100"
    }
];

// Arrays contratos

export let contratos = [
  {
    idContrato: 1,
    numeroContrato: "CONT-001",
    idCliente: 1,
    mensualidad: 50000,
    observaciones: "Contrato básico"
  },
  {
    idContrato: 2,
    numeroContrato: "CONT-002",
    idCliente: 2,
    mensualidad: 100000,
    observaciones: "Contrato de Traslado de pacientes"
  },
  {
    idContrato: 3,
    numeroContrato: "CONT-003",
    idCliente: 3,
    mensualidad: 50000,
    observaciones: "Contrato básico" 
  },
  {
    idContrato: 4,
    numeroContrato: "CONT-004",
    idCliente: 4,
    mensualidad: 50000,
    observaciones: "Contrato básico"
  },
  {
    idContrato: 5,
    numeroContrato: "CONT-005",
    idCliente: 5,
    mensualidad: 500000,
    observaciones: "Contrato de Ambulancia en sitio (Cobertura de eventos)"
  },
  {
    idContrato: 6,
    numeroContrato: "CONT-006",
    idCliente: 6,
    mensualidad: 50000,
    observaciones: "Contrato básico"
  },
  {
    idContrato: 7,
    numeroContrato: "CONT-007",
    idCliente: 7,
    mensualidad: 100000,
    observaciones: "Contrato de Traslado de pacientes"
  },
  {
    idContrato: 8,
    numeroContrato: "CONT-008",
    idCliente: 8,
    mensualidad: 2000000,
    observaciones: "Contrato de Prestación de Servicios de Ambulancia (Medicina Prepagada/Empresarial)"
  },
  {
    idContrato: 9,
    numeroContrato: "CONT-009",
    idCliente: 9,
    mensualidad: 500000,
    observaciones: "Contrato de Ambulancia en sitio (Cobertura de eventos)"
  },
  {
    idContrato: 10,
    numeroContrato: "CONT-010",
    idCliente: 10,
    mensualidad: 50000,
    observaciones: "Contrato básico"
  }

];

// Array parentesco

export const parentescos = [
  { idParentesco: 1, codigo: "HI", nombre: "Hijo" },
  { idParentesco: 2, codigo: "ES", nombre: "Esposo/a" },
  { idParentesco: 3, codigo: "PA", nombre: "Padre/Madre" },
  { idParentesco: 4, codigo: "HE", nombre: "Hermano/a" }
];

// Array beneficiarios

export let beneficiarios = [
    {
    idBeneficiario: 1,
    idContrato: 1,
    cedula: "2000000001",
    nombre: "Luis Pérez",
    fechaNacimiento: "2010-05-10",
    whatsapp: "3101111111",
    idParentesco: 1
    },
    {
    idBeneficiario: 2,
    idContrato: 1,
    cedula: "2000000002",
    nombre: "Pedro Pérez",
    fechaNacimiento: "1980-03-20",
    whatsapp: "3102222222",
    idParentesco: 2
  },
  {
    idBeneficiario: 3,
    idContrato: 2,
    cedula: "2000000003",
    nombre: "María Gómez",
    fechaNacimiento: "1995-07-15",
    whatsapp: "3111111111",
    idParentesco: 2
  },
  {
    idBeneficiario: 4,
    idContrato: 3,
    cedula: "2000000004",
    nombre: "Sofía Rodríguez",
    fechaNacimiento: "2012-09-01",
    whatsapp: "3121111111",
    idParentesco: 1
  },
  {
    idBeneficiario: 5,
    idContrato: 4,
    cedula: "2000000005",
    nombre: "Laura Martínez",
    fechaNacimiento: "1985-11-11",
    whatsapp: "3131111111",
    idParentesco: 2
  },
  {
    idBeneficiario: 6,
    idContrato: 4,
    cedula: "2000000006",
    nombre: "José Martínez",
    fechaNacimiento: "1960-01-01",
    whatsapp: "3132222222",
    idParentesco: 3
  },
  {
    idBeneficiario: 7,
    idContrato: 5,
    cedula: "2000000007",
    nombre: "Equipo Evento López",
    fechaNacimiento: "2000-01-01",
    whatsapp: "3141111111",
    idParentesco: 4
  },
  {
    idBeneficiario: 8,
    idContrato: 6,
    cedula: "2000000008",
    nombre: "Ana Torres",
    fechaNacimiento: "1990-02-02",
    whatsapp: "3151111111",
    idParentesco: 2
  },
  {
    idBeneficiario: 9,
    idContrato: 7,
    cedula: "2000000009",
    nombre: "Camilo Ramírez",
    fechaNacimiento: "2015-06-06",
    whatsapp: "3161111111",
    idParentesco: 1
  },
  {
    idBeneficiario: 10,
    idContrato: 8,
    cedula: "2000000010",
    nombre: "Empleado 1 Empresa Herrera",
    fechaNacimiento: "1998-04-04",
    whatsapp: "3171111111",
    idParentesco: 4
  },
  {
    idBeneficiario: 11,
    idContrato: 8,
    cedula: "2000000011",
    nombre: "Empleado 2 Empresa Herrera",
    fechaNacimiento: "1997-08-08",
    whatsapp: "3172222222",
    idParentesco: 4
  },
  {
    idBeneficiario: 12,
    idContrato: 9,
    cedula: "2000000012",
    nombre: "Staff Evento Sánchez",
    fechaNacimiento: "2000-01-01",
    whatsapp: "3181111111",
    idParentesco: 4
  },

  {
    idBeneficiario: 13,
    idContrato: 10,
    cedula: "2000000013",
    nombre: "Familiar Vargas",
    fechaNacimiento: "1992-12-12",
    whatsapp: "3191111111",
    idParentesco: 2
  }
];

// Formas de pago

export const formasPago = [
  { idFormaPago: 1, codigo: "EF", nombre: "Efectivo" },
  { idFormaPago: 2, codigo: "DA", nombre: "Datafono" },
  { idFormaPago: 3, codigo: "TR", nombre: "Transferencia" }
];

// Bancos

export const bancos = [
  { idBanco: 1, nombre: "Bancolombia" },
  { idBanco: 2, nombre: "Davivienda" },
  { idBanco: 3, nombre: "BBVA" },
  { idBanco: 4, nombre: "Banco de Bogotá" }
];

// Recibos de caja

export let recibosCaja = [
  {
    idReciboCaja: 1,
    consecutivo: "RC-001",
    fecha: "2026-04-20",
    idCliente: 1,
    valorPagado: 50000,
    concepto: "Mensualidad contrato",
    idFormaPago: 1,
    idBanco: null
  },
  {
    idReciboCaja: 2,
    consecutivo: "RC-002",
    fecha: "2026-04-21",
    idCliente: 2,
    valorPagado: 100000,
    concepto: "Servicio traslado",
    idFormaPago: 2,
    idBanco: null
  },
  {
    idReciboCaja: 3,
    consecutivo: "RC-003",
    fecha: "2026-04-22",
    idCliente: 3,
    valorPagado: 50000,
    concepto: "Mensualidad contrato",
    idFormaPago: 3,
    idBanco: 1
  },
  {
    idReciboCaja: 4,
    consecutivo: "RC-004",
    fecha: "2026-04-22",
    idCliente: 5,
    valorPagado: 500000,
    concepto: "Cobertura evento",
    idFormaPago: 3,
    idBanco: 2
  }
];

// Traslados

export let traslados = [];


/*
  Variables globales de selección (listas dependientes)
  - Se actualizan al seleccionar en los <select>.
*/
let selectedDepartamentoId = null;
let selectedMunicipioId = null;
let selectedBarrioId = null;

/*
  Configuración global de UI
*/
const uiToastDurationMs = 5000;
let toastTimeoutId = null;

/*
  Estado global de UI
  - Se declara aquí para que exista un único punto de verdad y no se redeclare en otros archivos.
  - Se inicializa en null y se asigna desde librerias.js al arrancar.
*/
let appUiContext = null;
let createClientUiContext = null;
let listClientsUiContext = null;

/*
  URLs de objeto (Object URL) para vistas previas de imágenes.
  - Se almacenan para poder revocarlas y evitar fugas de memoria.
*/
let corporateLogoObjectUrl = null;
let userAvatarObjectUrl = null;

/*
  Bandera de interacción del formulario Crear Cliente
  - Permite mostrar errores solo después del primer intento de guardado o cuando el usuario ya escribió.
*/
let createClientHasAttemptedSubmit = false;
let createClientIdentificacionDuplicated = false;

/*
  Expresiones regulares globales (validaciones de entradas)
  - Se mantienen simples para evitar ReDoS (Regular Expression Denial of Service).
*/
const regexIdentificacion = /^[0-9]{5,15}$/;
const regexNombres = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]{3,80}$/;
const regexDireccion = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 #\-.,]{5,120}$/;
const regexTelefono = /^[0-9]{7}$/;
const regexWhatsapp = /^[0-9]{10}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
