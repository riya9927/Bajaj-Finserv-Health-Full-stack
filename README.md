# BFHL REST API

A REST API built for the VIT Full Stack Challenge that processes an array of mixed data types and returns categorized results with specific formatting requirements.

## 📋 Features

- **Data Categorization**: Separates numbers (even/odd), alphabets, and special characters
- **Number Processing**: Calculates sum of all numeric values
- **String Manipulation**: Creates concatenated string with alternating caps in reverse order
- **Format Compliance**: Returns all numbers as strings as per requirements
- **Error Handling**: Graceful error handling with appropriate HTTP status codes
- **CORS Support**: Enabled for frontend integration

## 🛠 Technology Stack

- **Backend**: Node.js with Express.js
- **Deployment**: Vercel
- **Testing**: Postman
- **Version Control**: Git & GitHub

## 📡 API Endpoints

### POST /bfhl
**Description**: Main endpoint that processes input array and returns categorized data

**Request Format:**
```json
{
  "data": ["a","1","334","4","R", "$"]
}
```

**Response Format:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### GET /bfhl
**Description**: Returns operation code for testing purposes

**Response:**
```json
{
  "operation_code": 1
}
```

## 🧪 Testing with Postman

I have thoroughly tested this API using **Postman** to ensure all requirements are met correctly.

- **Test Case 1: Mixed Data Types**  
  ![App Screenshot](assets/Testcase%201.png)

- **Test Case 2: Multiple Special Characters**  
  ![App Screenshot](assets/Testcase%202.png)

- **Test Case 3: Only Alphabetic Strings**  
  ![App Screenshot](assets/Testcase%203.png)

## 🔧 Installation & Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/bfhl-api.git
   cd bfhl-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:3000`

4. **Test the API:**
   ```bash
   curl -X POST http://localhost:3000/bfhl \
     -H "Content-Type: application/json" \
     -d '{"data": ["a","1","334","4","R", "$"]}'
   ```

## 📁 Project Structure

```
bfhl-api/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── README.md          # Project documentation
├── .gitignore         # Git ignore rules
└── tests/
    └── api.rest       # REST client test file
```

## 🌐 Deployment

This API is deployed on **Vercel** for optimal performance and reliability.

### Deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🎯 Testing Instructions

### Using Postman:
1. Set method to **POST**
2. Enter URL: `http://localhost:3000/bfhl` (local) or your deployed URL
3. Add header: `Content-Type: application/json`
4. Add raw JSON body: `{"data": ["a","1","334","4","R", "$"]}`
5. Click **Send**
6. Verify response matches expected format
