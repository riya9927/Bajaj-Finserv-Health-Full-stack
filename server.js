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
    
    // Apply alternating caps
    let result = '';
    allChars.forEach((char, index) => {
        if (index % 2 === 0) {
            result += char.toLowerCase();
        } else {
            result += char.toUpperCase();
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
        
        // ⚠️ IMPORTANT: UPDATE THESE VALUES WITH YOUR DETAILS
        const response = {
            is_success: true,
            user_id: "riya9927", // ← CHANGE THIS: your_name_ddmmyyyy
            email: "riyabpatel1102@gmail.com", // ← CHANGE THIS: your actual email
            roll_number: "22BCE10847", // ← CHANGE THIS: your roll number
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

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: "BFHL API is running",
        endpoints: {
            post: "/bfhl",
            get: "/bfhl"
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;