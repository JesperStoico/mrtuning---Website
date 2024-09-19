// Function to generate the price table
function generatePriceTable(prices) {
    const priceTable = document.getElementById('price-table');
    const headlines = document.createElement('tr');
    headlines.classList.add('no-hover');
    headlines.innerHTML = `
        <th><b>Service</b></th>
        <th><b>Pris</b></th>
        <th><b>Bestil</b></th>
        <th><b>Mere info</b></th>
    `;
    priceTable.appendChild(headlines);
    prices.forEach((item, index) => {
        if (item.isHeader) {
            // Create and append header row
            const headerRow = document.createElement('tr');
            headerRow.classList.add('no-hover');
            headerRow.innerHTML = `
                <td><b>${item.name}</b></td>
                <td></td>
                <td></td>
                <td></td>
            `;
            priceTable.appendChild(headerRow);
        } else {
            // Create the main row
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price ? item.price.toFixed(2) + ' kr.' : 'Kontakt os for tilbud'}</td>
                <td><button class="book-button add-to-cart-button" data-name="${item.name}" data-price="${item.price}" with-tuning="${item.withTuning}">Tilføj til kurv</button></td>
                <td><button class="info-button" onclick="toggleInfo('info-${index}')">Mere info</button></td>
            `;

            // Create the hidden info row
            const infoRow = document.createElement('tr');
            infoRow.id = `info-${index}`;
            infoRow.classList.add('hidden-row');
            infoRow.style.display = "none"; // Ensure it's hidden by default
            infoRow.innerHTML = `
                <td colspan="4">
                    <div class="info-content">${item.info}</div>
                </td>
            `;

            // Append both rows to the table
            priceTable.appendChild(row);
            priceTable.appendChild(infoRow);
        }
    });
}

// Fetch the prices JSON file and generate the table
fetch('prices.json')
    .then(response => response.json())
    .then(data => {
        // Convert 'withTuning' to boolean for all items in the data
        data.prices.forEach(item => {
            if (typeof item.withTuning === 'string') {
                item.withTuning = item.withTuning === 'true';
            }
        });
        generatePriceTable(data.prices);
    })
    .catch(error => console.error('Error loading prices:', error));
