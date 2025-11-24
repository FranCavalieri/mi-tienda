// --- Carrito ---
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
    const price = parseFloat(product.querySelector("p").textContent.replace("$", "").replace(".", ""));
    cart.push({ name, price });
    updateCart();
  });
});

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
});
