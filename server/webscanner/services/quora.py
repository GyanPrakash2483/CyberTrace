import asyncio
from playwright.async_api import async_playwright

async def isEmailValid(email):
    print(f"[quora]: Querying email: {email}")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://www.quora.com/")

        # Skip clicking on 'Login' and go directly to email input
        # Click on 'Use email' if visible
        if await page.locator("text=Use email").is_visible():
            await page.locator("text=Use email").click()
            await page.wait_for_timeout(1000)

        # Type the email and press Enter
        await page.locator("input[name='email']").fill(email)
        await page.keyboard.press("Enter")
        await page.wait_for_timeout(3000)

        # Check for error message
        error_text = "No account found for this email. Retry, or Sign up for Quora."
        if await page.locator(f"text={error_text}").is_visible():
            await browser.close()
            return False
        else:
            await browser.close()
            return True


async def isUsernameValid(username: str):
    print(f"[quora]: Querying username: {username}")
    return False

async def isPhoneValid(phone: str):
    print(f"[quora]: Querying phone: {phone}")
    return False