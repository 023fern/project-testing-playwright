require('../Hooks/testResultHook');
const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('TC_12_0_001 - แสดงรายชื่อผู้ใช้', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // =========================
  // Test Data
  // =========================

  const adminEmail = '664259023@webmail.npru.ac.th';
  const adminPassword = '111111';

  // =========================
  // 1. Login Admin
  // =========================

  await page.goto('https://moodlocation.vercel.app/login');

  await page.getByPlaceholder('your@email.com').fill(adminEmail);

  await page.locator('input[type="password"]').fill(adminPassword);

  await page.locator('button[type="submit"]').click();

  await expect(
    page.getByText('เข้าสู่ระบบสำเร็จ')
  ).toBeVisible({
    timeout: 30000,
  });

  await expect(
    page.getByText('เข้าสู่ระบบสำเร็จ')
  ).toBeHidden({
    timeout: 15000,
  });

  // =========================
  // 2. เปิดหน้าจัดการสมาชิก
  // =========================

  const memberButton = page.getByRole('button', {
    name: 'จัดการสมาชิก',
  });

  await expect(memberButton).toBeVisible();

  await memberButton.click();

  // =========================
  // 3. ตรวจสอบหน้าจัดการสมาชิก
  // =========================

  await expect(
    page.getByRole('heading', {
      name: /จัดการ สมาชิก/i,
    })
  ).toBeVisible();

  // =========================
  // 4. ตรวจสอบว่ามีรายชื่อผู้ใช้
  // =========================
const userRows = page.locator('table tbody tr');

await expect(async () => {
  expect(await userRows.count()).toBeGreaterThan(0);
}).toPass({
  timeout: 90000,
});

// ตรวจสอบว่ามีอีเมลของผู้ใช้ในตาราง
await expect(
  page.locator('table').getByRole('cell', {
    name: 'fernkk4@gmail.com',
  })
).toBeVisible();



  // =========================
  // 5. Screenshot
  // =========================
await page.evaluate(() => {
  window.scrollTo(0, 0);
});
  await page.screenshot({
    path: 'evidence/TC_12_0_001_UserList.png',
    fullPage: true,
  });

  await context.close();

});