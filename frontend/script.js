const API_BASE_URL = 'https://ecommerce-backend-himanshu.azurewebsites.net';

// Fetch and display products on the product page
if (document.getElementById("product-list")) {
  const productList = document.getElementById("product-list");

  async function fetchProducts() {
    productList.innerHTML = '<p>Loading products...</p>';
    try {
      const response = await fetch(`${API_BASE_URL}/api/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const products = await response.json();
      console.log('Products fetched:', products);
      productList.innerHTML = ''; // Clear loading message
      if (products.length === 0) {
        productList.innerHTML = '<p>No products available.</p>';
        console.log('No products to display');
        return;
      }
      products.forEach(p => {
        const div = document.createElement("div");
        div.className = 'product-card';
        div.innerHTML = `
          <h3>${p.Name}</h3>
          <p>Price: $${p.Price.toFixed(2)}</p>
          <button onclick="addToCart(${p.ProductID})">Add to Cart</button>
        `;
        productList.appendChild(div);
      });
      console.log('Products rendered:', products.length);
    } catch (error) {
      console.error('Error fetching products:', {
        message: error.message,
        stack: error.stack
      });
      productList.innerHTML = `<p>Error loading products: ${error.message}. Please try again later.</p>`;
    }
  }

  fetchProducts();
}

// Add item to cart via backend API
async function addToCart(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId: id, quantity: 1 })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    alert(result.message || 'Added to cart!');
    console.log('Item added to cart:', { productId: id, quantity: 1 });
  } catch (error) {
    console.error('Error adding to cart:', {
      message: error.message,
      stack: error.stack
    });
    alert(`Failed to add item to cart: ${error.message}`);
  }
}

// Fetch and display cart items on the cart page
if (document.getElementById("cart-items")) {
  const cartItems = document.getElementById("cart-items");

  async function fetchCart() {
    cartItems.innerHTML = '<p>Loading cart...</p>';
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const cart = await response.json();
      console.log('Cart items fetched:', cart);
      cartItems.innerHTML = ''; // Clear loading message
      if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        console.log('No cart items to display');
        return;
      }
      cart.forEach(item => {
        const div = document.createElement("div");
        div.className = 'cart-item';
        div.innerHTML = `
          <strong>${item.Name}</strong>
          <span>$${item.Price.toFixed(2)} (Quantity: ${item.Quantity})</span>
        `;
        cartItems.appendChild(div);
      });
      console.log('Cart items rendered:', cart.length);
    } catch (error) {
      console.error('Error fetching cart:', {
        message: error.message,
        stack: error.stack
      });
      cartItems.innerHTML = `<p>Error loading cart: ${error.message}. Please try again later.</p>`;
    }
  }

  fetchCart();
}