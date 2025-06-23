from playwright.async_api import async_playwright

async def isUsernameValid(username: str) -> bool:
    print(f"[instagram]: Querying username: {username}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://www.instagram.com/accounts/password/reset")
            await page.fill('input[name="cppEmailOrUsername"]', username)
            await page.click('div[role="button"]')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "We sent an email" in content:
                return True
            else:
                return False
        except Exception as e:
            return False
    
async def isEmailValid(email: str) -> bool:
    print(f"[instagram]: Querying email: {email}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://www.instagram.com/accounts/password/reset")
            await page.fill('input[name="cppEmailOrUsername"]', email)
            await page.click('div[role="button"]')
            await page.wait_for_timeout(4000)
            content = await page.content()
            
            await browser.close()

            if "We sent an email" in content:
                return True
            else:
                return False
        except Exception as e:
            return False

async def isPhoneValid(phone: str) -> bool:
    print(f"[instagram]: Querying phone: {phone}")
    phone = phone[-10:]

    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://www.instagram.com/accounts/password/reset")
            await page.fill('input[name="cppEmailOrUsername"]', phone)
            await page.click('div[role="button"]')
            await page.wait_for_timeout(8000)
            content = await page.content()
            
            await browser.close()

            if "We sent an email" in content or "Confirm it's you" in content:
                return True
            else:
                return False
        except Exception as e:
            return False