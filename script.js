<<<<<<< HEAD
=======
// --- Carrito ---
>>>>>>> 8de8a5522e0218840438524601badbce6441c868
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

let cart = [];

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", e => {
    const product = e.target.closest(".producto");
    const name = product.querySelector("h2").textContent;
<<<<<<< HEAD
    const price = parseFloat(product.querySelector("p").textContent.replace("$", "").replace(".", "")); 
=======
    const price = parseFloat(product.querySelector("p").textContent.replace("$", "").replace(".", ""));
>>>>>>> 8de8a5522e0218840438524601badbce6441c868
    cart.push({ name, price });
    updateCart();
  });
});

<<<<<<< HEAD
// Modificación de la función updateCart
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;

  // 1. Usamos el índice de la iteración
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    
    // 2. Incluimos el botón de eliminar con el data-index
    li.innerHTML = `
      ${item.name} - $${item.price.toLocaleString()}
      <button class="remove-item-btn" data-index="${index}">Quitate tú</button>
    `;

    cartItemsList.appendChild(li);
    total += item.price;
  });

  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString();

  // 3. Asignar el evento a los nuevos botones de eliminar
  document.querySelectorAll(".remove-item-btn").forEach(button => {
    button.addEventListener("click", e => {
      // Parseamos el data-index para obtener el número de índice
      const indexToDelete = parseInt(e.target.dataset.index); 
      deleteItemFromCart(indexToDelete);
    });
  });
}

// Función para eliminar un producto del carrito
function deleteItemFromCart(index) {
  // splice(inicio, cuantos_eliminar)
  cart.splice(index, 1);
  updateCart(); // Volver a dibujar el carrito y recalcular el total
}


=======
function updateCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toLocaleString()}`;
    cartItemsList.appendChild(li);
    total += item.price;
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toLocaleString();
}

>>>>>>> 8de8a5522e0218840438524601badbce6441c868
cartBtn.addEventListener("click", () => cartModal.classList.add("active"));
closeCartBtn.addEventListener("click", () => cartModal.classList.remove("active"));

// --- Filtros ---
const filters = document.querySelectorAll(".filter");
const products = document.querySelectorAll(".producto");

filters.forEach(filter => {
  filter.addEventListener("change", () => {
    const activeFilters = Array.from(filters)
      .filter(f => f.checked)
      .map(f => f.value);

    products.forEach(product => {
      const category = product.dataset.category;
      product.style.display =
        activeFilters.length === 0 || activeFilters.includes(category)
          ? "block"
          : "none";
    });
  });
<<<<<<< HEAD
});
=======
});
>>>>>>> 8de8a5522e0218840438524601badbce6441c868
