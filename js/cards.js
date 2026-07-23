document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Alface Crespa",
      price: 4.00,
      description: "Folhas frescas e crocantes.",
      image: "assets/img/alface-crespa.png"
    },
    {
      id: 2,
      name: "Alface Americana",
      price: 4.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/alface-americana.png"
    },
    {
      id: 3,
      name: "Alface Roxa",
      price: 4.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/alfacer.png"
    },
    {
      id: 4,
      name: "Acelga",
      price: 3.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/acelga.png"
    },
    {
      id: 5,
      name: "Agrião",
      price: 3.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/agriao.png"
    },
    {
      id: 6,
      name: "Brócolis de Cabeça",
      price: 4.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/brocolisc.png"
    },
    {
      id: 7,
      name: "Brócolis de Rama",
      price: 4.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/brocolisr.png"
    },
    {
      id: 8,
      name: "Cheiro Verde",
      price: 3.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/cheiro.png"
    },
    {
      id: 9,
      name: "Couve",
      price: 3.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/couve.png"
    },
    {
      id: 10,
      name: "Mostarda",
      price: 3.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/mostarda.png"
    },
    {
      id: 11,
      name: "Rúcula",
      price: 4.00,
      description: "Ideal para saladas e molhos.",
      image: "assets/img/rucula.png"
    }
  ];

  const container = document.getElementById("productContainer");
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const closeCart = document.getElementById("closeCart");
  const checkoutForm = document.getElementById("checkoutForm");

  const cart = [];

  function renderProducts() {
    container.innerHTML = products.map(product => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-card__image-wrap">
          <img class="product-card__image" src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-card__content">
          <h3 class="product-card__name">${product.name}</h3>
          <p class="product-card__price">R$ ${product.price.toFixed(2)}</p>
          <p class="product-card__desc">${product.description}</p>
        </div>

        <div class="product-card__footer">
          <button class="add-to-cart" type="button">Adicionar</button>
        </div>
      </article>
    `).join("");
  }

  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("show");
    cartDrawer.setAttribute("aria-hidden", "false");
  }

  function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("show");
    cartDrawer.setAttribute("aria-hidden", "true");
  }

  function addItemToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
  }

  function removeItemFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);

    if (index !== -1) {
      cart.splice(index, 1);
    }

    updateCartUI();
  }

  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalValue = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `R$ ${totalValue.toFixed(2)}`;

    if (cart.length === 0) {
      cartItems.innerHTML = `<p class="cart-empty">Seu carrinho está vazio.</p>`;
      return;
    }

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item__image">
        <div class="cart-item__info">
          <h3 class="cart-item__name">${item.name}</h3>
          <p class="cart-item__qty">Qtd: ${item.quantity}</p>
          <p class="cart-item__price">R$ ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        <button class="remove-from-cart" type="button" data-remove-id="${item.id}">Remover</button>
      </div>
    `).join("");
  }

  container.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;

    const card = button.closest(".product-card");
    const productId = Number(card.dataset.id);
    const product = products.find(p => p.id === productId);

    if (product) addItemToCart(product);
  });

  cartItems.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-from-cart");
    if (!button) return;

    const productId = Number(button.dataset.removeId);
    removeItemFromCart(productId);
  });

  closeCart.addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (cart.length === 0) return;

    const clientName = document.getElementById("clientName").value.trim();
    const clientPhone = document.getElementById("clientPhone").value.trim();
    const clientAddress = document.getElementById("clientAddress").value.trim();
    const paymentMethod = document.getElementById("paymentMethod").value;

    if (!clientName || !clientPhone || !clientAddress || !paymentMethod) return;

    alert("Pedido enviado com sucesso!");

    cart.length = 0;
    checkoutForm.reset();
    updateCartUI();
    closeCartDrawer();
  });

  renderProducts();
  updateCartUI();
});