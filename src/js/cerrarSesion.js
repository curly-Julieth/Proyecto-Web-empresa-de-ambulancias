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

    // Clientes
    if (archivosBD.clientesHandle) {

      await guardarArchivoBD(
        archivosBD.clientesHandle,
        clientes
      );

    }

    // Traslados
    if (archivosBD.trasladosHandle) {

      await guardarArchivoBD(
        archivosBD.trasladosHandle,
        traslados
      );

    }

    // Pagos
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
