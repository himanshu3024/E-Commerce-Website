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
      productList.innerHTML = ''; // Clear loading message
      if (products.length === 0) {
        productList.innerHTML = '<p>No products available.</p>';
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
    } catch (error) {
      console.error('Error fetching products:', error);
      productList.innerHTML = '<p>Error loading products. Please try again later.</p>';
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
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Failed to add item to cart. Please try again.');
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
      cartItems.innerHTML = ''; // Clear loading message
      if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
      }
      cart.forEach(item => {
        const div = document.createElement("div");
        div.className = 'cart-item';
        div.innerHTML = `<strong>${item.Name}</strong> - $${item.Price.toFixed(2)} (Quantity: ${item.Quantity})`;
        cartItems.appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching cart:', error);
      cartItems.innerHTML = '<p>Error loading cart. Please try again later.</p>';
    }
  }

  fetchCart();
}