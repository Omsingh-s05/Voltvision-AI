const GEMINI_API_KEY = "AIzaSy_yahan_nayi_key_paste_karein";

const imageInput = document.getElementById("imageInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const imagePreview = document.getElementById("imagePreview");
const resultDiv = document.getElementById("result");

let base64Image = "";
let fileMimeType = "image/jpeg";

// 1. Image Preview & Reader
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
                    resultDiv.innerHTML = "✅ Photo uploaded successfully! Click 'Analyze Circuit & Fix Code' button below.";
                }
            };

            reader.readAsDataURL(file);
        }
    });
}

// 2. Gemini Analysis Request
if (analyzeBtn) {
    analyzeBtn.addEventListener("click", async () => {
        if (!base64Image) {
            alert("Pehle koi circuit image upload karein!");
            return;
        }

        if (resultDiv) {
            resultDiv.innerHTML = "🔍 <b>Scanning circuit components, checking connections & generating rectified code... Please wait...</b>";
        }

        const promptText = `
        You are an expert hardware engineer and microcontroller developer. Perform a detailed analysis of this image:

        1. Check if the image contains an electronic circuit, PCB, microcontroller setup (Arduino/ESP32/Raspberry Pi), or electrical schematic.
        2. If it is NOT an electronic circuit, output ONLY:
           "❌ Invalid Image: This does not appear to be an electronic circuit or PCB diagram. Please upload a clear photo of your circuit setup."
        3. If IT IS a valid circuit:
           - **Identified Components**: List all visible components (sensors, resistors, LEDs, microcontrollers, modules).
           - **Connection & Wiring Analysis**: Identify pin connections and point out any missing components, short circuits, or pinout mistakes.
           - **Code Rectification & Generation**: Provide complete, corrected, ready-to-run code (Arduino C++ or Python) tailored precisely to the visible components and wiring in the image. Include helpful code comments.
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
                    resultDiv.innerHTML = `<b style="color:#ef4444;">API Error: ${data.error.message}</b>`;
                }
                return;
            }

            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const text = data.candidates[0].content.parts[0].text;
                if (resultDiv) {
                    resultDiv.innerHTML = text
                        .replace(/\n/g, "<br>")
                        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
                        .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>");
                }
            }
        } catch (err) {
            console.error(err);
            if (resultDiv) {
                resultDiv.innerHTML = `<b style="color:#ef4444;">Network Error! Check your internet connection or browser console for details.</b>`;
            }
        }
    });
}
