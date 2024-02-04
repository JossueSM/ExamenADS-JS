
  async function submitComment() {
    const productName = document.getElementById('productName').value;
      const productId = document.getElementById('productId').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const comment = document.getElementById('comment').value;
  
      // Crear un objeto con los datos del comentario
      const commentData = {
        productName: productName,
        productId: productId,
        name: name,
        email: email,
        comment: comment
      };
      
    try {
      const response = await fetch('http://localhost:3000/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });
      if (!response.error) {
        alert('Comentario enviado correctamente.');
        commentForm.reset(); // Reinicia el formulario después de enviarlo
      } else {
        console.error(response.error);
        alert('Hubo un error al enviar el comentario. Por favor, inténtelo de nuevo.');
      }
      if (!response.ok) {
        throw new Error('Error al enviar el comentario');
      }
      return await response.json();
      
    } catch (error) {
      console.error(error);
      return { error: 'Error al enviar el comentario' };
    }
  }
  



  document.addEventListener('DOMContentLoaded', async () => {
    const comentariosContainer = document.getElementById('comentarios-container');
  
    try {
      // Obtener el ID del producto de la URL
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');

      // Hacer la solicitud al backend con el ID del producto
      const response = await fetch(`http://localhost:3000/comentarios?id_producto=${productId}`);
      if (!response.ok) {
        throw new Error('Error al obtener comentarios');
      }
      const comentarios = await response.json();
  
      // Renderizar los comentarios
      renderizarComentarios(comentarios);
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
});

function renderizarComentarios(comentarios) {
    const comentariosContainer = document.getElementById('comentarios-container');
  
    // Limpiar el contenedor antes de agregar los comentarios
    comentariosContainer.innerHTML = '';
  
    comentarios.forEach(comentario => {
        const comentarioCard = document.createElement('div');
        comentarioCard.classList.add('card', 'comment-card', 'col-md-6'); // Añade la clase col-md-6 para que ocupe la mitad del ancho en dispositivos medianos y superiores
  
        const comentarioCardBody = document.createElement('div');
        comentarioCardBody.classList.add('card-body');
        
        const nombreProducto = document.createElement('h5');
        nombreProducto.classList.add('card-title');
        nombreProducto.innerHTML = `<strong>Producto: </strong>${comentario.nombre_producto}`;

        const nombreUsuario = document.createElement('h6');
        nombreUsuario.classList.add('card-subtitle', 'mb-2', 'text-muted');
        nombreUsuario.innerHTML = `<strong>Usuario: </strong>${comentario.user_name}`;

        const correoUsuario = document.createElement('h6');
        correoUsuario.classList.add('card-subtitle', 'mb-2', 'text-muted');
        correoUsuario.innerHTML = `<strong>Correo: </strong>${comentario.correo}`;

        const contenidoComentario = document.createElement('p');
        contenidoComentario.classList.add('card-text');
        contenidoComentario.innerHTML = `<strong>Comentario: </strong>${comentario.comentario}`;
  
        comentarioCardBody.appendChild(nombreProducto);
        comentarioCardBody.appendChild(nombreUsuario);
        comentarioCardBody.appendChild(correoUsuario);
        comentarioCardBody.appendChild(contenidoComentario);
  
        comentarioCard.appendChild(comentarioCardBody);
  
        comentariosContainer.appendChild(comentarioCard);
    });
}



  
