(function () {
  // --- helpers ---
  const LS_KEY = "fc_cart_v1";

  function loadCart() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Error leyendo carrito de localStorage", e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error("Error guardando carrito en localStorage", e);
    }
  }

  function formatPrice(n) {
    return n.toLocaleString();
  }

  // --- estado ---
  let cart = loadCart();

  // --- asegurar existencia de elementos del carrito ---
  function ensureCartElements() {
    let cartModal = document.getElementById("cart-modal");

    if (!cartModal) {
      cartModal = document.createElement("div");
      cartModal.id = "cart-modal";
      cartModal.className = "cart-modal";

      cartModal.innerHTML = `
        <h3>Tu carrito</h3>
        <ul id="cart-items"></ul>
        <p>Total: $<span id="cart-total">0</span></p>
        <button id="checkout-btn" class="checkout-btn">Comprar</button>
        <button id="close-cart">Cerrar</button>
      `;

      document.body.appendChild(cartModal);
    }

    return {
      cartModal,
      cartItemsList: document.getElementById("cart-items"),
      cartTotal: document.getElementById("cart-total"),
      cartBtn: document.getElementById("cart-btn"),
      cartCount: document.getElementById("cart-count"),
      closeCartBtn: document.getElementById("close-cart"),
    };
  }

  // --- renderizar carrito ---
  function updateCartUI() {
    const { cartItemsList, cartTotal, cartCount } = ensureCartElements();

    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${formatPrice(item.price)}
        <button class="remove-btn" data-index="${index}">Eliminar</button>`;
      cartItemsList.appendChild(li);
      total += item.price;
    });

    if (cartCount) cartCount.textContent = cart.length;
    if (cartTotal) cartTotal.textContent = formatPrice(total);

    cartItemsList.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        if (!Number.isNaN(idx)) {
          cart.splice(idx, 1);
          saveCart(cart);
          updateCartUI();
        }
      });
    });
  }

  // --- agregar producto al carrito ---
  function addProductToCartFromButton(button) {
    let name = button.dataset.name || "";
    let price = parseFloat(button.dataset.price);

    if (!name || isNaN(price)) {
      const productEl = button.closest(".producto") || button.closest(".producto-detalle");

      if (productEl) {
        const nameEl = productEl.querySelector("h2, h1");
        const priceEl = productEl.querySelector("p, .precio");

        if (nameEl && !name) name = nameEl.textContent.trim();

        if (priceEl && isNaN(price)) {
          price = parseFloat(
            priceEl.textContent.replace("$", "").replace(/\./g, "").replace(",", ".")
          );
        }
      }
    }

    if (!name || isNaN(price)) {
      console.error("No se pudo obtener name/price del producto.");
      return false;
    }

    cart.push({ name, price });
    saveCart(cart);
    updateCartUI();
    return true;
  }

  // --- inicialización ---
  document.addEventListener("DOMContentLoaded", () => {
    const { cartBtn, closeCartBtn } = ensureCartElements();
    updateCartUI();

    // abrir carrito
    if (cartBtn) {
      cartBtn.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("cart-modal").classList.toggle("active");
      });
    }

    // cerrar carrito
    if (closeCartBtn) {
      closeCartBtn.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("cart-modal").classList.remove("active");
      });
    }

    // botón proceder a compra
    document.addEventListener("click", e => {
      if (e.target.id === "checkout-btn") {
        if (cart.length === 0) {
          alert("Tu carrito está vacío.");
          return;
        }
        window.location.href = "checkout.html";
      }
    });

    // botones agregar al carrito
    document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        addProductToCartFromButton(button);
      });
    });

    // filtros
    const filters = document.querySelectorAll(".filter");
    const products = document.querySelectorAll(".producto");

    if (filters.length > 0 && products.length > 0) {
      filters.forEach(filter => {
        filter.addEventListener("change", () => {
          const activeFilters = Array.from(filters)
            .filter(f => f.checked)
            .map(f => f.value);

          products.forEach(product => {
            product.style.display =
              activeFilters.length === 0 ||
              activeFilters.includes(product.dataset.category)
                ? ""
                : "none";
          });
        });
      });
    }
  });
})();
