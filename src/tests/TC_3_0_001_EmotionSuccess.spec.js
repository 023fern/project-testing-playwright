require('../Hooks/testResultHook');
const { test, expect } = require('@playwright/test');

test('TC 3.0.001 - เลือกความรู้สึกสำเร็จ', async ({ page }) => {
  await page.goto('https://moodlocation.vercel.app/login');
  await page.getByPlaceholder('your@email.com').fill('664259023@webmail.npru.ac.th');
  await page.locator('input[type="password"]').fill('111111');
  await page.click('button[type="submit"]');

  // รอ networkidle เพื่อให้มั่นใจว่า API โหลดข้อมูลอารมณ์มาครบก่อนเริ่มกด
  await page.waitForLoadState('networkidle');

  // ใช้ .first() เพื่อเจาะจงปุ่มแรก ป้องกันการไปกดโดนปุ่มชื่อเดียวกันในเมนูอื่น
  await page.locator('button').filter({ hasText: 'มีความสุข' }).filter({ visible: true }).first().click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'evidence/TC_3_0_001_EmotionSuccess.png', fullPage: true });
});