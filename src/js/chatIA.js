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


// Enviar mensaje al webhook
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
