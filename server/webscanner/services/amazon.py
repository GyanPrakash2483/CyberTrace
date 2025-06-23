from playwright.async_api import async_playwright

async def isUsernameValid(username: str) -> bool:
    print(f"[amazon]: Querying username: {username}")
    return False # No username on amazon
    
async def isEmailValid(email: str) -> bool:
    print(f"[amazon]: Querying email: {email}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://www.amazon.in/ap/forgotpassword?openid.pape.max_auth_age=900&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0")
            await page.fill('input[id="ap_email"]', email)
            await page.click('input[id="continue"]')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "we have sent the code" in content:
                return True
            else:
                return False
        except Exception as e:
            return False

async def isMobileValid(mobile: str) -> bool:
    print(f"[amazon]: Querying mobile: {mobile}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://www.amazon.in/ap/forgotpassword?openid.pape.max_auth_age=900&openid.assoc_handle=inflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0")
            await page.fill('input[id="ap_email"]', mobile)
            await page.click('input[id="continue"]')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "we have sent the code" in content:
                return True
            else:
                return False
        except Exception as e:
            return False