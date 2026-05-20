// ui.js - Utilidades para UI (Toast y Modal)

// export function mostrarToast(mensaje, tipo = 'success') {
//   const toast = document.getElementById('toast');
//   toast.textContent = mensaje;
//   toast.className = `toast ${tipo}`; // success, error, warning
  
//   toast.classList.add('show');
  
//   setTimeout(() => {
//     toast.classList.remove('show');
//   }, 4000);
// }

// export function mostrarModalLogout() {
//   const modal = document.getElementById('logoutModal');
  
//   modal.innerHTML = `
//     <div class="modalContent">
//       <div class="modalHeader">
//         <h2 class="modalTitle">🚪 Cerrar Sesión</h2>
//         <button class="btnClose" id="btnCerrarModal">&times;</button>
//       </div>
      
//       <div class="modalBody">
//         <p>¿Estás seguro de que deseas cerrar sesión?</p>
//         <p><strong>Se cerrará tu sesión actual.</strong></p>
//       </div>
      
//       <div class="modalFooter">
//         <button class="btn btn-secondary" id="btnCancelar">Cancelar</button>
//         <button class="btn btn-primary" id="btnConfirmarLogout">
//           Sí, cerrar sesión
//         </button>
//       </div>
//     </div>
//   `;
  
//   // Mostrar modal
//   modal.classList.add('show');
  
//   // Event listeners del modal
//   document.getElementById('btnCerrarModal').onclick = cerrarModal;
//   document.getElementById('btnCancelar').onclick = cerrarModal;
//   document.getElementById('btnConfirmarLogout').onclick = () => {
//     cerrarModal();
//     mostrarToast('Sesión cerrada correctamente', 'warning');
//     // Aquí iría la lógica real de logout
//     console.log('🔐 Logout ejecutado');
//   };
// }

// function cerrarModal() {
//   document.getElementById('logoutModal').classList.remove('show');
// }

// // Cerrar modal clicando fuera
// document.getElementById('logoutModal').addEventListener('click', (e) => {
//   if (e.target.classList.contains('modelOverlay')) {
//     cerrarModal();
//   }
// });