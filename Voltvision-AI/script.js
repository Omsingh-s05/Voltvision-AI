// 1. API Key
const GEMINI_API_KEY = "AQ.Ab8RN6Le-Hyq8xkB0lcf0vHZWvyqOgg4oKh_GAJ2mQXZkxLCrg";

// 2. DOM Elements
const imageInput = document.getElementById("imageInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const imagePreview = document.getElementById("imagePreview");
const resultDiv = document.getElementById("result");

let base64Image = "";

// 3. Image Selection & Preview
imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = "block";
            base64Image = event.target.result.split(",")[1];
        };
        reader.readAsDataURL(file);
    }
});

// 4. Gemini API Call
analyzeBtn.addEventListener("click", async () => {
    if (!base64Image) {
        alert("Pehle koi image upload karein!");
        return;
    }

    resultDiv.innerHTML = "🔍 Image analyze ho rahi hai... Kripya wait karein.";

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
        // Naya Working Endpoint
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
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
            resultDiv.innerHTML = `<span style="color:red;">API Error: ${data.error.message}</span>`;
            return;
        }

        const aiResponse = data.candidates[0].content.parts[0].text;
        resultDiv.innerHTML = aiResponse.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

    } catch (error) {
        console.error(error);
        resultDiv.innerHTML = `<span style="color:red;">Connection Error! Check console (F12) for details.</span>`;
    }
});
