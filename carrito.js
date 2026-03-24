
const productos = [
    { id: 1, nombre: "Café Americano", precio: 5000, categoria: "bebida" },
    { id: 2, nombre: "Cappuccino", precio: 7000, categoria: "bebida" },
    { id: 3, nombre: "Latte", precio: 7500, categoria: "bebida" },
    { id: 4, nombre: "Chocolate Caliente", precio: 6000, categoria: "bebida" },
    { id: 5, nombre: "Croissant", precio: 4000, categoria: "comida" },
    { id: 6, nombre: "Torta de Chocolate", precio: 8000, categoria: "comida" }
];


function contadorVisitas() {
    let visitas = localStorage.getItem("visitas") || 0;
    visitas++;
    localStorage.setItem("visitas", visitas);
    document.getElementById("visitas").textContent = visitas;
}


function mostrarProductos(lista = productos) {
    const contenedor = document.getElementById("listaProductos");
    contenedor.innerHTML = "";

    lista.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h4>${p.nombre}</h4>
            <p>$${p.precio}</p>
            <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
        `;

        contenedor.appendChild(div);
    });
}


function filtrarProductos() {
    const categoria = document.getElementById("filtro").value;

    if (categoria === "todos") {
        mostrarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
    }
}


function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = productos.find(p => p.id === id);
    carrito.push(producto);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}


function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let lista = document.getElementById("listaCarrito");
    let total = 0;

    lista.innerHTML = "";

    carrito.forEach((producto, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${producto.nombre} - $${producto.precio}
            <button class="eliminar" onclick="eliminarProducto(${index})">X</button>
        `;

        lista.appendChild(li);
        total += producto.precio;
    });

    document.getElementById("total").textContent = "Total: $" + total;

   
    document.getElementById("contadorCarrito").textContent = carrito.length;
}


function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}


function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

function comprar() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let total = 0;
    let resumen = "🧾 Factura Cafetería\n\n";

    carrito.forEach(producto => {
        resumen += `${producto.nombre} - $${producto.precio}\n`;
        total += producto.precio;
    });

    resumen += "\nTotal: $" + total;

    alert(resumen);

    
    localStorage.removeItem("carrito");
    mostrarCarrito();
}



contadorVisitas();
mostrarProductos();
mostrarCarrito();

