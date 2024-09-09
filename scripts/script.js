// Fetch and load the menu
document.getElementById('menu-container').innerHTML = fetch('header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-container').innerHTML = data;

        // Now that the menu is loaded, add the event listener for the hamburger
        const menu = document.querySelector('.menu');
        const hamburger = document.querySelector('.hamburger');

        if (menu && hamburger) {
            hamburger.addEventListener('click', () => {
                menu.classList.toggle('show');
            });
        } else {
            console.error('Menu or hamburger element not found.');
        }

        // Add event listeners to 'Add to Cart' buttons after the menu loads
        document.querySelectorAll('.add-to-cart-button').forEach(button => {
            button.addEventListener('click', () => {
                const name = button.getAttribute('data-name');
                const price = parseFloat(button.getAttribute('data-price'));
                addToCart(name, price);
            });
        });

        // Update cart count display (in case menu contains cart-count)
        updateCart();
    })
    .catch(error => console.error('Error loading the menu:', error));

// Function to toggle the hidden row
function toggleInfo(rowId) {
    const infoRow = document.getElementById(rowId);
    if (infoRow.style.display === "table-row") {
        infoRow.style.display = "none";
    } else {
        infoRow.style.display = "table-row";
    }
}

// Cart functions
let cart = [];

// Load cart from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const storedCart = JSON.parse(localStorage.getItem('cart-mrtuning'));
    if (storedCart) {
        cart = storedCart;
        updateCart();
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
}

// Function to update the cart display and count in the menu
function updateCart() {
    const cartCount = document.getElementById('cart-count');

    // Only proceed if cartCount exists in the DOM
    if (cartCount) {
        let totalItems = 0;

        // Calculate total number of items
        cart.forEach(item => {
            totalItems += item.quantity;
        });

        // Update the cart count in the menu
        cartCount.textContent = totalItems;
    } else {
        console.warn('Cart count element not found.');
    }

    // Save the cart to localStorage
    localStorage.setItem('cart-mrtuning', JSON.stringify(cart));
}

function clearCartIcon() {
    let cartCount = document.getElementById('cart-count');
    cartCount.textContent = 0;
}

// Add event listeners to the dynamically generated 'Book' buttons
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart-button')) {
        const name = e.target.getAttribute('data-name');
        const price = parseFloat(e.target.getAttribute('data-price'));
        let withTuning = e.target.getAttribute('with-tuning');
        if (withTuning === 'true') { withTuning = true};
        if (withTuning === 'false') { withTuning = false};
        addToCart(name, price, withTuning);
    }
});