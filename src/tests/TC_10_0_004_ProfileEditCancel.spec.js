const { test, expect } = require('@playwright/test');
test('TC 10.0.004 - การยกเลิกการแก้ไขโปรไฟล์', async ({ page }) => {
  await page.goto('https://moodlocationproject.vercel.app/login');
  await page.getByPlaceholder('your@email.com').fill('664259023@webmail.npru.ac.th');
  await page.locator('input[type="password"]').fill('111111');
  await page.click('button[type="submit"]');
  await page.locator('button, a').filter({ hasText: 'โปรไฟล์' }).click();
  await page.locator('button').filter({ hasText: 'แก้ไขโปรไฟล์' }).click();
  await page.locator('input').first().fill('ชื่อที่ไม่ได้เซฟ');
  await page.locator('button').filter({ hasText: /ยกเลิก|Cancel/ }).click();
  await expect(page.locator('body')).not.toContainText('ชื่อที่ไม่ได้เซฟ');
  await page.screenshot({ path: 'evidence/TC_10_0_004.png', fullPage: true });
});