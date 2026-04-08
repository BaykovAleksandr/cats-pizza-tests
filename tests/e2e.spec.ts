//Авторизация
//Регистрация
//Оформление заказа для неавторизованного пользователя
//Оформление заказа для авторизованного пользователя

import { test, expect } from "@playwright/test";

test("Check sign in", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("signInButton").click();
  await page.getByLabel("Email").fill("tests@tests.ru");
  await page.getByLabel("Пароль:").fill("12345");
  await page.getByTestId("signInOrSignOutButton").click();
  await expect(page.getByTestId("signOutButton")).toBeVisible();
});

test("Check registration", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("signInButton").click();
  await page.getByTestId("registerButton").click();
  await page.getByLabel("Имя").fill("test");
  await page.getByLabel("Email").fill(`${Date.now()}@test.ru`);
  await page.getByLabel("Пароль:").first().fill("12345");
  await page.getByLabel("Повторите пароль:", { exact: true }).fill("12345");
  await page.getByTestId("signInOrSignOutButton").click();
  await expect(page.getByTestId("signInOrSignOutButton")).toBeVisible();
});

test("Make order with login", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("catCard_0").getByTestId("addToCartButton").click();
  await page.getByTestId("catModalAddToCartButton").click();
  await page.getByTestId("openCartButton").click();
  await page.getByTestId("goToCartPageButton").click();
  await page.getByTestId("makeOrderButton").click();

  await page.getByLabel("Email").fill("tests@tests.ru");
  await page.getByLabel("Пароль:").fill("12345");
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
  await page.getByLabel("Email").fill("tests@tests.ru");
  await page.getByLabel("Пароль:").fill("12345");
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
