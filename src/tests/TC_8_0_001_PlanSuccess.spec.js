require('../Hooks/testResultHook');
const { test, expect } = require('@playwright/test');

test('TC 8.0.001 - วางแผนการเดินทางสำเร็จ', async ({ browser }) => {
  test.setTimeout(60000);

  const context = await browser.newContext({
    permissions: ['geolocation'],
    geolocation: {
      latitude: 13.7563,
      longitude: 100.5018,
    },
  });

  const page = await context.newPage();

  // =========================
  // Login
  // =========================
  await page.goto('https://moodlocation.vercel.app/login');

  await page.getByPlaceholder('your@email.com')
    .fill('664259023@webmail.npru.ac.th');

  await page.locator('input[type="password"]')
    .fill('111111');

  await page.click('button[type="submit"]');

  await page.waitForLoadState('networkidle');

  // =========================
  // เลือกอารมณ์
  // =========================
  const emotionBtn = page.locator('button')
    .filter({ hasText: 'มีความสุข' })
    .filter({ visible: true })
    .first();

  await emotionBtn.click();

  // ====================================================
  // Favorite สถานที่ที่ 1
  // ====================================================
await expect(
  page.getByRole('heading', { name: 'สวนสนุก' })
).toBeVisible({ timeout: 30000 });
  const category1 = page.getByRole('heading', {
    name: 'สวนสนุก'
  });

  await category1.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await category1.click();

  const firstPlace = page.getByRole('button', {
    name: 'ดูรูปภาพและรีวิว'
  }).first();

  await firstPlace.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await firstPlace.click();

  const heartBtn1 = page.locator('main button').nth(1);

  await heartBtn1.waitFor({
    state: 'visible'
  });

  await heartBtn1.click({ force: true });

  await page.waitForTimeout(1000);

  // ====================================================
  // กลับไปเลือกหมวดหมู่ใหม่
  // ====================================================

  await page.goBack();

  await page.waitForLoadState('networkidle');

  // ====================================================
  // Favorite สถานที่ที่ 2
  // เปลี่ยนหมวดเพื่อป้องกันการกดสถานที่ซ้ำ
  // ====================================================

  const category2 = page.getByRole('heading', {
    name: 'งาน Event'
  });

  await category2.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await category2.click();

  const secondPlace = page.getByRole('button', {
    name: 'ดูรูปภาพและรีวิว'
  }).first();

  await secondPlace.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await secondPlace.click();

  const heartBtn2 = page.locator('main button').nth(1);

  await heartBtn2.waitFor({
    state: 'visible'
  });

  await heartBtn2.click({ force: true });

  await page.waitForTimeout(1000);

  // ====================================================
  // เปิดเมนู Hamburger
  // ====================================================

const menuBtn = page.locator('.hamburger-icon');

await expect(menuBtn).toBeVisible();

await menuBtn.click();
  // ====================================================
  // ไปหน้า วางแผนการเดินทาง
  // ====================================================

  const travelMenu = page.getByText('วางแผนการเดินทาง');

  await expect(travelMenu).toBeVisible();

  await travelMenu.click();

  await page.waitForLoadState('networkidle');

  // ====================================================
  // Validation
  // ====================================================

  await expect(page.locator('body'))
    .toContainText('จุดเริ่มต้น');

await expect(page.locator('body'))
  .toContainText(/ลำดับ\s*1/);

await expect(page.locator('body'))
  .toContainText(/ลำดับ\s*2/);
  // ตรวจสอบว่ามีข้อมูลระยะทาง
  await expect(page.locator('body'))
  .toContainText(/กม/);

  // ====================================================
  // Evidence
  // ====================================================

  await page.screenshot({
    path: 'evidence/TC_8_0_001_PlanSuccess.png',
    fullPage: true
  });

  

});