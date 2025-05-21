// Mock products (replace with backend call later)
const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Headphones", price: 120 },
  { id: 3, name: "Keyboard", price: 50 }
];

if (document.getElementById("product-list")) {
  const productList = document.getElementById("product-list");
  products.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>Price: $${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// Cart Page
if (document.getElementById("cart-items")) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = document.getElementById("cart-items");
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${item.name}</strong> - $${item.price}`;
      cartItems.appendChild(div);
    });
  }
}
