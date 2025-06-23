from webscanner.services import amazon, flipkart, github, instagram, reddit, twitter

async def mobile_scanner(mobile: str):
    amazon_account_exist = await amazon.isMobileValid(mobile)
    flipkart_account_exist = await flipkart.isMobileValid(mobile)
    github_account_exist = await github.isMobileValid(mobile)
    instagram_account_exist = await instagram.isPhoneValid(mobile)
    reddit_account_exist = await reddit.isPhoneValid(mobile)
    twitter_account_exist = await twitter.isPhoneValid(mobile)

    return {
        'Amazon': {
            'accountExist': amazon_account_exist
        },
        'Flipkart': {
            'accountExist': flipkart_account_exist
        },
        'Github': {
            'accountExist': github_account_exist
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
