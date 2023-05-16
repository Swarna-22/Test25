import { test, expect } from '@playwright/test'

test.describe('test', () => {

    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();

    });
    test('Login into the GOYA OMS', async () => {

        await page.goto('https://portal-test.goya.com/oms2/#/home')
        //Add assertions to check element
        await expect(page.getByPlaceholder('Username')).toHaveCount(1);
        await expect(page.getByPlaceholder('Password')).toHaveCount(1);
        await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

        await page.getByPlaceholder('Username').fill('013506');
        await page.getByPlaceholder('Password').fill('Pwd@013506');
        await page.getByRole('button', { name: 'Login' }).click();
        //Add assertions to verify the URL of the home page .
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');

    })

   const demotestdata = [{ name: 'item1', item: '1158' }, { name: 'item2', item: '1159' }, { name: 'item3', item: '1186' },
   { name: 'item4', item: '1190' },{ name: 'item4', item: '1191' },{ name: 'item5', item: '1103' },{ name: 'item6', item: '1105' },
   { name: 'item7', item: '1107' },{ name: 'item8', item: '1108' }];
   




    test('Create Order', async () => {

        //Add assertions to verify the Order button

        await expect(page.getByRole('button', { name: 'Order', exact: true })).toBeEnabled();
        await page.getByRole('button', { name: 'Order', exact: true }).click();
        //Add assertions to verify the URL of the Order-Entry page.
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/order-entry');
        await page.locator('#pickUp').check();
        await page.screenshot({ path: "pinkscreen.png", fullPage: true })
        await page.locator('#qk-remove-space div').filter({ hasText: 'Select Customer' }).nth(3).click();
        await page.getByText('770461-EDGEWATER WINE & SPIRITS').click();
        await page.getByRole('textbox', { name: 'Amount' }).click();
        console.log(demotestdata.length)

        for (const index of demotestdata) {
            console.log(index.item)
            await page.getByRole('textbox', { name: 'Item / UPC#' }).fill(index.item);
            await page.getByPlaceholder('Cases').fill('6');
            await page.getByRole('button', { name: 'Add' }).click();
            await page.waitForTimeout(3000);
        }
        await page.waitForTimeout(9000);
        await page.screenshot({ path: "EOR.png", fullPage: true })


        //Add assertions to verify the Submit button
        await expect(page.getByRole('button', { name: 'Submit', exact: true })).toBeEnabled();
        await page.getByRole('button', { name: 'Submit' }).click();
        
        
        
        await page.waitForTimeout(2000);
        if (await page.getByRole('button', { name: 'Continue Without Merge' }).isVisible()){
            await page.getByRole('button', { name: 'Continue Without Merge' }).click();
           

        }
        await page.waitForTimeout(2000);
        
        

        if (await page.getByRole('checkbox').nth(3).isVisible()) {
            await page.getByRole('checkbox').nth(3).check();


        }

        if (await page.getByRole('checkbox').nth(4).isVisible()) {
            await page.getByRole('checkbox').nth(4).check();

        }


        await page.locator('#duplicateOrderModalPopup').getByRole('button', { name: 'Submit' }).click();

        await page.waitForTimeout(1000);
        page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.dismiss().catch(() => { });


        })


    })

    test('logout', async () => {
        await page.goto('https://portal-test.goya.com/oms2/#/home')
        await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
        //Add assertion to verify that after logout we are getting back to the login screen.
        await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/login');
        //await page.close();


    })



});