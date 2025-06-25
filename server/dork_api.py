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
        'site:facebook.com inurl:"profile.php?id="',
        'site:facebook.com intext:"contact" | intext:"number"',
        'site:facebook.com intext:"@gmail.com" | intext:"@yahoo.com" | intext:"@hotmail.com"'
    ],
    "Twitter": [
        'site:twitter.com intext:"{email}"',
        'site:twitter.com intext:"{phone}"',
        'site:twitter.com intext:"DM me at"',
        'site:twitter.com intext:"reach me on"',
        'site:twitter.com/{username}'
    ],
    "LinkedIn": [
        'site:linkedin.com intext:"{email}" | intext:"{phone}"',
        'site:linkedin.com inurl:"in/" intext:"{phone}"',
        'site:linkedin.com intitle:"* - LinkedIn"',
        'site:linkedin.com intext:"contact" OR "call me" OR "phone"',
        'site:linkedin.com/in/{username}'
    ],
    "Amazon": [
        'site:amazon.com intext:"seller contact"',
        'site:amazon.com intext:"customer service" intext:"phone"',
        'site:amazon.com inurl:"/gp/help/contact"',
        'site:amazon.com intext:"@amazon.com" filetype:csv'
    ],
    "GitHub": [
        'site:github.com intext:"{email}"',
        'site:github.com intext:"{phone}"',
        'site:github.com intext:"contact me at"',
        'site:github.com/{username}'
    ],
    "GitLab": [
        'site:gitlab.com intext:"{email}"',
        'site:gitlab.com intext:"contact" | "email" | "reach out"',
    ],
    "Common": [
        'site:facebook.com | site:twitter.com | site:instagram.com intext:"@gmail.com" | "@yahoo.com" | "@hotmail.com"',
        'site:facebook.com | site:twitter.com | site:instagram.com intext:"phone" | "contact" | "call" | "number"',
        'filetype:xls | filetype:csv intext:"@gmail.com" | "@yahoo.com" | "phone number"',
        'filetype:pdf intext:"{email}"',
        'filetype:csv intext:"{phone}"',
        'filetype:txt intext:"@gmail.com"',
        'filetype:log intext:"password"',
        'intext:"@{email_domain}" site:pastebin.com',
        'intext:"contact" filetype:doc OR filetype:xlsx',
    ]
}

def generate_google_dorks_for_email(email):
    results = []
    if not email:
        return results
    email_domain = email.split('@')[1] if email else None
    for platform, templates in custom_dork_templates.items():
        for template in templates:
            if "{email}" not in template and "{email_domain}" not in template:
                continue
            if "{email}" in template and not email:
                continue
            if "{email_domain}" in template and not email_domain:
                continue
            queries = []
            if "{email}" in template:
                queries.append(template.replace("{email}", str(email)))
            elif "{email_domain}" in template:
                queries.append(template.replace("{email_domain}", str(email_domain)))
            else:
                queries.append(template)
            for query in queries:
                url = "https://www.google.com/search?q=" + urllib.parse.quote(query)
                results.append({
                    "platform": platform,
                    "query": query,
                    "url": url
                })
    return results

def generate_google_dorks_for_phone(phone):
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
                queries.append(template.replace("{phone}", str(variant)))
            for query in queries:
                url = "https://www.google.com/search?q=" + urllib.parse.quote(query)
                results.append({
                    "platform": platform,
                    "query": query,
                    "url": url
                })
    return results

def generate_google_dorks_for_username(username):
    results = []
    if not username:
        return results
    for platform, templates in custom_dork_templates.items():
        for template in templates:
            if "{username}" not in template:
                continue
            query = template.replace("{username}", str(username))
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
    email_dorks = generate_google_dorks_for_email(email)
    phone_dorks = generate_google_dorks_for_phone(phone)
    username_dorks = generate_google_dorks_for_username(username)
    return jsonify({
        'email_dorks': email_dorks,
        'phone_dorks': phone_dorks,
        'username_dorks': username_dorks
    })