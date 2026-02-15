# Excel File Upload Application

A simple full-stack web application for uploading Excel files, built with React (JavaScript) on the frontend and Node.js/Express on the backend.

## Features

- Clean and minimal user interface
- Upload Excel files (.xlsx and .xls)
- Real-time file validation
- File size display
- Success/error notifications
- Responsive design with light/dark mode support

## Project Structure

```
project/
├── src/                    # Frontend React application
│   ├── App.jsx            # Main React component with file upload logic
│   ├── App.css            # Styling for the upload interface
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── backend/               # Backend Node.js/Express server
│   ├── server.js          # Express server with Multer file upload
│   ├── package.json       # Backend dependencies
│   └── uploads/           # Folder for uploaded files (created automatically)
├── package.json           # Frontend dependencies
└── README.md             # This file
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation

### 1. Install Frontend Dependencies

In the project root directory, run:

```bash
npm install
```

### 2. Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
cd ..
```

## Running the Application

You need to run both the frontend and backend servers simultaneously.

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

The backend server will start on **http://localhost:3001**

You should see: `✅ Backend server is running on http://localhost:3001`

### Step 2: Start the Frontend Server

Open a **new terminal** (keep the backend running) and run:

```bash
npm run dev
```

The frontend will start on **http://localhost:5173** (or similar)

### Step 3: Open in Browser

Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

## How to Use

1. Click on the **file upload area** (with the folder icon)
2. Select an Excel file (.xlsx or .xls) from your computer
3. The selected file name and size will be displayed
4. Click the **Send** button to upload the file
5. You'll see a success alert when the upload is complete
6. Uploaded files are saved in the `backend/uploads/` folder

## API Endpoints

### POST /upload

Uploads an Excel file to the server.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (Excel file)

**Response:**
```json
{
  "success": true,
  "message": "File uploaded successfully!",
  "filename": "1234567890-example.xlsx",
  "originalName": "example.xlsx",
  "size": 12345
}
```

## Technologies Used

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web application framework
- **Multer** - Middleware for handling file uploads
- **CORS** - Enable cross-origin requests

## File Upload Configuration

- **Accepted formats:** .xlsx, .xls
- **Maximum file size:** 10 MB
- **Storage location:** `backend/uploads/`
- **Filename format:** `timestamp-random-originalname`

## Development

### Frontend Development

The frontend uses Vite's hot module replacement (HMR) for instant updates during development.

### Backend Development

For auto-restart on file changes, you can use nodemon:

```bash
cd backend
npm run dev
```

## Troubleshooting

### Backend server won't start
- Make sure port 3001 is not already in use
- Check that all backend dependencies are installed

### Frontend can't connect to backend
- Verify the backend server is running on port 3001
- Check for CORS errors in the browser console

### File upload fails
- Ensure the file is a valid Excel format (.xlsx or .xls)
- Check that the file size is under 10 MB
- Verify the backend uploads folder has write permissions

## Notes

- The `uploads/` folder is automatically created when the backend starts
- Uploaded files are stored with unique names to prevent conflicts
- The application supports both light and dark color schemes
