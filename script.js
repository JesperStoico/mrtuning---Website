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