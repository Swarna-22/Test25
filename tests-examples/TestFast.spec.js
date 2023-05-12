import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
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
  await expect(page).toHaveScreenshot()
  await page.getByRole('button', { name: 'Order', exact: true }).click();
  await page.getByRole('searchbox', { name: 'Customer' }).click();
  await page.locator('#qk-remove-space div').filter({ hasText: 'Select Customer' }).nth(3).click();
  await page.getByRole('searchbox', { name: 'Customer' }).click();
  await page.getByRole('option', { name: '712450-SHOP RITE 130' }).locator('div').filter({ hasText: '712450-SHOP RITE 130' }).click();
  await page.locator('select[name="department"]').selectOption('3');
  await page.getByRole('textbox', { name: 'Item / UPC#' }).click();
  await page.getByRole('textbox', { name: 'Item / UPC#' }).fill('2491');
  await page.getByPlaceholder('Cases').fill('2');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator('#duplicateOrderModalPopup').getByRole('checkbox').check();
  await page.locator('#duplicateOrderModalPopup').getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Continue Without Merge' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#submitonlinemodal').getByRole('button', { name: 'Submit' }).click();
});
