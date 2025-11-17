const contenido = document.getElementById("contenido");

// Función genérica para cargar y mostrar películas
async function cargarPeliculas(tipo = "peliculas", clase = "card") {
    try {
        // Limpiar contenido anterior
        contenido.innerHTML = "";

        const response = await fetch('../JSON/peliculas.json');
        const cines = await response.json();

        const lista = cines[tipo]; // accede a cines.peliculas, cines.estreno o cines.proximamente

        lista.forEach(peli => {
            const div = document.createElement("div");
            const imagen = document.createElement("img");
            const titulo = document.createElement("h2");
            const texto = document.createElement("p");

            const btnCompra = document.createElement("input");
            btnCompra.type = "button";
            btnCompra.value = "Reservar";



            imagen.src = peli.imagen;
            imagen.alt = peli.titulo;
            titulo.textContent = peli.titulo;
            texto.textContent = peli.informacion;

            div.className = clase;
            div.append(imagen, titulo, texto, btnCompra);

            contenido.appendChild(div);
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
    }
}

// Cargar todas las películas al inicio
cargarPeliculas();

// Botones
document.getElementById("todos").addEventListener("click", () => {
    cargarPeliculas("peliculas", "card");
});

document.getElementById("estrenos").addEventListener("click", () => {
    cargarPeliculas("estreno", "card-estreno");
});

document.getElementById("proximamente").addEventListener("click", () => {
    cargarPeliculas("proximamente", "card-proximamente");
});


// Código para el carrito de compras
// ---------- CARRITO DE COMPRAS ----------
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contadorCarrito = document.getElementById("contadorCarrito");
const modal = document.getElementById("carritoModal");
const listaCarrito = document.getElementById("listaCarrito");
const cerrar = document.querySelector(".cerrar");
const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
const carritoBtn = document.getElementById("carritoBtn");

function actualizarContador() {
  contadorCarrito.textContent = carrito.length;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
    return;
  }

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.titulo}">
      <p>${item.titulo}</p>
      <button class="eliminar" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(div);
  });

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      actualizarContador();
      mostrarCarrito();
    });
  });
}

carritoBtn.addEventListener("click", e => {
  e.preventDefault();
  modal.style.display = "block";
  mostrarCarrito();
});

cerrar.addEventListener("click", () => (modal.style.display = "none"));

window.addEventListener("click", e => {
  if (e.target == modal) modal.style.display = "none";
});

vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarContador();
  mostrarCarrito();
});

// ----- Botón “Reservar” -----
document.addEventListener("click", e => {
  if (e.target.value === "Reservar") {
    const card = e.target.closest("div"); // la tarjeta
    const titulo = card.querySelector("h2").textContent;
    const imagen = card.querySelector("img").src;
    const info = card.querySelector("p").textContent;

    const pelicula = { titulo, imagen, informacion: info };
    carrito.push(pelicula);
    guardarCarrito();
    actualizarContador();
  }
});

// Inicializa contador
actualizarContador();
