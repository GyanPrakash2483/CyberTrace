import os
import requests
from flask import Blueprint, request, jsonify
from webscanner import emailscanner
import asyncio
import json
import subprocess
import os

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

@email_api_blueprint.route('/api/email-scan', methods=['POST'])
def email_scan():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    scan_results = asyncio.run(emailscanner.email_scanner(email))
    return jsonify({'email': email, 'scanResults': scan_results})

def getGhuntResults(email: str):
    # Run the ghunt command to output JSON to out.json
    out_file = 'out.json'
    try:
        subprocess.run([
            'ghunt', 'email', email, '--json', out_file
        ], check=True)
        with open(out_file, 'r', encoding='utf-8') as f:
            result = f.read()
        # Optionally, clean up the file
        os.remove(out_file)
        return result
    except Exception as e:
        return '{}'

@email_api_blueprint.route('/api/ghunt', methods=['POST'])
def ghunt_lookup():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400
    # Assume getGhutResults exists and returns a JSON string
    try:
        result_json = getGhuntResults(email)
        result = json.loads(result_json)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500 