import asyncio
from playwright.async_api import async_playwright

async def check_quora_email(email):
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
            print(f"[❌] {email} is NOT registered on Quora.")
        else:
            print(f"[✅] {email} appears to be registered on Quora.")

        await browser.close()

# Run the checker
if _name_ == "_main_":
    target_email = input("Enter email to check on Quora: ").strip()
    asyncio.run(check_quora_email(target_email))    