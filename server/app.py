from flask import Flask, request, jsonify
import logging
from datetime import datetime
import sys
from dotenv import load_dotenv
import os
from email_api import email_api_blueprint
from phone_api import phone_api_blueprint
from username_api import username_api_blueprint
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load environment variables from .env file
load_dotenv()


# Register blueprints
app.register_blueprint(email_api_blueprint)
app.register_blueprint(phone_api_blueprint)
app.register_blueprint(username_api_blueprint)

@app.before_request
def log_request_info():
    """Log all incoming requests"""
    logger.info(f"Request: {request.method} {request.url}")
    logger.info(f"Headers: {dict(request.headers)}")
    if request.data:
        logger.info(f"Body: {request.data.decode('utf-8')}")

@app.after_request
def log_response_info(response):
    """Log all outgoing responses"""
    logger.info(f"Response: {response.status_code} {response.status}")
    return response

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'CyberTrace Backend'
    }), 200

@app.route('/', methods=['GET'])
def root():
    """Root endpoint"""
    return jsonify({
        'message': 'CyberTrace Backend API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/health',
            'root': '/'
        }
    }), 200

if __name__ == '__main__':
    logger.info("Starting CyberTrace Backend Server...")
    app.run(debug=True, host='0.0.0.0', port=5000) 