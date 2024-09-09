document.getElementById('booking-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Create a FormData object to send the form data via AJAX
    const formData = new FormData(this);

    // Send the form data to the server using fetch
    fetch('send_booking.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Get the server response as text
    .then(data => {
        // Display the server's response inside the form-message div
        document.getElementById('form-message').innerHTML = data;
    })
    .catch(error => {
        // Handle any errors during the AJAX request
        document.getElementById('form-message').innerHTML = "Beklager, noget gik galt. Prøv igen.";
    });
});