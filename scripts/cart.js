// Cart functions
let cart_local = [];

// Load cart from localStorage and display it
document.addEventListener('DOMContentLoaded', () => {
    const storedCart = JSON.parse(localStorage.getItem('cart-mrtuning'));
    if (storedCart) {
        cart_local = storedCart;
        renderCart();
    }
});

// Function to render the cart items
function renderCart() {
    const cartTable = document.getElementById('cart-table');
    const cartTotal = document.getElementById('cart-total');
    cartTable.innerHTML = '';  // Clear the table
    let total = 0;

    console.log('Render cart', cart_local);
    
    cart_local.forEach((item, index) => {
        // Create row for each cart item
        const row = document.createElement('tr');
        let extraInfo = "";
        if (item.withTuning === false) {
            extraInfo = " (uden tuning.)";
        }
        row.innerHTML = `
            <td>${item.name}${extraInfo}</td>
            <td>${item.price.toFixed(2)} kr.</td>
            <td>${item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)} kr.</td>
            <td><button class="remove-button" data-index="${index}">Fjern</button></td>
        `;
        cartTable.appendChild(row);

        // Update total price
        total += item.price * item.quantity;
    });

    // Display total price
    cartTotal.textContent = `Total: ${total.toFixed(2)} kr.`;
}

// Clear the cart
function clearCart() {
    // Clear local storage or session storage for the cart
    localStorage.removeItem('cart-mrtuning');

    // Attempt to clear cart display in the DOM
    const cartTable = document.getElementById('cart-table');
    const cartTotal = document.getElementById('cart-total');

    if (cartTable) {
        cartTable.innerHTML = ''; // Clear the cart table if it exists
    } else {
        console.error("Cart table element not found!");
    }

    if (cartTotal) {
        cartTotal.innerHTML = ''; // Clear the cart total if it exists
    } else {
        console.error("Cart total element not found!");
    }

    // Optionally reset the cart counter
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = 0; // Set cart counter to 0 if it exists
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart_local.splice(index, 1); // Remove item from the array
    localStorage.setItem('cart-mrtuning', JSON.stringify(cart_local)); // Update local storage
    renderCart();
    updateCart();
}

// Add event listener for remove buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-button')) {
        const index = event.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Attach clear cart button functionality
document.addEventListener('DOMContentLoaded', () => {
    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
});
