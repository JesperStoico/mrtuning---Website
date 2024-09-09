// Function to get query parameter value
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to set the dropdown based on the query parameter
function setTuningDropdown() {
    const tuning = getQueryParam('tuning');
    const tuningSelect = document.getElementById('tuning');

    if (tuning) {
        tuningSelect.value = tuning;
    }
}

// Set the dropdown value when the page loads
document.addEventListener('DOMContentLoaded', setTuningDropdown);