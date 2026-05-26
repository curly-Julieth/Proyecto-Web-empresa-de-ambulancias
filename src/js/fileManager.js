// Manejador de archivos .bd

// Abrir archivo .bd
export async function abrirArchivoBD() {

    //veriicar soporte del navegador
    if (!window.showOpenFilePicker) {
        throw new Error("Tu navegador no soporta File System Access API");
    }

    //abrir selector de archivos
    const [handle] = await window.showOpenFilePicker({
        types: [
            {
                description: "Archivos BD",
                accept: {
                    "application/json": [".bd"]
                }
            }
        ],
        multiple: false
    });

    //obtener archivo real
    const file = await handle.getFile();

    //Leer contenido
    const contenido = await file.text();

    //convertir JSON a array
    const datos = JSON.parse(contenido);

    return {
        handle,
        datos
    };
}


// Guardar archivo .bd
export async function guardarArchivoBD(handle,datos) {
    
    if (!handle) {
        throw new Error("No hay archivo abierto");
    }

    // Abrir escritura
    const writable = await handle.createWritable();

    // Convertir array a JSON 
    await writable.write(JSON.stringify(datos, null, 2));

    // Cerrar escritura
    await writable.close();
}