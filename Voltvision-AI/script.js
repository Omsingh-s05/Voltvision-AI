// 1. New API Key
const GEMINI_API_KEY = "AQ.Ab8RN6Jxlb33K0vfzdQ1F7umA-t9cvXleyVTHBW4hJeMR_69xQ";

// 2. DOM Elements
const imageInput = document.getElementById("imageInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const imagePreview = document.getElementById("imagePreview");
const resultDiv = document.getElementById("result");

let base64Image = "";
let fileMimeType = "image/jpeg";

// 3. Image Selection & Preview Handler
if (imageInput) {
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
                
                if (resultDiv) {
                    resultDiv.innerHTML = "✅ Photo ready! Click 'Analyze Circuit'.";
                }
            };

            reader.readAsDataURL(file);
        }
    });
}

// 4. API Request & Circuit / Code Analysis
if (analyzeBtn) {
    analyzeBtn.addEventListener("click", async () => {
        if (!base64Image) {
            alert("Pehle koi image select karein!");
            return;
        }

        if (resultDiv) {
            resultDiv.innerHTML = "🔍 Circuit analyze aur code verify ho raha hai... Please wait.";
        }

        const promptText = `
        You are an expert embedded systems and electronic circuit engineer. Analyze this image carefully:

        1. Check if the image shows an electronic circuit, PCB, schematic, or electrical diagram.
        2. If it is NOT an electronic circuit (e.g. anime, human, random object), strictly output ONLY:
           "❌ This is not an electronic circuit image. Please upload a valid circuit or PCB photo."
        3. If IT IS a valid circuit:
           - List all visible components (e.g., Microcontroller, Resistors, LEDs, Sensors).
           - Identify any wiring errors, missing connections, or pinout mistakes.
           - Provide the corrected, working code (Arduino C++, ESP32, or Python/Raspberry Pi) for this setup.
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
                if (resultDiv) {
                    resultDiv.innerHTML = `<span style="color:red;">API Error: ${data.error.message}</span>`;
                }
                return;
            }

            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const text = data.candidates[0].content.parts[0].text;
                if (resultDiv) {
                    resultDiv.innerHTML = text
                        .replace(/\n/g, "<br>")
                        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                        .replace(/```(.*?)```/gs, "<pre style='background:#334155; padding:12px; color:#38bdf8; border-radius:6px; overflow-x:auto;'><code>$1</code></pre>");
                }
            }
        } catch (err) {
            console.error(err);
            if (resultDiv) {
                resultDiv.innerHTML = `<span style="color:red;">Connection Error! Check internet connection.</span>`;
            }
        }
    });
}
