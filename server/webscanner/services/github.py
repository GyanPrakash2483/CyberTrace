import requests
from playwright.async_api import async_playwright

async def isUsernameValid(username: str) -> bool:
    print(f"[github]: Querying username: {username}")
    url = f'https://github.com/{username}'
    try:
        response = requests.get(url, timeout=10)
        if response.ok:
            return True
        else:
            return False
    except requests.RequestException as e:
        return False
    
async def isEmailValid(email: str) -> bool:
    print(f"[github]: Querying email: {email}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://github.com/signup")
            await page.fill('input[id="email"]', email)
            await page.fill('input[id="password"]', '')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "The email you have provided is already associated with an account" in content:
                return True
            else:
                return False
        except Exception as e:
            return False

async def isMobileValid(mobile: str) -> bool:
    print(f"[github]: Querying mobile: {mobile}")
    return False # No mobile no. on github