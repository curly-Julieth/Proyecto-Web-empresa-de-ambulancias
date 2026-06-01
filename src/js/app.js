/*
 * FILE: app.js
 *
 * RESPONSIBILITY:
 * - Serve as the application's entry point.
 * - Load the default view when the system starts.
 * - Initialize the Summary module so users can see
 *   general system statistics immediately after opening
 *   the application.
 *
 * DEPENDENCIES:
 * - resumen.js:
 *   cargarResumen().
 *
 * NOTES:
 * - This file is executed when the application is loaded.
 * - The Summary view is displayed by default.
 */

import { cargarResumen } from "./resumen.js"; 

// Load the Summary view by default when the application starts
cargarResumen();

