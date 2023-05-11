import { test, expect } from '@playwright/test';

test.describe('test', () => {

    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });

test('Catalog', async ({ page }) => {
    await page.goto('https://portal-test.goya.com/oms2/#/home');
    //Add assertions to check element
    await expect(page.getByPlaceholder('Username')).toHaveCount(1);
    await expect(page.getByPlaceholder('Password')).toHaveCount(1);
    await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();
    //await page.goto('https://portal-test.goya.com/oms2/#/login');
    await page.getByPlaceholder('Username').fill('013506');
    await page.getByPlaceholder('Password').fill('Pwd@013506');
    await page.getByRole('button', { name: 'Login' }).click();
    //Add assertions to verify the URL of the home page .
    await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');
    await expect(page.getByRole('button', { name: 'Customers', exact: true })).toBeEnabled();
    await page.getByRole('button', { name: 'Customers', exact: true }).click();
    //Add assertions to verify the URL of the Order-Entry page.
    await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/customer-details');
    await expect(page.getByRole('textbox', { name: 'Search Customer', exact: true})).toBeEnabled
    await page.getByRole('textbox', { name: 'Search Customer', exact: true }).click();
    await page.getByRole('textbox', { name: 'Search Customer' }).fill('701631');
    await page.getByRole('row', { name: '701631 RUMBA CUBANA (JC) A $490.29 Customer Statement Preview' }).getByRole('radio').check();
    await page.getByRole('row', { name: '701631 RUMBA CUBANA (JC) A $490.29 Customer Statement Preview' }).getByRole('radio').press('ScrollLock');
    await page.getByRole('button', { name: 'Select' }).click();
    await page.getByRole('button', { name: 'Proceed' }).click();
    //Add assertions to verify the URL of the home page .
    await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');
    await expect(page.getByRole('button', {name: 'Catalog', exact: true})).toBeEnabled
    await page.getByRole('button', { name: 'Catalog' }).click();
    await page.waitForTimeout(16000)
    await page.screenshot({ path: "Catalog.png", fullPage: true })
    await page.locator('div:nth-child(4) > .addtocart > .btn').click();
    await page.screenshot({ path: "Catalog Item1.png", fullPage: true })
    await page.getByRole('button', { name: 'Add To Cart', exact: true }).click();
    await page.locator('div:nth-child(5) > .addtocart > .btn').click();
    await page.screenshot({ path: "Catalog Item2.png", fullPage: true })
    
    await page.getByRole('button', { name: 'Add To Cart', exact: true }).click();
    await page.waitForTimeout(1000)
    await page.screenshot({ path: "Catalog Cart.png", fullPage: true })
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.waitForTimeout(1000)
       
    
    await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
    await page.getByRole('button', { name: '013506-CARLOS MORATO' }).press('ScrollLock');
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.goto('https://portal-test.goya.com/oms2/#/login');
});
})




