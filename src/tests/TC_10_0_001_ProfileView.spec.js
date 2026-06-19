const { test, expect } = require('@playwright/test');
test('TC 10.0.001 - การเข้าสู่หน้าโปรไฟล์สำเร็จ', async ({ page }) => {
  await page.goto('https://moodlocationproject.vercel.app/login');
  await page.getByPlaceholder('your@email.com').fill('664259023@webmail.npru.ac.th');
  await page.locator('input[type="password"]').fill('111111');
  await page.click('button[type="submit"]');
  await page.locator('button, a').filter({ hasText: 'โปรไฟล์' }).filter({ visible: true }).first().click();
  await expect(page.locator('body')).toContainText(/ข้อมูลส่วนตัว|โปรไฟล์/);
  await page.screenshot({ path: 'evidence/TC_10_0_001.png', fullPage: true });
});