async function applyFilters() {
  const filterForm = document.getElementById('filterForm');
  const formData = new FormData(filterForm);
  const filters = {};

  for (const [key, value] of formData.entries()) {
    if (!filters[key]) {
      filters[key] = [];
    }
    filters[key].push(value);
  }

  try {
    const products = await fetchFilteredProducts(filters);
    renderProducts(products);
  } catch (error) {
    console.error('Error al aplicar filtros:', error);
  }
}

async function fetchFilteredProducts(filters) {
  try {
    const response = await fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filters)
    });
    if (!response.ok) {
      throw new Error('Error al obtener productos filtrados');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

function renderProducts(products) {
  // Obtener el contenedor donde se mostrarán las tarjetas de productos
  const productContainer = document.getElementById('productContainer');
  
  // Limpiar el contenido anterior
  productContainer.innerHTML = '';

  // Inicializar el contador de productos
  let total_productos = 0;
  
  // Crear un elemento párrafo para mostrar el total de productos
  const parrafoTotal = document.createElement('div');
  parrafoTotal.innerHTML = `Total de productos:${total_productos}`;

  // Agregar el párrafo al contenedor de productos
  productContainer.appendChild(parrafoTotal);

  // Crear un contenedor con la clase "row" para las tarjetas de productos
  const row = document.createElement('div');
  row.classList.add('row');

  products.forEach(product => {
    total_productos++;

    // Crear un div con la clase "col" para cada tarjeta de producto
    const col = document.createElement('div');
    col.classList.add('col-3'); // Cada tarjeta ocupará 1/4 del ancho

    // Crear la tarjeta de Bootstrap para el producto
    const card = document.createElement('div');
    card.classList.add('card', 'bg-light'); // Agregar clase de Bootstrap para color de fondo claro
    card.style.width = '100%'; // Hacer que la tarjeta ocupe todo el ancho disponible

    // Contenido de la tarjeta
    card.innerHTML = `
      <div class="card-body" >
        <img src="data:image/png;base64,${product.imagen_base64}" class="card-img-top img-fluid" alt="Product Image" style="width: 200px;height:200px">
        <h5 class="card-title">${product.nombre_producto}</h5>
        <p class="card-text"><strong>ID: </strong>${product.id}</p>
        <p class="card-text">${product.descripcion}</p>
        <p class="card-text"><strong>Precio: </strong>${product.precio}</p>
        <button class="btn btn-secondary" onclick="window.location.href='producto.html?id=${product.id}'">Ver Detalles</button>
      </div>
    `;

    // Agregar la tarjeta al div de la columna
    col.appendChild(card);

    // Agregar la columna al contenedor de filas
    row.appendChild(col);
  });

  // Agregar el contenedor de filas al contenedor de productos
  productContainer.appendChild(row);

  // Actualizar el contenido del párrafo con el total de productos
  parrafoTotal.innerHTML = `<div class="totalp">Total de productos: ${total_productos}</h2>`;
}











async function loadProducts() {
  try {
    const products = await fetchAllProducts();
    renderProducts(products);
  } catch (error) {
    console.error('Error al cargar productos:', error);
  }
}

// Cargar todos los productos al cargar la página
document.addEventListener('DOMContentLoaded', loadProducts);


