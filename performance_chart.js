fetch('model_data.json')
    .then(response => response.json())
    .then(data => {
        const modelSelect = document.getElementById('model');
        const engineSelect = document.getElementById('engine');
        let carChart = null;

        // Populate the models dropdown
        const models = [...new Set(data.map(item => item.Model))];

        models.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });

        modelSelect.addEventListener('change', function() {
            const selectedModel = this.value;
            engineSelect.innerHTML = '<option value="">Select an engine</option>';

            const engines = data.filter(item => item.Model === selectedModel).map(item => item.Engine);

            engines.forEach(engine => {
                const option = document.createElement('option');
                option.value = engine;
                option.textContent = engine;
                engineSelect.appendChild(option);
            });

            // Clear chart when model changes
            if (carChart) {
                carChart.destroy();
            }
        });

        engineSelect.addEventListener('change', function() {
            const selectedModel = modelSelect.value;
            const selectedEngine = this.value;

            const carData = data.find(item => item.Model === selectedModel && item.Engine === selectedEngine);

            if (carData) {
                const hp = [carData.HP, carData["Stage 1 HP"], carData["Stage 2 HP"]];
                const nm = [carData.NM, carData["Stage 1 NM"], carData["Stage 2 NM"]];

/*                 const hpGains = [
                    carData.HP,  // Standard
                    carData["Stage 1 HP"] - carData.HP,  // Gain from Standard to Stage 1
                    carData["Stage 2 HP"] - carData["Stage 1 HP"]  // Gain from Stage 1 to Stage 2
                ];

                const nmGains = [
                    carData.NM,  // Standard
                    carData["Stage 1 NM"] - carData.NM,  // Gain from Standard to Stage 1
                    carData["Stage 2 NM"] - carData["Stage 1 NM"]  // Gain from Stage 1 to Stage 2
                ]; */

                // Render the chart
                const ctx = document.getElementById('carChart').getContext('2d');

                if (carChart) {
                    carChart.destroy(); // Clear the previous chart if it exists
                }

                carChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: [
                            `Standard: ${carData.HP} HP - ${carData.NM} NM`,
                            `Stage 1: +${carData["Stage 1 HP"]} HP - +${carData["Stage 1 NM"]} NM`,
                            `Stage 2: +${carData["Stage 2 HP"]} HP - +${carData["Stage 2 NM"]} NM`
                        ],
                        datasets: [
                            {
                                label: 'HP',
                                data: hp,
                                backgroundColor: 'rgba(160, 1, 1, 0.6)',
                                borderColor: 'black',
                                borderWidth: 1
                            },
                            {
                                label: 'NM',
                                data: nm,
                                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                borderColor: 'black',
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

