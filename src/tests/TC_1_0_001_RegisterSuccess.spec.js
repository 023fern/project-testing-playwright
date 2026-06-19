import { test, expect } from "@playwright/test";

test.setTimeout(180000);

test("สมัครสมาชิก + ยืนยันเมล", async ({ page }) => {

  const TEST_EMAIL = `test${Date.now()}@gmail.com`;

  const TEST_PASSWORD = "111111";

  // ---------------- REGISTER ----------------

  await page.goto('/register');

  await page.getByPlaceholder('ชื่อจริง')
    .fill('เฟิน');

  await page.getByPlaceholder('นามสกุล')
    .fill('เทสระบบ');

  await page.getByPlaceholder('your@email.com')
    .fill(TEST_EMAIL);

  await page.getByPlaceholder('รหัสผ่านของคุณ')
    .fill(TEST_PASSWORD);

  await page.getByPlaceholder('ยืนยันรหัสผ่าน')
    .fill(TEST_PASSWORD);

  await page.getByRole('button', {
    name: 'หญิง'
  }).click();

  // ดัก response register

  const registerResponsePromise = page.waitForResponse(
    response =>
      response.url().includes('/register') &&
      response.request().method() === 'POST'
  );

  // กดสมัคร

  await page.getByRole('button', {
    name: 'สร้างบัญชีสมาชิก'
  }).click();

  // รอ response

  const registerResponse =
    await registerResponsePromise;

  const responseBody =
    await registerResponse.json();

  console.log("REGISTER RESPONSE:", responseBody);

  // ---------------- SUCCESS TOAST ----------------

  await expect(
    page.getByText(/สมัครสมาชิกสำเร็จ/)
  ).toBeVisible();

  await page.getByRole('button', {
    name: 'OK'
  }).click();

  // ---------------- LOGIN PAGE ----------------

  await expect(page).toHaveURL(/login/);

  // ---------------- VERIFY ----------------

  const verifyLink = responseBody.verifyLink;

  if (!verifyLink) {
    throw new Error("ไม่พบ verifyLink จาก backend");
  }

  console.log("VERIFY LINK:", verifyLink);

  await page.goto(verifyLink);

  // ---------------- VERIFY SUCCESS ----------------

  await expect(
    page.getByText(/ยืนยันตัวตนสำเร็จ/)
  ).toBeVisible();

  // ---------------- LOGIN ----------------

  await page.goto('/login');

  await page.getByPlaceholder('your@email.com')
    .fill(TEST_EMAIL);

  await page.getByPlaceholder('รหัสผ่านของคุณ')
    .fill(TEST_PASSWORD);

  await page.getByRole('button', {
    name: 'เข้าสู่ระบบ'
  }).click();

  // ---------------- DASHBOARD ----------------

  await expect(page).toHaveURL(/dashboard/);

  console.log("TEST PASSED");

});