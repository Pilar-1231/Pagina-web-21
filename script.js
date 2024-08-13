document.addEventListener('DOMContentLoaded', () => {
    // Obtener los elementos del carrito y botones
    const carritoIcono = document.getElementById('carrito-icono');
    const carrito = document.getElementById('lista-carrito');
    const btnComprar = document.getElementById('comprar');
    const btnWhatsapp = document.getElementById('whatsapp');
    const contadorCarrito = document.getElementById('contador-carrito');
    const buttons = document.querySelectorAll('.btn-add');

    // Datos de productos
    const productos = {
        'ADIDAS LEGO Beige': {
            colores: [
                { nombre: 'Negro', precio: 0 },
                { nombre: 'Blanco', precio: 0 },
                { nombre: 'Rojo', precio: 10 }
            ],
            tallas: [38, 39, 40],
            cantidadDisponible: 10
        },
        'NIKE PARIS Gris': {
            colores: [
                { nombre: 'Gris', precio: 0 },
                { nombre: 'Negro', precio: 0 }
            ],
            tallas: [39, 40, 41],
            cantidadDisponible: 5
        }
    };

    // Agregar eventos a los botones "Añadir al carrito"
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const producto = this.closest('.producto');
            const titulo = producto.querySelector('h3').innerText;
            const imagen = producto.querySelector('img').src;
            const precio = parseFloat(producto.querySelector('.precio').innerText.replace(/[^0-9.-]+/g, ""));

            // Guardar información en localStorage
            localStorage.setItem('producto-titulo', titulo);
            localStorage.setItem('producto-imagen', imagen);
            localStorage.setItem('producto-precio', precio.toFixed(2));

            const productoData = productos[titulo] || { colores: [], tallas: [] };
            localStorage.setItem('producto-colores', JSON.stringify(productoData.colores));
            localStorage.setItem('producto-tallas', JSON.stringify(productoData.tallas));

            // Redirigir a la página de detalles del producto
            window.location.href = 'detalle-producto.html';
        });
    });

    // Función para actualizar el contador del carrito
    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const contador = carrito.length;
        contadorCarrito.innerText = contador;
    }

    // Inicializar el contador del carrito
    actualizarContadorCarrito();

    // Manejo del botón "Comprar"
    btnComprar.addEventListener('click', () => {
        // Aquí puedes añadir lógica para realizar la compra
        alert('Compra realizada');
    });

    // Manejo del botón "WhatsApp"
    btnWhatsapp.addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const mensaje = carrito.map(item => `${item.nombre} - Color: ${item.color}, Talla: ${item.talla}, Cantidad: ${item.cantidad}`).join('%0A');
        const numeroWhatsApp = '1234567890'; // Reemplaza con tu número de WhatsApp
        window.location.href = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    });

  // Carrusel de descuentos
    const carousel = document.querySelector('.descuentos-carousel');
    const inner = carousel.querySelector('.descuentos-carousel-inner');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    const slides = carousel.querySelectorAll('.descuentos-slide');
    let slideWidth = slides[0].offsetWidth; // Ancho de un slide
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * slideWidth;
        inner.style.transform = `translateX(${offset}px)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Actualizar el ancho de los slides si la ventana cambia de tamaño
    window.addEventListener('resize', () => {
        slideWidth = slides[0].offsetWidth;
        updateCarousel();
    });

    // Opcional: Auto slide
    setInterval(() => {
        nextButton.click();
    }, 5000); // Cambia de imagen cada 5 segundos
});
