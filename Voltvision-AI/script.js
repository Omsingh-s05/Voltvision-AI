<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VoltVision AI</title>
    <style>
        body { font-family: Arial, sans-serif; background: #0f172a; color: white; text-align: center; padding: 20px; }
        .box { max-width: 500px; margin: auto; background: #1e293b; padding: 20px; border-radius: 10px; }
        input[type="file"] { margin: 15px 0; background: #334155; padding: 10px; border-radius: 5px; color: white; width: 90%; }
        #imagePreview { max-width: 100%; height: auto; border-radius: 8px; margin: 15px 0; display: none; }
        button { background: #10b981; color: white; border: none; padding: 12px 20px; font-size: 16px; border-radius: 5px; cursor: pointer; width: 100%; }
        #result { margin-top: 20px; text-align: left; background: #0f172a; padding: 15px; border-radius: 5px; min-height: 50px; }
    </style>
</head>
<body>

    <div class="box">
        <h2>⚡ VoltVision AI</h2>
        <p>Select a circuit image to analyze</p>
        
        <input type="file" id="imageInput" accept="image/*">
        
        <img id="imagePreview" alt="Preview Image">
        
        <button id="analyzeBtn">Analyze Circuit</button>
        
        <div id="result">Results will appear here...</div>
    </div>

    <script src="script.js"></script>
</body>
</html>
