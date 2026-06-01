/**
 * RESPONSIBILITY
 * This module centralizes all file management operations for the application.
 * It is responsible for opening and saving custom ".bd" files that store
 * application data in JSON format.
 *
 * PURPOSE:
 * Instead of using a traditional database server, this project uses local
 * files as a persistence mechanism. The File System Access API allows the
 * user to select, read, and update files directly from the browser.
 *
 * MAIN FUNCTIONS:
 * - Open a .bd file selected by the user.
 * - Read and parse its JSON content.
 * - Return the file handle for future updates.
 * - Save modified data back into the same file.
 *
 * TECHNOLOGIES USED:
 * - File System Access API
 * - JSON serialization/deserialization
 * - Async/Await for asynchronous file operations
 *
 * FILE FORMAT:
 * All .bd files contain JSON arrays representing application entities
 * such as clients, payments, transfers, and other business records.
 */


// Open .bd file
export async function abrirArchivoBD() {

    //Check browser support
    if (!window.showOpenFilePicker) {
        throw new Error("Tu navegador no soporta File System Access API");
    }

    //Open file selector
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

    //get the actual file
    const file = await handle.getFile();

    //Read content
    const contenido = await file.text();

    //Convert JSON to an array
    const datos = JSON.parse(contenido);

    return {
        handle,
        datos
    };
}


// Save .bd file
export async function guardarArchivoBD(handle,datos) {
    
    if (!handle) {
        throw new Error("No hay archivo abierto");
    }

    // Open for writing
    const writable = await handle.createWritable();

    // Convert array to JSON 
    await writable.write(JSON.stringify(datos, null, 2));

    // Close for writing
    await writable.close();
}