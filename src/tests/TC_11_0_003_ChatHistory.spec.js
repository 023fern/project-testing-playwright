require('../Hooks/testResultHook');
const { test, expect } = require('@playwright/test');

test.setTimeout(120000);

test('TC 11.0.003 - การโหลดประวัติการสนทนา', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // =========================
  // Test Data
  // =========================

  const email = 'fernkk4@gmail.com';
  const password = '112233';

  const chatTitle = 'Automation Test';
  const chatDetail = 'ตรวจสอบการโหลดประวัติการสนทนา';
  const message = `History ${Date.now()}`;

  // =========================
  // 1. Login
  // =========================

  await page.goto('https://moodlocation.vercel.app/login');

  await page.getByPlaceholder('your@email.com').fill(email);

  await page.locator('input[type="password"]').fill(password);

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

  await expect(
    page.getByRole('link', { name: 'Profile' })
  ).toBeVisible();

  // =========================
  // 2. เปิดศูนย์ช่วยเหลือ
  // =========================

  await page
    .getByRole('navigation')
    .getByRole('link', {
      name: 'ศูนย์ช่วยเหลือ',
    })
    .click();

  // =========================
  // 3. เปิดช่องแชท
  // =========================

  const openChatButton = page.getByRole('button', {
    name: 'เปิดช่องแชท',
  });

  await expect(openChatButton).toBeEnabled();

  await openChatButton.click();

  // =========================
  // 4. สร้างหัวข้อ
  // =========================

  await page
    .getByRole('textbox')
    .first()
    .fill(chatTitle);

  await page
    .getByRole('textbox')
    .nth(1)
    .fill(chatDetail);

  await page
    .getByRole('button', {
      name: 'ยืนยันและเริ่มแชท',
    })
    .click();

  // =========================
  // 5. ส่งข้อความ
  // =========================

  const messageInput = page.getByPlaceholder(
    'พิมพ์ข้อความของคุณที่นี่...'
  );

  await expect(messageInput).toBeVisible({
    timeout: 30000,
  });

  await messageInput.fill(message);

  const sendButton = messageInput
    .locator('xpath=ancestor::form')
    .locator('button[type="submit"]');

  await expect(sendButton).toBeEnabled();

  await sendButton.click();

  await expect(
    page.getByText(message, {
      exact: true,
    }).last()
  ).toBeVisible();

  // =========================
  // 6. Logout
  // =========================

  const logoutButton = page
    .getByRole('navigation')
    .getByRole('button', {
      name: 'ออกจากระบบ',
    });

  await logoutButton.click();

  await page
    .getByRole('button', {
      name: 'ตกลง',
    })
    .click();

  await expect(
    page.getByPlaceholder('your@email.com')
  ).toBeVisible();

  // =========================
  // 7. Login อีกครั้ง
  // =========================

  await page.goto('https://moodlocation.vercel.app/login');

  await page.getByPlaceholder('your@email.com').fill(email);

  await page.locator('input[type="password"]').fill(password);

  await page.locator('button[type="submit"]').click();

  await expect(
    page.getByRole('link', {
      name: 'Profile',
    })
  ).toBeVisible();

// =========================
// 8. เปิดศูนย์ช่วยเหลือ
// =========================

await page
  .getByRole('navigation')
  .getByRole('link', {
    name: 'ศูนย์ช่วยเหลือ',
  })
  .click();

// =========================
// 11. กดย้อนกลับ
// =========================

const backButton = page.getByRole('button').nth(2);

await expect(backButton).toBeVisible({
  timeout: 30000,
});

await backButton.click();

const openChatButton2 = page.getByRole('button', {
  name: 'เปิดช่องแชท',
});

await expect(openChatButton2).toBeVisible({
  timeout: 30000,
});

await openChatButton2.click();
// =========================
// 10. กรอกหัวข้อเดิม
// =========================

await page
  .getByRole('textbox')
  .first()
  .fill(chatTitle);

await page
  .getByRole('textbox')
  .nth(1)
  .fill(chatDetail);

await page.getByRole('button', {
  name: 'ยืนยันและเริ่มแชท',
}).click();



// =========================
// 12. ตรวจสอบประวัติการสนทนา
// =========================

await expect(
  page.getByText(message, {
    exact: true,
  })
).toBeVisible({
  timeout: 30000,
});
  // =========================
  // 10. Screenshot
  // =========================

  await page.screenshot({
    path: 'evidence/TC_11_0_003_ChatHistory.png',
    fullPage: true,
  });

  await context.close();

});