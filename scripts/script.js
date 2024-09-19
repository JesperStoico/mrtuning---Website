document.addEventListener('DOMContentLoaded', () => {
    // Fetch and load the menu
    document.getElementById('menu-container').innerHTML = fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-container').innerHTML = data;

            // Add the event listener for the hamburger
            const menu = document.querySelector('.menu');
            const hamburger = document.querySelector('.hamburger');

            if (menu && hamburger) {
                hamburger.addEventListener('click', () => {
                    menu.classList.toggle('show');
                });
            } else {
                console.error('Menu or hamburger element not found.');
            }

            // Update cart count display
            updateCart();
        })
        .catch(error => console.error('Error loading the menu:', error));

    // Use event delegation to handle clicks for dynamically added buttons
    document.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('add-to-cart-button')) {
            const button = event.target;
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            let withTuning = button.getAttribute('with-tuning');

            if (name && !isNaN(price)) {
                if (withTuning === 'false') {
                    withTuning = false;
                }
                addToCart(name, price, withTuning);
            } else {
                console.error('Add to Cart button attributes are missing or incorrect.');
            }
        }
    });

    // Attach clear cart button functionality
    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
});

// Cart functions
let cart = [];

// Load cart from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedCart = JSON.parse(localStorage.getItem('cart-mrtuning'));
    if (storedCart) {
        cart = storedCart;
        updateCart();
        renderCart();
    }
});

// Function to add item to cart
function addToCart(name, price, withTuning) {
    const item = cart.find(i => i.name === name && i.withTuning === withTuning);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, withTuning, quantity: 1 });
    }
    updateCart();
    renderCart();
}

// Function to update the cart display and count in the menu
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    // If we are on the price page, this will update the button as well.
    const cartButton = document.getElementById('go-to-cart-button');

    if (cartCount) {
        let totalItems = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
        });

        cartCount.textContent = totalItems;
        if (cartButton) {
            cartButton.textContent = `Gå til kurv (${totalItems})`;
        }
    } else {
        console.warn('Cart count element not found.');
    }

    localStorage.setItem('cart-mrtuning', JSON.stringify(cart));
}

// Function to render the cart items
function renderCart() {
    const cartTable = document.getElementById('cart-table');
    const cartTotal = document.getElementById('cart-total');

    if (cartTable) {
        cartTable.innerHTML = '';  // Clear the table
        let total = 0;

        console.log('Render cart', cart);
        cart.forEach((item, index) => {
            // Create row for each cart item
            const row = document.createElement('tr');
            let extraInfo = "";
            console.log(item)
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
        })
        if (cartTotal) {
            // Display total price
            cartTotal.textContent = `Total: ${total.toFixed(2)} kr.`;
        };    
    };
};

// Clear the cart
function clearCart() {
    localStorage.removeItem('cart-mrtuning');
    cart = []; // Clear the cart variable

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

    const cartCounter = document.getElementById('cart-count');
    if (cartCounter) {
        cartCounter.textContent = 0; // Set cart counter to 0 if it exists
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from the array
    localStorage.setItem('cart-mrtuning', JSON.stringify(cart)); // Update local storage    
    renderCart();
    updateCart();
}

// Add event listener for remove buttons
document.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('remove-button')) {
        const index = event.target.getAttribute('data-index');
        removeFromCart(index);
    }
});

// Function to toggle the hidden row
function toggleInfo(rowId) {
    const infoRow = document.getElementById(rowId);
    if (infoRow.style.display === "table-row") {
        infoRow.style.display = "none";
    } else {
        infoRow.style.display = "table-row";
    }
}