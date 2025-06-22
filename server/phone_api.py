import os
import requests
from flask import Blueprint, request, jsonify

phone_api_blueprint = Blueprint('phone_api', __name__)

NUMVERIFY_API_KEY = os.getenv('NUMVERIFY_API_KEY')
NUMVERIFY_API_URL = 'http://apilayer.net/api/validate'

@phone_api_blueprint.route('/api/phone-lookup', methods=['POST'])
def phone_lookup():
    data = request.get_json()
    phone = data.get('phone')
    if not phone:
        return jsonify({'error': 'Phone number is required'}), 400
    params = {
        'access_key': NUMVERIFY_API_KEY,
        'number': phone
    }
    try:
        response = requests.get(NUMVERIFY_API_URL, params=params, timeout=10)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500 