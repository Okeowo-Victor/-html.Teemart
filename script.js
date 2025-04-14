
const products = [
  {
    name: "Digital Thermometer",
    price: "₦12,500",
    available: true,
    delivery: "Nationwide",
    image: "assets/thermometer.jpg"
  },
  {
    name: "Men's T-shirt",
    price: "₦5,000",
    available: false,
    delivery: "Abeokuta & Lagos only",
    image: "assets/tshirt.jpg"
  },
{
  name: "Blender - 2L",
  price: "₦15,000",
  available: true,
  delivery: "Nationwide",
  image: "assets/blender.jpg"
},
  {
    name: "Digital Thermometer",
    price: "₦2,500",
    available: true,
    delivery: "Nationwide",
    image: "assets/thermometer.jpg",
    category: "medical"
  },
  {
    name: "Men's T-shirt",
    price: "₦5,000",
    available: false,
    delivery: "Abeokuta & Lagos only",
    image: "assets/tshirt.jpg",
    category: "clothing"
  },
  {
    name: "Blender - 2L",
    price: "₦15,000",
    available: true,
    delivery: "Nationwide",
    image: "assets/blender.jpg",
    category: "electronics"
  },
  {
    name: "Paracetamol 500mg (100pcs)",
    price: "₦1,200",
    available: true,
    delivery: "Nationwide",
    image: "assets/paracetamol.jpg",
    category: "health"
  },
  {
    name: "hisense Television - 55 inch",
    price: "₦700,000",
    available: true,
    delivery: "Nationwide",
    image: "assets/tv.jpg",
    category: "electronics"
  },
  {
    name: " JBL Sound Bar - 2.1",
    price: "₦650,000",   
    available: true,
    delivery: "Nationwide",
    image: "assets/sound.jpg",
    category: "electronics"
  },
    {
        name: "LG Refrigerator - 2 Door",
        price: "₦300,000",
        available: true,
        delivery: "Nationwide",
        image: "assets/fridge.jpg",
        category: "electronics"
    },
    {
        name: "Samsung Galaxy S21",
        price: "₦350,000",
        available: true,
        delivery: "Nationwide",
        image: "assets/samsung.jpg",
        category: "electronics"
    },
    {
        name: "Apple iPhone 13",
        price: "₦450,000",
        available: true,
        delivery: "Nationwide",
        image: "assets/iphone.jpg",
        category: "electronics"
    }
];

function generateProductHTML() {
  return `
    <h1>TEE-Market</h1>
    <div class="product-grid">
      ${products.map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h2>${product.name}</h2>
          <p class="price">${product.price}</p>
          <p class="availability">
            ${product.available ? '✅ In Stock' : '❌ Out of Stock'}
          </p>
          <p class="delivery">Delivery: ${product.delivery}</p>
          
          <button onclick="addToCart('${product.name}')" ${!product.available ? 'disabled' : ''}>
  ${product.available ? 'Add to Cart' : 'Unavailable'}
</button>

        </div>
      `).join('')}
    </div>
  `;

  
}

const sections = {
  home: generateProductHTML(),
  contact: `
    <h1>Contact Us</h1>
    <div>
      <p>Email: okeowovictor37@gmail.com</p>
      <p>Phone: +234 9069790293</p>
      <p>We’re located in Lagos and Abeokuta, we deliver nationwide.</p>
    </div>
  `
};

function filterProducts(category) {
    const filtered = category === 'all'
      ? products
      : products.filter(p => p.category === category);
  
    const html = filtered.map(product => `
      <div>
        <h4>${product.name}</h4>
        <p>Price: ${product.price}</p>
        <p>${product.available ? '✅ In Stock' : '❌ Unavailable'}</p>
        <button onclick="addToCart('${product.name}')" ${!product.available ? 'disabled' : ''}>
          ${product.available ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    `).join('');
  
    document.getElementById("product-list").innerHTML = html;
  }
  
  
  const mainContent = document.getElementById('main-content');
  const links = document.querySelectorAll('.nav a');
  
  function loadSection(section) {
    mainContent.innerHTML = sections[section];
    links.forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-section="${section}"]`).classList.add('active');
  }
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.getAttribute('data-section');
      loadSection(section);
    });
  });
  
  window.onload = () => loadSection('home');

