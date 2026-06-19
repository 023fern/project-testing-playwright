require('../Hooks/testResultHook');
const { test, expect } = require('@playwright/test');

test('TC 6.0.001 - การแสดงรายละเอียดสถานที่สำเร็จ', async ({ page }) => {
  await page.goto('https://moodlocation.vercel.app/login');
  await page.getByPlaceholder('your@email.com').fill('664259023@webmail.npru.ac.th');
  await page.locator('input[type="password"]').fill('111111');
  await page.click('button[type="submit"]');
  await page.waitForLoadState('networkidle');

  // 1. เลือกอารมณ์และหมวดหมู่เพื่อให้เจอรายการสถานที่
  await page.locator('button').filter({ hasText: 'มีความสุข' }).filter({ visible: true }).first().click();
  await page.locator('button').filter({ hasText: /เที่ยว|สวน/ }).filter({ visible: true }).first().click();

  // 2. เลือกสถานที่ (เช่น วัดพระแก้ว ตามที่ระบุใน PDF)
  const placeCard = page.locator('div, h2').filter({ hasText: 'วัดพระแก้ว' }).first();
  await placeCard.click();

  // 3. ตรวจสอบว่าแสดงรายละเอียด (รูปภาพ, ข้อมูล, รีวิว)
  await expect(page.locator('body')).toContainText(/รายละเอียด|รีวิว/);
  
  // 4. ถ่ายรูปหลักฐาน
  await page.screenshot({ path: 'evidence/TC_6_0_001_PlaceDetail.png', fullPage: true });
});