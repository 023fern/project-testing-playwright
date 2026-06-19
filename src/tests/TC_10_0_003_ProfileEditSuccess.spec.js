const { test, expect } = require('@playwright/test');
test('TC 10.0.003 - การแก้ไขโปรไฟล์เฉพาะบางข้อมูล', async ({ page }) => {
  await page.goto('https://moodlocationproject.vercel.app/login');
  await page.getByPlaceholder('your@email.com').fill('664259023@webmail.npru.ac.th');
  await page.locator('input[type="password"]').fill('111111');
  await page.click('button[type="submit"]');
  await page.locator('button, a').filter({ hasText: 'โปรไฟล์' }).click();
  await page.locator('button').filter({ hasText: 'แก้ไขโปรไฟล์' }).click();
  await page.locator('input').nth(1).fill('Mali'); 
  await page.locator('button').filter({ hasText: /บันทึก|Save/ }).click();
  await expect(page.locator('body')).toContainText('Mali');
  await page.screenshot({ path: 'evidence/TC_10_0_003.png', fullPage: true });
});