//   cart logic and code
function addToCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find(p => p.name === productName);
  
    // Check if product is already in cart
    const existing = cart.find(item => item.name === productName);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name: product.name, price: product.price, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
  
  
  // Removed duplicate and unused updateCartCount function
  
  
  function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("open");
    showCartItems();
  }
  
  function closeCart() {
    document.getElementById("cart-panel").classList.remove("open");
  }
  
  function showCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartHTML = "";
    let total = 0;
  
    if (cart.length === 0) {
      cartHTML = "<p>Your cart is empty.</p>";
    } else {
      cartHTML = cart.map((item, index) => {
        const itemTotal = parseInt(item.price.replace(/[₦,]/g, '')) * item.quantity;
        total += itemTotal;
        return `
          <div>
            <strong>${item.name}</strong><br/>
            Qty: ${item.quantity}<br/>
            Price: ${item.price}<br/>
            Total: ₦${itemTotal.toLocaleString()}<br/>
            <button onclick="removeFromCart(${index})">Remove</button>
          </div>
        `;
      }).join('');
      cartHTML += `<hr/><p><strong>Grand Total: ₦${total.toLocaleString()}</strong></p>`;
    }
  
    document.getElementById("cart-items").innerHTML = cartHTML;
  }
  function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCartItems();
  }
  
 
  window.onload = () => {
    loadSection('home');
    updateCartCount();
  };
  function placeOrder(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const delivery = document.getElementById("delivery-method").value;
  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    if (!name || !phone || !address || !delivery) {
      alert("Please fill out all fields.");
      return;
    }
  
    // You could send this to a backend here
    console.log("Order placed:", { name, phone, address, delivery, cart });
  
    alert("✅ Order placed successfully! We'll contact you shortly.");
  
    // Clear everything
    localStorage.removeItem("cart");
    updateCartCount();
    showCartItems();
    document.getElementById("checkout-form").reset();
    closeCart();
  }
  function filterProducts(category) {
    const filtered = category === 'all'
      ? products
      : products.filter(p => p.category === category);
  
    const html = filtered.map(product => `
      <div>
        <h4>${product.name}</h4>
        <p>Price: ${product.price}</p>
        <p>${product.available ? '✅ In Stock' : '❌ Unavailable'}</p>
        <button onclick="addToCart('${product.name}')" ${!product.available ? 'disabled' : ''}>
          ${product.available ? 'Add to Cart' : 'Unavailable'}
        </button>
      </div>
    `).join('');
  
    document.getElementById("product-list").innerHTML = html;
  }

function searchProducts() {
    const term = document.getElementById("search-bar").value.toLowerCase();
  
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
  
    const html = filtered.map(product => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <h4>${product.name}</h4>
          <p class="price">Price: ${product.price}</p>
          <p class="availability">${product.available ? '✅ In Stock' : '❌ Unavailable'}</p>
          <button onclick="addToCart('${product.name}')" ${!product.available ? 'disabled' : ''}>
            ${product.available ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
        `).join('');
  
    document.getElementById("product-list").innerHTML = html;
    // Removed unused viewCart function
  }
  
  // Removed unused viewCart function
  function updateCartCount() {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
      document.getElementById("cart-count").textContent = totalQty;
  }

  // Function to toggle the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open'); // Add/remove the 'open' class to toggle the sidebar visibility
}

// Optional function for cart behavior (this part remains unchanged, based on your original code)
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.style.display = cartPanel.style.display === 'none' || cartPanel.style.display === '' ? 'block' : 'none';
}

function closeCart() {
    const cartPanel = document.getElementById('cart-panel');
    cartPanel.style.display = 'none';
}

function viewCart() {
    toggleCart();
}

function placeOrder(event) {
    event.preventDefault();
    alert("Order Placed!");
}
