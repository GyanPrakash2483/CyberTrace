import urllib.parse
from flask import Blueprint, request, jsonify

def generate_phone_variants(phone):
    variants = set()
    raw = phone.strip().replace(" ", "").replace("-", "")
    
    if raw.startswith("+"):
        number = raw[1:]
        variants.add(raw)
        variants.add(number)
    else:
        number = raw
        variants.add(number)
        variants.add(f"+{number}")
    
    if number.startswith("91") and len(number) > 2:
        variants.add("0" + number[2:])
    
    return list(variants)

# Updated dork templates including username-based patterns
custom_dork_templates = {
    "Instagram": [
        'site:instagram.com intext:"{email}"',
        'site:instagram.com intext:"{phone}"',
        'site:instagram.com inurl:"/p/" intext:"{phone}"',
        'site:instagram.com intitle:"Instagram photo by *" intext:"{email}"',
        'site:instagram.com inurl:"/{username}"'
    ],
    "Facebook": [
        'site:facebook.com intext:"{email}"',
        'site:facebook.com intext:"{phone}"',
    ],
    "Twitter": [
        'site:twitter.com intext:"{email}"',
        'site:twitter.com intext:"{phone}"',
        'site:twitter.com intext:"DM me at {email}"| intext:"DM me at {phone}"',
        'site:twitter.com intext:"reach me on {email}" | intext:"reach me on {phone}"',
        'site:twitter.com/{username}'
    ],
    "LinkedIn": [
        'site:linkedin.com intext:"{email}" | intext:"{phone}"',
        'site:linkedin.com inurl:"in/" intext:"{phone}"',
        'site:linkedin.com {username}'
    ],
    "Amazon": [
        'site:amazon.com intext:"{phone}"',
        'site:amazon.com intext:"customer service" intext:"{phone}"',
        'site:amazon.com intext:"@amazon.com" filetype:csv'
    ],
    "GitHub": [
        'site:github.com intext:"{email}"',
        'site:github.com intext:"{phone}"',
        'site:github.com intext:"contact me at{email}" | intext:"contact me at {phone}"',
        'site:github.com/{username}'
    ],
    "GitLab": [
        'site:gitlab.com intext:"{email}"',
        'site:gitlab.com intext:"{phone}"'
    ],
    "Common": [
        'site:facebook.com | site:twitter.com | site:instagram.com intext:"@gmail.com" | "@yahoo.com" | "@hotmail.com"',
        'site:facebook.com | site:twitter.com | site:instagram.com intext:"phone" | "contact" | "call" | "number"',
        'filetype:xls | filetype:csv intext:"@gmail.com" | "@yahoo.com" | "phone number"',
        'filetype:pdf intext:"{email}"',
        'filetype:csv intext:"{phone}"',
        'filetype:txt intext:"{email}"',
        'intext:"@{email}" site:pastebin.com',
    ]
}

def generate_google_dorks_for_email(email, phone=None, username=None):
    results = []
    if not email:
        return results
    email_domain = email.split('@')[1] if email else None
    for platform, templates in custom_dork_templates.items():
        for template in templates:
            if "{email}" not in template and "{email_domain}" not in template:
                continue
            queries = []
            # Replace all placeholders
            query = template
            if "{email}" in query:
                query = query.replace("{email}", str(email))
            if "{email_domain}" in query and email_domain:
                query = query.replace("{email_domain}", str(email_domain))
            if "{phone}" in query and phone:
                phone_variants = generate_phone_variants(str(phone))
                for variant in phone_variants:
                    q = query.replace("{phone}", str(variant))
                    if "{username}" in q and username:
                        q = q.replace("{username}", str(username))
                    queries.append(q)
                if not phone_variants:
                    if "{username}" in query and username:
                        query = query.replace("{username}", str(username))
                    queries.append(query)
            else:
                if "{username}" in query and username:
                    query = query.replace("{username}", str(username))
                queries.append(query)
            for q in queries:
                url = "https://www.google.com/search?q=" + urllib.parse.quote(q)
                results.append({
                    "platform": platform,
                    "query": q,
                    "url": url
                })
    return results

def generate_google_dorks_for_phone(phone, email=None, username=None):
    results = []
    if not phone:
        return results
    phone_variants = generate_phone_variants(str(phone))
    for platform, templates in custom_dork_templates.items():
        for template in templates:
            if "{phone}" not in template:
                continue
            queries = []
            for variant in phone_variants:
                query = template.replace("{phone}", str(variant))
                if "{email}" in query and email:
                    query = query.replace("{email}", str(email))
                if "{username}" in query and username:
                    query = query.replace("{username}", str(username))
                queries.append(query)
            for q in queries:
                url = "https://www.google.com/search?q=" + urllib.parse.quote(q)
                results.append({
                    "platform": platform,
                    "query": q,
                    "url": url
                })
    return results

def generate_google_dorks_for_username(username, email=None, phone=None):
    results = []
    if not username:
        return results
    for platform, templates in custom_dork_templates.items():
        for template in templates:
            if "{username}" not in template:
                continue
            query = template.replace("{username}", str(username))
            if "{email}" in query and email:
                query = query.replace("{email}", str(email))
            if "{phone}" in query and phone:
                phone_variants = generate_phone_variants(str(phone))
                # Use the first variant for replacement
                query = query.replace("{phone}", str(phone_variants[0]))
            url = "https://www.google.com/search?q=" + urllib.parse.quote(query)
            results.append({
                "platform": platform,
                "query": query,
                "url": url
            })
    return results

dork_api_blueprint = Blueprint('dork_api', __name__)

@dork_api_blueprint.route('/api/dork-lookup', methods=['POST'])
def dork_lookup():
    data = request.get_json()
    email = data.get('email')
    phone = data.get('phone')
    username = data.get('username')
    if not (email or phone or username):
        return jsonify({'error': 'At least one of email, phone, or username is required.'}), 400
    email_dorks = generate_google_dorks_for_email(email, phone, username)
    phone_dorks = generate_google_dorks_for_phone(phone, email, username)
    username_dorks = generate_google_dorks_for_username(username, email, phone)
    return jsonify({
        'email_dorks': email_dorks,
        'phone_dorks': phone_dorks,
        'username_dorks': username_dorks
    })