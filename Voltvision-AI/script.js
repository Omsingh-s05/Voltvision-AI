const GEMINI_API_KEY = "AQ.Ab8RN6Le-Hyq8xkB0lcf0vHZWvyqOgg4oKh_GAJ2mQXZkxLCrg";

const imageInput = document.getElementById("imageInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const imagePreview = document.getElementById("imagePreview");
const resultDiv = document.getElementById("result");

let base64Image = "";
let fileMimeType = "image/jpeg";

// File upload listener
imageInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        fileMimeType = file.type || "image/jpeg";
        const reader = new FileReader();
        
        reader.onload = function(event) {
            if (imagePreview) {
                imagePreview.src = event.target.result;
                imagePreview.style.display = "block";
            }
            
            base64Image = event.target.result.split(",")[1];
            resultDiv.innerHTML = "✅ Image ready! Click 'Analyze Circuit'.";
        };

        reader.readAsDataURL(file);
    }
});

// Analyze button listener
analyzeBtn.addEventListener("click", async () => {
    if (!base64Image) {
        alert("Pehle image choose karein!");
        return;
    }

    resultDiv.innerHTML = "🔍 Circuit analyze ho raha hai... Please wait.";

    const promptText = `
    Analyze this image carefully:
    1. Check if the image shows an electronic circuit, PCB, schematic, or electrical diagram.
    2. If NOT an electronic circuit, strictly output ONLY:
       "❌ This is not an electronic circuit image. Please upload a valid circuit or PCB photo."
    3. If IT IS a valid circuit:
       - List visible components.
       - Identify wiring or pin errors.
       - Provide the corrected code (Arduino/ESP32) for this setup.
    `;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: promptText },
                            { inline_data: { mime_type: fileMimeType, data: base64Image } }
                        ]
                    }]
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            resultDiv.innerHTML = `<span style="color:red;">Error: ${data.error.message}</span>`;
            return;
        }

        const text = data.candidates[0].content.parts[0].text;
        resultDiv.innerHTML = text
            .replace(/\n/g, "<br>")
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
            .replace(/```(.*?)```/gs, "<pre style='background:#334155; padding:10px; color:#38bdf8; border-radius:5px;'><code>$1</code></pre>");

    } catch (err) {
        resultDiv.innerHTML = "<span style='color:red;'>Connection Error! Check internet connection.</span>";
    }
});
