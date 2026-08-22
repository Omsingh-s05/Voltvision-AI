async function askAI() {

    const input = document.getElementById("question");
    const chat = document.getElementById("chatArea");

    const question = input.value.trim();

    if (!question) return;

    chat.innerHTML += `
        <div class="bot-message" style="margin:12px 0 12px auto;display:block;width:max-content;">
            ${question}
        </div>
    `;

    input.value = "";

    try {

        const response = await fetch(
            `http://localhost:3000/api/ask?q=${encodeURIComponent(question)}`
        );

        const data = await response.json();

        chat.innerHTML += `
            <div class="bot-message">
                🤖 ${data.answer || data.message || "I received your question!"}
            </div>
        `;

    } catch (error) {

        chat.innerHTML += `
            <div class="bot-message">
                ⚠️ Backend अभी connected नहीं है.
                पहले backend start करना होगा.
            </div>
        `;
    }
}


async function searchCircuit() {

    const input = document.getElementById("circuitInput");

    const title = document.getElementById("circuitTitle");

    const info = document.getElementById("circuitInfo");

    const diagramText = document.getElementById("diagramText");

    const circuit = input.value.trim();

    if (!circuit) {

        alert("Circuit name enter karo!");

        return;
    }

    title.innerText = "Searching...";

    info.innerText = "Finding circuit information...";

    diagramText.innerText = "Searching for a basic diagram...";


    try {

        const response = await fetch(
            `http://localhost:3000/api/circuit?name=${encodeURIComponent(circuit)}`
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        title.innerText = data.name;

        info.innerText = data.info;

        diagramText.innerText =
            data.image
                ? "Diagram found!"
                : "Diagram source will appear here.";

    } catch (error) {

        title.innerText = "Backend not connected";

        info.innerText =
            "Start the VoltVision backend and try again.";

        diagramText.innerText =
            "The circuit search API will work after backend connection.";
    }
}
