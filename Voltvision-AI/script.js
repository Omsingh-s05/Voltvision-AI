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
    imageInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (imagePreview) {
                    imagePreview.src = event.target.result;
                    imagePreview.style.display = "block";
                }
                base64Image = event.target.result.split(",")[1];
            };
            reader.readAsDataURL(file);
        }
    });
}

// 4. Gemini API Call
if (analyzeBtn) {
    analyzeBtn.addEventListener("click", async () => {
        if (!base64Image) {
            alert("Pehle koi image upload karein!");
            return;
        }

        if (resultDiv) {
            resultDiv.innerHTML = "🔍 Image analyze ho rahi hai... Kripya wait karein.";
        }

        const promptText = `
        Analyze this image carefully.
        1. Check if the image shows an electronic circuit, PCB, schematic, or electrical diagram.
        2. If it is NOT an electronic circuit (e.g., cartoon, human, animal, scenery, anime character like Pikachu, etc.), strictly output ONLY:
           "❌ This is not an electronic circuit image. Please upload a valid circuit or PCB photo."
        3. If it IS a valid electronic circuit, identify the visible components and list them neatly with a brief description.
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
                    resultDiv.innerHTML = aiResponse.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
                }
            }
        } catch (error) {
            console.error(error);
            if (resultDiv) {
                resultDiv.innerHTML = `<span style="color:red;">Connection Error! Internet connection check karein.</span>`;
            }
        }
    });
}
