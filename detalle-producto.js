document.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos del localStorage
    const titulo = localStorage.getItem('producto-titulo');
    const imagen = localStorage.getItem('producto-imagen');
    const precio = localStorage.getItem('producto-precio');
    const colores = JSON.parse(localStorage.getItem('producto-colores'));
    const cantidadDisponible = parseInt(localStorage.getItem('producto-cantidadDisponible'));

    // Tallas comunes para todos los productos de la sección de hombres
    const tallas = ["COL 37-EUR 40", "COL 38-EUR 41", "COL 39-EUR 42", "COL 40-EUR 43", "COL 41/42-EUR 44"];

    // Mostrar los detalles del producto
    document.getElementById('detalle-titulo').innerText = titulo;
    document.getElementById('detalle-imagen').src = imagen;
    document.getElementById('detalle-precio').innerText = `$${precio}`;

    // Crear botones de selección de colores con imágenes de muestra
    const colorContainer = document.getElementById('detalle-color');
    colores.forEach(color => {
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('color-option');
        button.setAttribute('data-color', color.nombre.toLowerCase());
        button.setAttribute('data-price', color.precio);
        button.style.backgroundImage = `url(${color.imagen})`; // Imagen de muestra como fondo

        button.addEventListener('click', () => {
            document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            updateCosto();
            updateImagenProducto(color.imagen); // Cambia la imagen del producto
        });

        colorContainer.appendChild(button);
    });

    // Agregar opciones de tallas al select
    const tallaSelect = document.getElementById('detalle-talla');
    tallas.forEach(talla => {
        const option = document.createElement('option');
        option.value = talla;
        option.text = talla;
        tallaSelect.appendChild(option);
    });

    const cantidadInput = document.getElementById('detalle-cantidad');
    cantidadInput.addEventListener('input', updateCosto);

    function updateCosto() {
        const selectedColorButton = document.querySelector('.color-option.selected');
        const colorPrice = parseFloat(selectedColorButton?.getAttribute('data-price')) || 0;
        const cantidad = parseInt(cantidadInput.value);
        const basePrice = parseFloat(precio.replace(/[^0-9.-]+/g, ""));

        if (cantidad > cantidadDisponible) {
            alert('No hay suficiente cantidad disponible');
            cantidadInput.value = cantidadDisponible;
        }

        const totalCosto = basePrice + colorPrice;
        document.getElementById('detalle-costo').innerText = `$${(totalCosto * cantidad).toFixed(2)}`;
    }

    function updateImagenProducto(imagenUrl) {
        document.getElementById('detalle-imagen').src = imagenUrl;
    }

    // Manejo del botón "Agregar al Carrito"
    document.getElementById('btn-agregar').addEventListener('click', () => {
        const color = document.querySelector('.color-option.selected')?.getAttribute('data-color');
        const talla = tallaSelect.value;
        const cantidad = parseInt(cantidadInput.value);

        if (cantidad > 20 && cantidad <= cantidadDisponible) {
            const producto = {
                nombre: titulo,
                color: color,
                talla: talla,
                cantidad: cantidad
            };

            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(producto);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            actualizarContadorCarrito();
        }
    });

    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        const contador = carrito.length;
        document.getElementById('contador-carrito').innerText = contador;
    }

    // Inicializar el contador del carrito
    actualizarContadorCarrito();
});
