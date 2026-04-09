import { test, expect } from "@playwright/test";
import { request } from "http";
import { emit } from "process";

const TEST_USER_EMAIL = "tests@tests.ru";
const TEST_USER_PASSWORD = "12345";
const API_URL = "http://localhost:3001/api";

test.describe("Auth", () => {
  let createdUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createdUserEmail) {
      return;
    }
    await request.delete(`${API_URL}/users/by-email`, {
      data: { email: createdUserEmail },
    });
    createdUserEmail = null;
  });
  test("Sign in", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("signInButton").click();
    await page.getByLabel("Email").fill(TEST_USER_EMAIL);
    await page.getByLabel("Пароль:").fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignOutButton").click();
    await expect(page.getByTestId("signOutButton")).toBeVisible();
  });

  test("Sign up", async ({ page }) => {
    createdUserEmail = `${Date.now()}@test.ru`;

    await page.goto("/");
    await page.getByTestId("signInButton").click();
    await page.getByTestId("registerButton").click();
    await page.getByLabel("Имя").fill("test");
    await page.getByLabel("Email").fill(createdUserEmail);
    await page.getByLabel("Пароль:").first().fill(TEST_USER_PASSWORD);
    await page
      .getByLabel("Повторите пароль:", { exact: true })
      .fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignOutButton").click();
    await expect(page.getByTestId("signInOrSignOutButton")).toBeVisible();
  });
});

test.describe("Orders", () => {
  test.describe.configure({ mode: "serial" });
  test.afterEach(async ({ request }) => {
    await request.delete(`${API_URL}/orders/by-email`, {
      data: { email: TEST_USER_EMAIL },
    });
  });
  test("Make order with login", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("catCard_0").getByTestId("addToCartButton").click();
    await page.getByTestId("catModalAddToCartButton").click();
    await page.getByTestId("openCartButton").click();
    await page.getByTestId("goToCartPageButton").click();
    await page.getByTestId("makeOrderButton").click();

    await page.getByLabel("Email").fill(TEST_USER_EMAIL);
    await page.getByLabel("Пароль:").fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignOutButton").click();
    await page.getByLabel("Город*").fill("Москва");
    await page.getByLabel("Улица*").fill("Центральная");
    await page.getByLabel("Дом").fill("1");
    await page.getByLabel("Квартира").fill("1");
    await page.getByLabel("Комментарий курьеру").fill("Комментарий");
    await page.getByTestId("approveOrderButton").click();
    await expect(page.getByTestId("modalTitle")).toHaveText("Заказ оформлен");

    await page.getByTestId("closeModalButton").click();
    await page.getByTestId("openOrdersButton").click();
    await expect(
      page.getByTestId("ordersList").getByRole("listitem").first(),
    ).toBeVisible();
  });

  test("Make order without login", async ({ page }) => {
    await page.goto("/");

    await page.getByTestId("signInButton").click();
    await page.getByLabel("Email").fill(TEST_USER_EMAIL);
    await page.getByLabel("Пароль:").fill(TEST_USER_PASSWORD);
    await page.getByTestId("signInOrSignOutButton").click();
    await expect(page.getByTestId("signOutButton")).toBeVisible();

    await page.getByTestId("catCard_0").getByTestId("addToCartButton").click();
    await page.getByTestId("catModalAddToCartButton").click();
    await page.getByTestId("openCartButton").click();
    await page.getByTestId("goToCartPageButton").click();
    await page.getByTestId("makeOrderButton").click();

    await page.getByLabel("Город*").fill("Москва");
    await page.getByLabel("Улица*").fill("Центральная");
    await page.getByLabel("Дом").fill("1");
    await page.getByLabel("Квартира").fill("1");
    await page.getByLabel("Комментарий курьеру").fill("Комментарий");
    await page.getByTestId("approveOrderButton").click();
    await expect(page.getByTestId("modalTitle")).toHaveText("Заказ оформлен");

    await page.getByTestId("closeModalButton").click();
    await page.getByTestId("openOrdersButton").click();
    await expect(
      page.getByTestId("ordersList").getByRole("listitem").first(),
    ).toBeVisible();
  });
});
