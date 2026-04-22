const API = 'http://localhost:3000/productos';

// Cargar productos
async function cargarProductos() {
  const res = await fetch(API);
  const data = await res.json();

  const tabla = document.getElementById('tabla');
  tabla.innerHTML = '';

  data.forEach(p => {
    tabla.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>${p.stock}</td>
        <td>
          <button class="edit" xx="editar(${p.id}, '${p.nombre}', ${p.precio}, ${p.stock})">Editar</button>
          <button class="delete" xx="eliminar(${p.id})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

// Guardar producto
async function guardarProducto() {
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const stock = document.getElementById('stock').value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, precio, stock })
  });

  cargarProductos();
}

// Eliminar
async function eliminar(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  cargarProductos();
}

// Editar
async function editar(id, nombre, precio, stock) {
  const nuevoNombre = prompt("Nombre:", nombre);
  const nuevoPrecio = prompt("Precio:", precio);
  const nuevoStock = prompt("Stock:", stock);

  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nuevoNombre,
      precio: nuevoPrecio,
      stock: nuevoStock
    })
  });

  cargarProductos();
}

// Inicializar
cargarProductos();
