const { test, expect } = require('@playwright/test');
test('TC 10.0.002 - การแก้ไขโปรไฟล์โดยไม่กรอกชื่อ', async ({ page }) => {
  await page.goto('https://moodlocationproject.vercel.app/login');
  await page.getByPlaceholder('your@email.com').fill('664259023@webmail.npru.ac.th');
  await page.locator('input[type="password"]').fill('111111');
  await page.click('button[type="submit"]');
  await page.locator('button, a').filter({ hasText: 'โปรไฟล์' }).click();
  await page.locator('button').filter({ hasText: 'แก้ไขโปรไฟล์' }).click();
  await page.locator('input').first().fill(''); 
  await page.locator('button').filter({ hasText: /บันทึก|Save/ }).click();
  await expect(page.locator('body')).toContainText('กรุณากรอกชื่อ');
  await page.screenshot({ path: 'evidence/TC_10_0_002.png', fullPage: true });
});