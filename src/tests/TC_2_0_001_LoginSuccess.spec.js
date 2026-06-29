require('../Hooks/testResultHook');
const { test, expect } = require('@playwright/test');

test('TC 2.0.001 - เข้าสู่ระบบสำเร็จ', async ({ page }) => {
  await page.goto('https://moodlocation.vercel.app/login');
  await page.getByPlaceholder('your@email.com').fill('664259023@webmail.npru.ac.th');
  await page.locator('input[type="password"]').fill('111111');
  await page.click('button[type="submit"]');

 const successToast = page.getByText(/เข้าสู่ระบบเรียบร้อยแล้ว|เข้าสู่ระบบแล้ว|/).first();
  
  await expect(successToast).toBeVisible({ timeout: 15000 });
await page.waitForTimeout(1000);
  await page.screenshot({
  path: 'evidence/TC_2_0_001_LoginSuccess.png',
  fullPage: true
});
});