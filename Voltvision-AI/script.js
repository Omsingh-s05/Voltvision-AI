document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const analyzeButton = document.getElementById("analyzeButton");

    const components = document.getElementById("components");
    const connections = document.getElementById("connections");
    const errors = document.getElementById("errors");
    const corrections = document.getElementById("corrections");

    let isImageUploaded = false;

    // 1. Image Upload Check & Preview Show Karna
    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                imagePreview.innerHTML = `
                    <p style="color: #10b981; font-weight: bold; margin-top: 10px;">
                        ✅ Image Successfully Uploaded!
                    </p>
                    <img src="${e.target.result}" alt="Uploaded Circuit" style="max-width: 100%; max-height: 250px; border-radius: 8px; margin-top: 10px; border: 1px solid #38bdf8;">
                `;
                isImageUploaded = true;
            };

            reader.readAsDataURL(file);
        }
    });

    // 2. Analyze Button Click Handler
    analyzeButton.addEventListener("click", () => {
        if (!isImageUploaded) {
            alert("Kripya pehle circuit ki image upload karein!");
            return;
        }

        // Loading State Show Karna
        components.innerText = "Analyzing circuit components...";
        connections.innerText = "Checking pin connections...";
        errors.innerText = "Scanning for potential short circuits/errors...";
        corrections.innerText = "Generating recommendations...";

        // Simulated Analysis Output (Demo Data)
        setTimeout(() => {
            components.innerText = "1x Arduino Uno, 1x LED, 1x 220 Ohm Resistor, Breadboard, Jumper Wires.";
            connections.innerText = "LED Anode -> Pin 13, LED Cathode -> Resistor -> GND.";
            errors.innerText = "No critical error detected. Wiring appears correct.";
            corrections.innerText = "Ensure all jumper wires are firmly connected into the breadboard slots.";
        }, 1500);
    });
});
