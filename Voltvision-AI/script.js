document.addEventListener("DOMContentLoaded", () => {

    // 1. Navigation Smooth Scrolling
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));

            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. Elements Selection
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const analyzeButton = document.getElementById("analyzeButton");

    const components = document.getElementById("components");
    const connections = document.getElementById("connections");
    const errors = document.getElementById("errors");
    const corrections = document.getElementById("corrections");

    let isImageUploaded = false;

    // 3. Image Upload and Preview Logic
    if (imageInput) {
        imageInput.addEventListener("change", (event) => {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    imagePreview.innerHTML = `
                        <p style="color: #10b981; font-weight: bold; margin-top: 15px;">
                            ✅ Image Successfully Uploaded!
                        </p>
                        <img src="${e.target.result}" alt="Uploaded Circuit" style="max-width: 100%; max-height: 250px; border-radius: 8px; margin-top: 10px; border: 1px solid #38bdf8;">
                    `;
                    isImageUploaded = true;
                };

                reader.readAsDataURL(file);
            }
        });
    }

    // 4. Analyze Button Click Logic
    if (analyzeButton) {
        analyzeButton.addEventListener("click", () => {
            if (!isImageUploaded) {
                alert("Kripya pehle circuit ki image upload karein!");
                return;
            }

            // Status Updating
            components.innerText = "Analyzing circuit components...";
            connections.innerText = "Checking pin connections...";
            errors.innerText = "Scanning for potential short circuits/errors...";
            corrections.innerText = "Generating recommendations...";

            // Simulated AI Analysis Output
            setTimeout(() => {
                components.innerText = "1x Arduino Uno, 1x Red LED, 1x 220Ω Resistor, Breadboard, Jumper Wires.";
                connections.innerText = "LED Anode -> Pin 13, LED Cathode -> Resistor -> GND.";
                errors.innerText = "No critical errors detected. Circuit configuration looks good.";
                corrections.innerText = "Ensure all components are securely seated in the breadboard slots.";
            }, 1500);
        });
    }

});
