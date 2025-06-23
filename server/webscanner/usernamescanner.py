from webscanner.services import amazon, flipkart, github, instagram, reddit, twitter

async def username_scanner(username: str):
    amazon_account_exist = await amazon.isUsernameValid(username)
    amazon_profile = None

    flipkart_account_exist = await flipkart.isUsernameValid(username)
    flipkart_profile = None

    github_account_exist = await github.isUsernameValid(username)
    github_profile = f"https://github.com/{username}" if github_account_exist else None

    instagram_account_exist = await instagram.isUsernameValid(username)
    instagram_profile = f"https://instagram.com/{username}/" if instagram_account_exist else None

    reddit_account_exist = await reddit.isUsernameValid(username)
    reddit_profile = f"https://reddit.com/user/{username}" if reddit_account_exist else None

    twitter_account_exist = await twitter.isUsernameValid(username)
    twitter_profile = f"https://x.com/{username}" if twitter_account_exist else None

    return {
        'Amazon': {
            'accountExist': amazon_account_exist,
            'profile': amazon_profile
        },
        'Flipkart': {
            'accountExist': flipkart_account_exist,
            'profile': flipkart_profile
        },
        'Github': {
            'accountExist': github_account_exist,
            'profile': github_profile
        },
        'Instagram': {
            'accountExist': instagram_account_exist,
            'profile': instagram_profile
        },
        'Reddit': {
            'accountExist': reddit_account_exist,
            'profile': reddit_profile
        },
        'Twitter': {
            'accountExist': twitter_account_exist,
            'profile': twitter_profile
        }
    }