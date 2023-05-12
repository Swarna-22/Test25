import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {

  await page.goto('https://portal-test.goya.com/oms2/#/home');
  //Add assertions to check element
  await expect(page.getByPlaceholder('Username')).toHaveCount(1);
  await expect(page.getByPlaceholder('Password')).toHaveCount(1);
  await expect(page.getByRole('button', { name: 'Login' })).toBeEnabled();

  await page.getByPlaceholder('Username').fill('013506');
  await page.getByPlaceholder('Password').fill('Pwd@013506');
  await page.getByRole('button', { name: 'Login' }).click();
})

test.afterAll(async ({ page }) => {
  await page.close()
})

test('homepage', async ({ page }) => {

  //Add assertions to verify the URL of the home page and the Order button.
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/home');
  await expect(page.getByRole('button', { name: 'Order',exact: true })).toBeEnabled();

  await page.getByRole('button', { name: 'Order', exact: true }).click();
  //Add assertions to verify the URL of the Order-Entry page.
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/order-entry');

  //await page.locator('#qk-remove-space div').filter({ hasText: 'Select Customer' }).nth(3).click();
  await page.getByRole('option', { name: '712450-SHOP RITE 130' }).locator('div').filter({ hasText: '712450-SHOP RITE 130' }).click();
  await page.locator('select[name="department"]').selectOption('2');
  await page.getByRole('textbox', { name: 'Item / UPC#' }).click();
  await page.getByRole('textbox', { name: 'Item / UPC#' }).fill('2630');
  await page.getByPlaceholder('Cases').fill('2');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('#duplicateOrderModalPopup').getByRole('checkbox').check();
  await page.locator('#duplicateOrderModalPopup').getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Continue Without Merge' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => { });
  });
  await page.locator('#submitonlinemodal').getByRole('button', { name: 'Submit' }).click();
})


test('logout', async ({ page }) => {

  await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();

  //Add assertion to verify that after logout we are getting back to the login screen.
  await expect(page).toHaveURL('https://portal-test.goya.com/oms2/#/login');
})