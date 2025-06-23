from playwright.async_api import async_playwright

async def isUsernameValid(username: str) -> bool:
    print(f"[flipkart]: Querying username: {username}")
    return False # No username on amazon
    
async def isEmailValid(email: str) -> bool:
    print(f"[flipkart]: Querying email: {email}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://www.flipkart.com/account/login")
            await page.fill('input[class="r4vIwl BV+Dqf"]', email)
            await page.click('button[class="QqFHMw twnTnD _7Pd1Fp"]')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "Please enter the OTP sent to" in content:
                return True
            else:
                return False
        except Exception as e:
            return False

async def isMobileValid(mobile: str) -> bool:
    print(f"[flipkart]: Querying mobile: {mobile}")
    mobile = mobile[-10:]

    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://www.flipkart.com/account/login")
            await page.fill('input[class="r4vIwl BV+Dqf"]', mobile)
            await page.click('button[class="QqFHMw twnTnD _7Pd1Fp"]')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "Please enter the OTP sent to" in content:
                return True
            else:
                return False
        except Exception as e:
            return False