import os
import requests
from flask import Blueprint, request, jsonify

email_api_blueprint = Blueprint('email_api', __name__)

HUNTER_API_KEY = os.getenv('HUNTER_API_KEY')
HUNTER_API_URL = 'https://api.hunter.io/v2/email-verifier'

@email_api_blueprint.route('/api/email-lookup', methods=['POST'])
def email_lookup():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    params = {
        'email': email,
        'api_key': HUNTER_API_KEY
    }
    try:
        response = requests.get(HUNTER_API_URL, params=params, timeout=10)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500 