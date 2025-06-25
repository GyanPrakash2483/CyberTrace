import os
from flask import Blueprint, request, jsonify
from webscanner import usernamescanner
import asyncio
import requests
import subprocess
import json

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

@username_api_blueprint.route('/api/maigret', methods=['POST'])
def maigret_scan():
    data = request.get_json()
    username = data.get('username')
    if not username:
        return jsonify({'error': 'Username is required'}), 400
    try:
        # Array of substrings to exclude from profile URLs
        exclude_domains = [
            'wikipedia',
            'yandex',
            'kaskus',
            'bulbagarden',
            'authorstream',
            'diary.ru',
            'picsart',
            'serebii',
            'hashnode',
            'bikeradar',
            'op.gg',
            'livemaster',
        ]
        # Run the maigret command to generate the JSON report
        subprocess.run([
            'maigret', username, '--json', 'simple'
        ], check=True)
        report_path = f'reports/report_{username}_simple.json'
        with open(report_path, 'r', encoding='utf-8') as f:
            result = json.load(f)
        # Filter out profiles whose url contains any substring in exclude_domains
        filtered_profiles = []
        for site, profile in result.items():
            url = profile.get('url_user') or profile.get('url') or ''
            if not any(exclude in url for exclude in exclude_domains):
                filtered_profiles.append({'site': site, 'url': url})
        return jsonify({'username': username, 'profiles': filtered_profiles})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
