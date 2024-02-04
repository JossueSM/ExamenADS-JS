document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del producto de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    // Realizar una solicitud al backend para obtener los detalles del producto
    try {
      const response = await fetch(`http://localhost:3000/productos?id=${productId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los detalles del producto');
      }
      const product = await response.json();
  
      // Renderizar los detalles del producto en la página
      renderProductDetails(product);
    } catch (error) {
      console.error(error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  });
  
  function renderProductDetails(product) {
    // Obtener el contenedor donde se mostrarán los detalles del producto
    const productDetailsContainer = document.getElementById('product-details');
  
    // Crear la tarjeta de Bootstrap para mostrar los detalles del producto
    const card = document.createElement('div');
    card.classList.add('card');
  
    // Crear el encabezado de la tarjeta
    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header', 'text-white', 'bg-primary');
    cardHeader.textContent = 'Detalles del Producto';
  
    // Crear el cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    // Crear la imagen del producto
    const productImage = document.createElement('img');
    productImage.classList.add('card-img-top');
    productImage.src = `data:image/png;base64,${product.imagen_base64}`; // Ruta de la imagen
    productImage.alt = 'Product Image';
    productImage.style.width = '300px'; // Establecer el ancho
    productImage.style.height = '300px'; // Establecer la altura
    productImage.style.objectFit = 'cover'; // Ajustar la imagen sin distorsión
  
    // Crear el contenedor para centrar la imagen
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('d-flex', 'justify-content-center');
  
    // Agregar la imagen al contenedor y luego al cuerpo de la tarjeta
    imageContainer.appendChild(productImage);
    cardBody.appendChild(imageContainer);
  
    // Crear el nombre del producto
    const productName = document.createElement('h2');
    productName.classList.add('nombre_producto');
    productName.textContent = product.nombre_producto;
  
    // Crear el ID del producto
    const productId = document.createElement('p');
    productId.classList.add('id');
    productId.innerHTML = `<strong>ID: </strong>${product.id}`;
  
    // Crear la descripción del producto
    const productDescription = document.createElement('p');
    productDescription.classList.add('card-text');
    productDescription.innerHTML = `<strong>Descripción: </strong> ${product.descripcion}`;
  
    // Crear el precio del producto
    const productPrice = document.createElement('p');
    productPrice.classList.add('price');
    productPrice.innerHTML = `<strong>Precio: </strong>${product.precio} $`;
  
    // Crear el tipo de productor del producto
    const productProductor = document.createElement('p');
    productProductor.classList.add('type');
    productProductor.innerHTML = `<strong>Productor Minorista / Mayorista: </strong>${product.productor}`;
  
    // Crear el origen del producto
    const productOrigen = document.createElement('p');
    productOrigen.classList.add('type');
    productOrigen.innerHTML= `<strong>Productor Local / Importado: </strong>${product.origen}`;
  
    // Crear el formulario de comentarios
    const commentForm = document.createElement('form');
    commentForm.id = 'commentForm';
    commentForm.innerHTML = `

    <h2>Califica este producto:</h2>

    <div class="rating">
        <span onclick="rate(5)">★</span>
        <span onclick="rate(4)">★</span>
        <span onclick="rate(3)">★</span>
        <span onclick="rate(2)">★</span>
        <span onclick="rate(1)">★</span>
    </div>
    
    <p id="ratingSelected"></p>
    <hr style="margin-top: 30px;">
      <h3 style="margin-bottom: 30px;">Deja un comentario </h3>
        <div class="form-group">
            <label for="productName">Nombre del Producto:</label>
            <input type="text" id="productName" name="productName" value="${product.nombre_producto}" readonly>
        </div>
        <div class="form-group">
            <label for="productId">ID del Producto:</label>
            <input type="text" id="productId" name="productId" value="${product.id}" readonly>
        </div>
        <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="email">Correo Electrónico:</label>
            <input type="text" id="email" name="email" required>
        </div>
        <div class="form-group">
            <label for="comment">Comentario:</label>
            <textarea id="comment" name="comment" required></textarea>
        </div>
        <input type="button" onclick="submitComment()" value="Enviar Comentario">
    `;
  
    // Agregar elementos al cuerpo de la tarjeta
    cardBody.appendChild(productName);
    cardBody.appendChild(productId);
    cardBody.appendChild(productDescription);
    cardBody.appendChild(productPrice);
    cardBody.appendChild(productProductor);
    cardBody.appendChild(productOrigen);
    cardBody.appendChild(commentForm); // Agregar el formulario de comentarios
  
    // Agregar el encabezado y el cuerpo a la tarjeta
    card.appendChild(cardHeader);
    card.appendChild(cardBody);
  
    // Limpiar el contenedor antes de agregar la tarjeta
    productDetailsContainer.innerHTML = '';
  
    // Agregar la tarjeta al contenedor
    productDetailsContainer.appendChild(card);

    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = `data:image/png;base64,${product.imagen_base64}`;
    document.head.appendChild(favicon);
}

  
  