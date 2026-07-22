require('../Hooks/testResultHook');
const { test, expect } = require('@playwright/test');

test.setTimeout(180000);

test('TC_12_0_004 - ตอบแชทผู้ใช้สำเร็จ', async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  // =========================
  // Test Data
  // =========================

  const userEmail = 'fernkk4@gmail.com';
  const userPassword = '112233';

  const adminEmail = '664259023@webmail.npru.ac.th';
  const adminPassword = '111111';

  const chatTitle = 'Automation Test';
  const chatDetail = 'ตรวจสอบการตอบแชทของผู้ดูแลระบบ';

  const userMessage = `Playwright User ${Date.now()}`;
  const adminReply = `Admin Reply ${Date.now()}`;

  // =========================
  // 1. Login User
  // =========================

  await page.goto('https://moodlocation.vercel.app/login');

  await page.getByPlaceholder('your@email.com').fill(userEmail);

  await page.locator('input[type="password"]').fill(userPassword);

  await page.locator('button[type="submit"]').click();

  await expect(page.getByText('เข้าสู่ระบบสำเร็จ')).toBeVisible({
    timeout: 30000,
  });

  await expect(page.getByText('เข้าสู่ระบบสำเร็จ')).toBeHidden({
    timeout: 15000,
  });

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

  await page.getByRole('textbox').first().fill(chatTitle);

  await page.getByRole('textbox').nth(1).fill(chatDetail);

  await page.getByRole('button', {
    name: 'ยืนยันและเริ่มแชท',
  }).click();

  // =========================
  // 5. ส่งข้อความ
  // =========================

  const messageInput = page.getByPlaceholder(
    'พิมพ์ข้อความของคุณที่นี่...'
  );

  await expect(messageInput).toBeVisible({
    timeout: 30000,
  });

  await messageInput.fill(userMessage);

  const sendButton = messageInput
    .locator('xpath=ancestor::form')
    .locator('button[type="submit"]');

  await expect(sendButton).toBeEnabled();

  await sendButton.click();

  await expect(
    page.getByText(userMessage, {
      exact: true,
    }).last()
  ).toBeVisible();

  // =========================
  // 6. Logout User
  // =========================

  await page
    .getByRole('navigation')
    .getByRole('button', {
      name: 'ออกจากระบบ',
    })
    .click();

  await page.getByRole('button', {
    name: 'ตกลง',
  }).click();

  await expect(
    page.getByPlaceholder('your@email.com')
  ).toBeVisible({
    timeout: 30000,
  });

  // =========================
  // 7. Login Admin
  // =========================

  await page.goto('https://moodlocation.vercel.app/login');

  await page.getByPlaceholder('your@email.com').fill(adminEmail);

  await page.locator('input[type="password"]').fill(adminPassword);

  await page.locator('button[type="submit"]').click();

  await expect(page.getByText('เข้าสู่ระบบสำเร็จ')).toBeVisible({
    timeout: 30000,
  });

  await expect(page.getByText('เข้าสู่ระบบสำเร็จ')).toBeHidden({
    timeout: 15000,
  });

  // =========================
  // 8. เปิดเมนูตอบแชทผู้ใช้
  // =========================

  const replyChatButton = page.getByRole('button', {
    name: 'ตอบแชทผู้ใช้',
  });

  await expect(replyChatButton).toBeVisible({
    timeout: 30000,
  });

  await replyChatButton.click();

  // =========================
  // 9. เปิดห้องสนทนา
  // =========================

  const chatRoom = page.getByText(chatTitle, {
    exact: true,
  });

  await expect(chatRoom).toBeVisible({
    timeout: 30000,
  });

  await chatRoom.click();

  // =========================
  // 10. ตรวจสอบข้อความผู้ใช้
  // =========================

  await expect(
    page.getByText(userMessage, {
      exact: true,
    })
  ).toBeVisible({
    timeout: 30000,
  });

  // =========================
  // 11. ตอบข้อความ
  // =========================

  const adminMessageInput = page.getByPlaceholder(
    'พิมพ์ข้อความตอบกลับที่นี่...'
  );

  await expect(adminMessageInput).toBeVisible({
    timeout: 30000,
  });

  await adminMessageInput.fill(adminReply);

  const sendReplyButton = adminMessageInput
    .locator('xpath=ancestor::form')
    .locator('button[type="submit"]');

  await expect(sendReplyButton).toBeEnabled();

  await sendReplyButton.click();

  // =========================
  // 12. ตรวจสอบข้อความตอบกลับ
  // =========================

  await expect(
    page.getByText(adminReply, {
      exact: true,
    }).last()
  ).toBeVisible({
    timeout: 30000,
  });

  // =========================
  // 13. Screenshot
  // =========================

  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });

  await page.screenshot({
    path: 'evidence/TC_12_0_004_AdminReplySuccess.png',
    fullPage: true,
  });

  await context.close();

});