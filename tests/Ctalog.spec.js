import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  //await page.goto('https://portal-test.goya.com/oms2/#/home');
  await page.goto('https://portal-test.goya.com/oms2/#/login');
  await page.getByPlaceholder('Username').click();
  await page.getByPlaceholder('Username').fill('013506');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('P');
  await page.getByPlaceholder('Password').press('CapsLock');
  await page.getByPlaceholder('Password').fill('Pwd@013506');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Customers' }).click();
  await page.waitForTimeout(5000)
  await page.getByRole('row', { name: '701631 RUMBA CUBANA (JC) A $490.29 Customer Statement Preview' }).getByRole('radio').check();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('button', { name: 'Catalog' }).click();
  await page.locator('.addtocart > .btn').first().click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: 'Add To Cart', exact: true }).click();
  await page.getByRole('button', { name: '013506-CARLOS MORATO' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.goto('https://portal-test.goya.com/oms2/#/login');
});