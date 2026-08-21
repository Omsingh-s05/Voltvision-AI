// 1. API Key Setup
const GEMINI_API_KEY = "AQ.Ab8RN6Le-Hyq8xkB0lcf0vHZWvyqOgg4oKh_GAJ2mQXZkxLCrg";

// 2. DOM Elements
const imageInput = document.getElementById("imageInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const imagePreview = document.getElementById("imagePreview");
const resultDiv = document.getElementById("result");

let base64Image = "";

// 3. Image Selection & Preview
if (imageInput) {
    imageInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                if (imagePreview) {
                    imagePreview.src = event.target.result;
                    imagePreview.style.display = "block";
                    imagePreview.style.maxWidth = "100%";
                    imagePreview.style.marginTop = "15px";
                }
                
                base64Image = event.target.result.split(",")[1];
                
                if (resultDiv) {
                    resultDiv.innerHTML = "✅ Image selected! Click 'Analyze Circuit' now.";
                }
            };

            reader.readAsDataURL(file);
        }
    });
}

// 4. Gemini API Call with Code Rectification Prompt
if (analyzeBtn) {
    analyzeBtn.addEventListener("click", async () => {
        if (!base64Image) {
            alert("Pehle koi image upload karein!");
            return;
        }

        if (resultDiv) {
            resultDiv.innerHTML = "🔍 Circuit analyze ho raha hai aur code verify kiya ja raha hai... Kripya wait karein.";
        }

        const promptText = `
        You are an expert embedded systems and electronic circuit engineer. Analyze this image carefully:

        1. Check if the image shows an electronic circuit, PCB, schematic, or electrical diagram.
        2. If it is NOT an electronic circuit (e.g. anime, human, random object), strictly output ONLY:
           "❌ This is not an electronic circuit image. Please upload a valid circuit or PCB photo."
        3. If it IS a valid circuit/diagram:
           - List all visible components (e.g., Resistors, LEDs, Microcontrollers, Sensors).
           - Identify potential wiring errors, missing components, or short-circuit risks.
           - Provide the CORRECT working code (e.g. Arduino C++, ESP32, or Python/Raspberry Pi) for this specific circuit pinout.
        `;

        const requestData = {
            contents: [
                {
                    parts: [
                        { text: promptText },
                        {
                            inline_data: {
                                mime_type: "image/jpeg",
                                data: base64Image
                            }
                        }
                    ]
                }
            ]
        };

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(requestData)
                }
            );

            const data = await response.json();

            if (data.error) {
                if (resultDiv) {
                    resultDiv.innerHTML = `<span style="color:red;">API Error: ${data.error.message}</span>`;
                }
                return;
            }

            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const aiResponse = data.candidates[0].content.parts[0].text;
                if (resultDiv) {
                    // Formatting code blocks and line breaks
                    resultDiv.innerHTML = aiResponse
                        .replace(/\n/g, "<br>")
                        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                        .replace(/```(.*?)```/gs, "<pre style='background:#1e293b; padding:10px; border-radius:5px; color:#38bdf8;'><code>$1</code></pre>");
                }
            }
        } catch (error) {
            console.error(error);
            if (resultDiv) {
                resultDiv.innerHTML = `<span style="color:red;">Connection Error! Check your network.</span>`;
            }
        }
    });
}
