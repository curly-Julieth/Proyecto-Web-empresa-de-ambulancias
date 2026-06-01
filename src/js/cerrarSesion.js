/*
 * FILE: cerrarSesion.js
 *
 * RESPONSIBILITY:
 * - Manage the logout process of the application.
 * - Ask the user for confirmation before closing the session.
 * - Save all modified data into the corresponding .bd files.
 * - Ensure clients, transfers, and payments are stored
 *   before leaving the system.
 * - Reload the application after a successful logout.
 *
 * DEPENDENCIES:
 * - env.js:
 *   clientes, traslados, recibosCaja, archivosBD.
 *
 * - fileManager.js:
 *   guardarArchivoBD().
 *
 * NOTES:
 * - Data is only saved if a valid file handle exists.
 * - The user must confirm the logout action.
 * - If an error occurs during the save process, an
 *   error message is displayed and the session remains active.
 */


import {
  clientes,
  traslados,
  recibosCaja,
  archivosBD
} from "./env.js";

import {
  guardarArchivoBD
} from "./fileManager.js";



export async function cerrarSesion() {

  const confirmar = confirm(
    "¿Desea guardar cambios y cerrar sesión?"
  );

  if (!confirmar) return;

  try {

    // Save customers data
    if (archivosBD.clientesHandle) {

      await guardarArchivoBD(
        archivosBD.clientesHandle,
        clientes
      );

    }

    // Save transfers data
    if (archivosBD.trasladosHandle) {

      await guardarArchivoBD(
        archivosBD.trasladosHandle,
        traslados
      );

    }

    // Save payments data
    if (archivosBD.pagosHandle) {

      await guardarArchivoBD(
        archivosBD.pagosHandle,
        recibosCaja
      );

    }

    alert(
      "Archivos guardados correctamente."
    );

    location.reload();

  } catch(error) {

    console.error(error);

    alert(
      "Ocurrió un error al guardar."
    );

  }

}
