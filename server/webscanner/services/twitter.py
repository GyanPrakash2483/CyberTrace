from playwright.async_api import async_playwright

async def isUsernameValid(username: str) -> bool:
    print(f"[twitter]: Querying username: {username}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto(f"https://x.com/{username}")
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "Joined" in content:
                return True
            else:
                return False
        except Exception as e:
            return False
    
async def isEmailValid(email: str) -> bool:
    print(f"[twitter]: Querying email: {email}")
    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://x.com/i/flow/login")
            await page.fill('input[name="text"]', email)
            await page.click('button[class="css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"]')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "Enter your password" in content:
                return True
            else:
                return False
        except Exception as e:
            return False

async def isPhoneValid(phone: str) -> bool:
    print(f"[twitter]: Querying phone: {phone}")
    phone = phone[-10:]

    async with async_playwright() as p:
        browser = await p.firefox.launch(headless=True)
        page = await browser.new_page()
        try:
            await page.goto("https://x.com/i/flow/login")
            await page.fill('input[name="text"]', phone)
            await page.click('button[class="css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"]')
            await page.wait_for_timeout(4000)
            content = await page.content()

            await browser.close()

            if "Enter your password" in content:
                return True
            else:
                return False
        except Exception as e:
            return False