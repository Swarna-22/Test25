import { test, expect } from '@playwright/test';

test.describe('test', () => {

    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });

    test('Login to Goya OMS', async () => {
        await page.goto('https://portal-test.goya.com/oms2/#/home');
        //Add assertions to check element
        await expect(page.getByPlaceholder('Username')).toHaveCount(1);
        await expect(page.getByPlaceholder('Password')).toHaveCount(1);
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

        await page.getByPlaceholder('Username').fill('013506');
        await page.getByPlaceholder('Password').fill('Pwd@013506');
        await page.getByRole('button', { name: 'Login' }).click();
    })

    //test

    test('Select Customer In Catalog', async () => {
        await page.getByRole('button', { name: 'Catalog' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('row', { name: '701631 RUMBA CUBANA (JC) A $490.29 Customer Statement Preview' }).getByRole('radio').check();
        await page.getByRole('button', { name: 'Select' }).click();
        await page.getByRole('button', { name: 'Proceed' }).click();
    })


    test('Add Items Into The Cart', async () => {

        await page.waitForTimeout(10000);

        await page.getByRole('button', { name: 'Catalog' }).click();
        //await page.pause();
        
        await expect(page.getByRole('button', { name: 'Add to Cart', exact: true })).toBeEnabled();
        await page.locator('div').filter({ hasText: '1103 04133101103 1103 EXTRA VIRGIN OLIVE OIL 3 OZ (3 OZ) Add to Cart $67.50' }).getByRole('button', { name: 'Add to Cart' }).click();
        // await page.waitForTimeout(5000);
        await page.getByRole('button', { name: '+' }).click();
        await page.getByRole('button', { name: 'Add To Cart', exact: true }).click();
    })



});