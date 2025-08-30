const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Helper function to process the input data
function processData(data) {
    const evenNumbers = [];
    const oddNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    
    // Process each item in the data array
    data.forEach(item => {
        // Check if it's a number
        if (!isNaN(item) && !isNaN(parseFloat(item))) {
            const num = parseInt(item);
            sum += num;
            
            if (num % 2 === 0) {
                evenNumbers.push(item); // Keep as string
            } else {
                oddNumbers.push(item); // Keep as string
            }
        }
        // Check if it's alphabetic
        else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
        }
        // Everything else is a special character
        else {
            specialCharacters.push(item);
        }
    });
    
    return {
        evenNumbers,
        oddNumbers,
        alphabets,
        specialCharacters,
        sum: sum.toString() // Return sum as string
    };
}

// Helper function to create concatenated string with alternating caps
function createConcatString(alphabets) {
    // Extract all individual characters from alphabets
    let allChars = [];
    alphabets.forEach(item => {
        allChars.push(...item.split(''));
    });
    
    // Reverse the order
    allChars.reverse();
    
    let result = '';
    allChars.forEach((char, index) => {
        if (index % 2 === 0) {
            result += char.toUpperCase(); 
        } else {
            result += char.toLowerCase(); 
        }
    });
    
    return result;
}

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: 'data' must be an array"
            });
        }
        
        // Process the data
        const processed = processData(data);
        
        // Create concatenated string
        const concatString = createConcatString(processed.alphabets);
        
        // Response object
        const response = {
            is_success: true,
            user_id: "riya22BCE10847", 
            email: "riyabenbhaveshkumarpatel2022@vitbhopal.ac.in", 
            roll_number: "22BCE10847", 
            odd_numbers: processed.oddNumbers,
            even_numbers: processed.evenNumbers,
            alphabets: processed.alphabets,
            special_characters: processed.specialCharacters,
            sum: processed.sum,
            concat_string: concatString
        };
        
        res.status(200).json(response);
        
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET /bfhl endpoint (optional, for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// HTML test page for user input
app.get('/', (req, res) => {
    const testPageHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BFHL API Test Page</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            .container { 
                max-width: 1000px; 
                margin: 0 auto; 
                background: white; 
                padding: 30px; 
                border-radius: 15px; 
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            h1 { color: #333; text-align: center; margin-bottom: 30px; font-size: 2.5em; }
            .api-info { background: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 25px; }
            .input-section, .output-section { margin: 25px 0; }
            label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
            textarea { 
                width: 100%; 
                padding: 15px; 
                border: 2px solid #ddd; 
                border-radius: 8px; 
                font-family: 'Courier New', monospace; 
                font-size: 14px;
                resize: vertical;
            }
            button { 
                background: linear-gradient(45deg, #667eea, #764ba2); 
                color: white; 
                padding: 15px 30px; 
                border: none; 
                border-radius: 8px; 
                font-size: 16px; 
                cursor: pointer; 
                margin: 10px 0;
                transition: transform 0.2s;
            }
            button:hover { transform: translateY(-2px); }
            .response { 
                background: #f8f9fa; 
                padding: 20px; 
                border-radius: 8px; 
                border-left: 4px solid #28a745;
                white-space: pre-wrap;
                font-family: 'Courier New', monospace;
            }
            .error { border-left-color: #dc3545; background: #fff5f5; }
            .examples { display: flex; gap: 10px; flex-wrap: wrap; margin: 10px 0; }
            .example-btn { 
                background: #6c757d; 
                padding: 8px 15px; 
                font-size: 12px;
            }
            .loader { display: none; text-align: center; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>BFHL API Test Interface</h1>

            <div class="input-section">
                <label for="jsonInput">Enter JSON Request (modify the data array):</label>
                <textarea id="jsonInput" rows="6" placeholder='{"data": ["a","1","334","4","R", "$"]}'>{
  "data": ["a","1","334","4","R", "$"]
}</textarea>
                
                <div class="examples">
                    <button class="example-btn" onclick="loadExample('A')">Example A</button>
                    <button class="example-btn" onclick="loadExample('B')">Example B</button>
                    <button class="example-btn" onclick="loadExample('C')">Example C</button>
                    <button class="example-btn" onclick="clearInput()">Clear</button>
                </div>
                
                <button onclick="testAPI()">Test API</button>
                <div class="loader" id="loader">Processing...</div>
            </div>

            <div class="output-section">
                <label>API Response:</label>
                <div id="response" class="response">Click "Test API" to see the response...</div>
            </div>
        </div>

        <script>
            const examples = {
                'A': '{"data": ["a","1","334","4","R", "$"]}',
                'B': '{"data": ["2","a", "y", "4", "&", "-", "*", "5","92","b"]}',
                'C': '{"data": ["A","ABcD","DOE"]}'
            };

            function loadExample(type) {
                document.getElementById('jsonInput').value = JSON.stringify(JSON.parse(examples[type]), null, 2);
            }

            function clearInput() {
                document.getElementById('jsonInput').value = '';
            }

            async function testAPI() {
                const inputElement = document.getElementById('jsonInput');
                const responseElement = document.getElementById('response');
                const loader = document.getElementById('loader');
                
                try {
                    // Show loader
                    loader.style.display = 'block';
                    responseElement.className = 'response';
                    responseElement.textContent = 'Processing...';
                    
                    // Parse input JSON
                    const inputData = JSON.parse(inputElement.value);
                    
                    // Make API call
                    const response = await fetch('/bfhl', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(inputData)
                    });
                    
                    const result = await response.json();
                    
                    // Display formatted response
                    responseElement.textContent = JSON.stringify(result, null, 2);
                    responseElement.className = 'response';
                    
                } catch (error) {
                    responseElement.textContent = 'Error: ' + error.message + '\\n\\nPlease check your JSON format.';
                    responseElement.className = 'response error';
                } finally {
                    loader.style.display = 'none';
                }
            }

            // Load Example A by default
            window.onload = function() {
                loadExample('A');
            };
        </script>
    </body>
    </html>
    `;
    
    res.send(testPageHTML);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        is_success: false,
        error: "Something went wrong!"
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        is_success: false,
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;