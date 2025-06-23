from playwright.async_api import async_playwright

async def isUsernameValid(username: str) -> bool:
    print(f"[reddit]: Querying username: {username}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto(f"https://reddit.com/user/{username}")
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "Post karma" in content:
                return True
            else:
                return False
        except Exception as e:
            return False
    
async def isEmailValid(email: str) -> bool:
    print(f"[reddit]: Querying email: {email}")
    return False # No reliable way to determine.

async def isPhoneValid(phone: str) -> bool:
    print(f"[reddit]: Querying phone: {phone}")
    return False # No phone no. on reddit