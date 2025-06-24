import requests
from webscanner.services import amazon, flipkart, github, instagram, reddit, twitter

def getGithubProfile(email: str):
    try:
        url = f"https://api.github.com/search/commits?q=author-email:{email}"
        headers = {"Accept": "application/vnd.github.cloak-preview"}
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            data = response.json()
            items = data.get("items", [])
            if items:
                commit_url = items[0]["url"]
                # commit_url example: https://api.github.com/repos/<username>/<repo>/commits/<sha>
                parts = commit_url.split("/repos/")
                if len(parts) > 1:
                    repo_path = parts[1]
                    username = repo_path.split("/")[0]
                    return f"https://github.com/{username}"
        return None
    except Exception:
        return None

async def email_scanner(email: str):
    amazon_account_exist = await amazon.isEmailValid(email)
    flipkart_account_exist = await flipkart.isEmailValid(email)
    github_account_exist = await github.isEmailValid(email)
    instagram_account_exist = await instagram.isEmailValid(email)
    reddit_account_exist = await reddit.isEmailValid(email)
    twitter_account_exist = await twitter.isEmailValid(email)

    return {
        'Amazon': {
            'accountExist': amazon_account_exist
        },
        'Flipkart': {
            'accountExist': flipkart_account_exist
        },
        'Github': {
            'accountExist': github_account_exist,
            'profile': getGithubProfile(email)
        },
        'Instagram': {
            'accountExist': instagram_account_exist
        },
        'Reddit': {
            'accountExist': reddit_account_exist
        },
        'Twitter': {
            'accountExist': twitter_account_exist
        }
    }