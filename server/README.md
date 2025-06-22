# CyberTrace Backend

A basic Flask backend server with request logging and health monitoring.

## Features

- Request/response logging to console
- Health check endpoint (`/health`)
- Root endpoint with API information
- Debug mode enabled for development

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /
Root endpoint that returns API information.

**Response:**
```json
{
  "message": "CyberTrace Backend API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "root": "/"
  }
}
```

### GET /health
Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000000",
  "service": "CyberTrace Backend"
}
```

## Logging

All requests and responses are logged to the console with timestamps and detailed information including:
- Request method and URL
- Request headers
- Request body (if present)
- Response status code 