from webscanner.services import amazon, flipkart, github, instagram, reddit, twitter

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