/*
chatIA.js

This module provides the Artificial Intelligence assistant interface for the ambulance management system.

It is responsible for rendering the chat view, handling user interactions, sending questions to an external AI service through a webhook, and displaying responses inside the application.

Main responsibilities:
- Render the AI assistant interface dynamically.
- Capture user questions from the input field.
- Send requests to an external n8n webhook using the Fetch API.
- Display user and AI messages in the conversation area.
- Handle connection errors and notify the user when communication fails.
- Manage chat event listeners and message rendering.

The module allows users to interact with an AI-powered assistant directly from the application without leaving the system.
*/

const vistaChatIA = `
<section id="chatIA">

  <h2>🤖 Asistente IA</h2>

  <div id="mensajes"></div>

  <div class="chatControles">

    <input
      type="text"
      id="inputMensaje"
      placeholder="Escribe tu pregunta"
    >

    <button id="btnEnviar" class=>
      Enviar
    </button>

  </div>

</section>
`;


/**
 * Loads the AI Assistant view into the main application container.
 *
 * This function renders the chat interface and initializes
 * all required event listeners for user interaction.
 *
 * @function cargarChatIA
 * @returns {void}
 */


export function cargarChatIA() {
  const main = document.getElementById("main");

  main.innerHTML = vistaChatIA;

  activarChat();
}


// Activar eventos
function activarChat() {

  const btnEnviar =
    document.getElementById("btnEnviar");

  btnEnviar.addEventListener("click", enviarMensaje);

}


/**
 * Sends the user's message to the AI webhook and displays the response.
 *
 * The function:
 * - Reads the user's question from the input field.
 * - Displays the message in the chat window.
 * - Sends a POST request to the configured webhook.
 * - Receives and displays the AI response.
 * - Handles connection or request errors.
 *
 * @async
 * @function enviarMensaje
 * @returns {Promise<void>}
 */

  async function enviarMensaje() {

  const input =
    document.getElementById("inputMensaje");

  const mensajes =
    document.getElementById("mensajes");

  const pregunta = input.value.trim();

  if (!pregunta) return;

  mensajes.innerHTML += `
  <div class="mensajeUsuario">
    ${pregunta}
  </div>
  `;

  input.value = "";

  try {

    const respuesta = await fetch(
      "https://scarlethjulieth.app.n8n.cloud/webhook/chat-empresa",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mensaje: pregunta
        })
      }
    );

    const datos =
      await respuesta.json();

    mensajes.innerHTML += `
      <p><strong>IA:</strong> ${datos[0].output}</p>
    `;

  } catch(error) {

    mensajes.innerHTML += `
      <p><strong>IA:</strong>
      Error de conexión</p>
    `;

    console.error(error);
  }
}


// Mostrar mensajes
function agregarMensaje(usuario, texto) {

  const mensajes =
    document.getElementById("mensajes");

  const div =
    document.createElement("div");

  div.innerHTML = `
    <strong>${usuario}:</strong>
    ${texto}
  `;

  mensajes.appendChild(div);

}
