//Incio para crear el carrusel
var carrusel = document.getElementById("contenedor");

cargarCarrusel();

async function cargarCarrusel() {
    try {
        const response = await fetch('../JSON/peliculas.json');
        const cines = await response.json();

        console.log('Datos recibidos: ', cines);

        //crear los contenedores necesarios para el carrusel
            var swipper = document.createElement("div");
            var swipperWrapper = document.createElement("div");
           
            var pag = document.createElement("div");
            var btnIzq = document.createElement("div");
            var btnDer = document.createElement("div");


        //colocar las clases
            swipper.className = "swiper";                 
            swipperWrapper.className = "swiper-wrapper";
            
            pag.className = "swiper-pagination";
            btnIzq.className = "swiper-button-prev";
            btnDer.className = "swiper-button-next";

        //crear la esctructura
            carrusel.appendChild(swipper);
            swipper.appendChild(swipperWrapper);
            
            swipper.appendChild(pag);
            swipper.appendChild(btnIzq);
            swipper.appendChild(btnDer);

        cines.carrusel.forEach((pelis, index) => {
            var a = document.createElement("a");
            var imgCarrusel = document.createElement("div");
            //colocar la clase
            a.className = "swiper-slide";
            a.href = "peliculas.html";
            //colocar las imagenes
            var imagen = document.createElement("img");
            imagen.src = pelis.imagen;                 
            imagen.alt = pelis.titulo;

            //estructura
            swipperWrapper.appendChild(a);
            a.appendChild(imgCarrusel);
            imgCarrusel.appendChild(imagen);
        
        });

        //---------------------CARRUSEL---------------------
        const swiper = new Swiper('.swiper', {
          // Estilo
          direction: 'horizontal',
          loop: true, //para que no tenga fin al deslizar de imagen
          allowTouchMove: true, //nos deja mover el carrusel a mano sin darle a algun boton
          autoplay: {           //hace que el carrusel se mueva solo
            delay: 5000,        //tiempo que necesita para cambiar de imagen
            pauseOnMouseEnter: true,    //si ponemos el cursor encima, la imagen no cambiara
          },
          
          // paginación
          pagination: {
            el: '.swiper-pagination',
            clickable: true, //son los puntos que aparecen por cada imagen (...)
            
          },

          // Botones para ir a la derecha o izquierda
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
    } catch (error) {
        console.error('Error al obtener datos: ', error);
    }
}

//CARGAR LAS IMAGENES DE LAS PELÍCULAS
var contenido = document.getElementById("contenido");

obtenerDatos();

async function obtenerDatos() {
    try {
        const response = await fetch('/JSON/peliculas.json');
        const cines = await response.json();

        console.log('Datos recibidos: ', cines);

        cines.taquilleras.forEach((pelis, index) => {
            var div = document.createElement("div");

            var a = document.createElement("a");
            var imagen = document.createElement("img");
            var titulo = document.createElement("h2");
            var texto = document.createElement("p");
            
            a.href = "peliculas.html";

            imagen.src = pelis.imagen;         //guardamos la dirección de las imagenes
            titulo.textContent = pelis.titulo; //guardamos en titulo de las peliculas
            imagen.alt = pelis.titulo;    //alt para las imagenes
            div.className = "card";                 //le damos una clase a los div para el css
            texto.textContent = pelis.informacion;  //guardamos la información de las peliculas
            contenido.appendChild(div);
            div.appendChild(a);
            a.appendChild(imagen);
            div.appendChild(titulo);
            div.appendChild(texto);
        
        });
    } catch (error) {
        console.error('Error al obtener datos: ', error);
    }
}




