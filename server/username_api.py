import os
from flask import Blueprint, request, jsonify
from webscanner import usernamescanner
import asyncio
import requests

username_api_blueprint = Blueprint('username_api', __name__)

@username_api_blueprint.route('/api/username-lookup', methods=['POST'])
def username_lookup():
    data = request.get_json()
    username = data.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    results = asyncio.run(usernamescanner.username_scanner(username))
    return jsonify({
        'username': username,
        'status': 'success',
        'results': results
    })
