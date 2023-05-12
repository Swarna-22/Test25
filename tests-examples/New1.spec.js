import { test, expect } from '@playwright/test'

test.describe('test', () => {

    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });

    test('Login', async () => {
        await page.goto('https://portal-test.goya.com/oms2/#/home');
        await page.goto('https://portal-test.goya.com/oms2/#/login');
        await page.getByPlaceholder('Username').click();
        await page.getByPlaceholder('Username').fill('013506');
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').press('CapsLock');
        await page.getByPlaceholder('Password').fill('P');
        await page.getByPlaceholder('Password').press('CapsLock');
        await page.getByPlaceholder('Password').fill('Pwd@013506');
        await page.getByRole('button', { name: 'Login' }).click();
    })


    test('Create Order', async () => {

        await page.getByRole('button', { name: 'Order', exact: true }).click();
        await page.getByRole('searchbox', { name: 'Customer' }).click();
        await page.getByText('712450-SHOP RITE 130').click();
        await page.locator('#pickUp').check();
        await page.getByRole('textbox', { name: 'Amount' }).click();
        await page.getByRole('textbox', { name: 'Amount' }).fill('200');
        await page.getByRole('textbox', { name: 'Item / UPC#' }).click();
        await page.getByRole('textbox', { name: 'Item / UPC#' }).fill('2365');
        await page.getByPlaceholder('Cases').fill('4');

        await page.getByRole('button', { name: 'Add' }).click();
        await page.waitForTimeout(1000);
        await expect(page.getByRole('button', { name: 'Submit', exact: true })).toBeEnabled();
        await page.getByRole('button', { name: 'Submit' }).click();
        await page.locator('#duplicateOrderModalPopup').getByRole('checkbox').check();
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });
        });
        await page.locator('#duplicateOrderModalPopup').getByRole('button', { name: 'Submit' }).click();
    })

    test('Logout', async () => {

        await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        await page.goto('https://portal-test.goya.com/oms2/#/login');
    })




});