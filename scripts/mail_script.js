document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Manually set the cart data from localStorage or the relevant cart variable
    const cartData = JSON.stringify(cart); // Assuming cart_local holds the cart data
    document.getElementById('cart-data').value = cartData;

    // Create a FormData object to send the form data via AJAX
    const formData = new FormData(this);

    // Send the form data to the server using fetch
    fetch('scripts/send_booking.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Convert the response to text
    })
    .then(data => {
        document.getElementById('form-message').innerHTML = data;
        if (data.includes("Mange tak for din bestilling!")) {
            clearCart(); // Clear the cart if the order is successful
        }
    })
    .catch(error => {
        console.error("Error occurred:", error); // Log the error for debugging
        document.getElementById('form-message').innerHTML = "Beklager, noget gik galt. Prøv igen.";
    });
});
