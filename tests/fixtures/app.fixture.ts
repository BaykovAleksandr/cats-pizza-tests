/* eslint-disable react-hooks/rules-of-hooks */
import { OrdersPage } from "./../POM/pages/OrdersPage";
import { CheckOutPage } from "./../POM/pages/CheckOutPage";
import { AuthModalPage } from "./../POM/pages/AuthModalPage";
import { HomePage } from "./../POM/pages/HomePage";
import { CartPage } from "../POM/pages/CardPage";
import { test as base } from "@playwright/test";
import path from "path";

export const authFile = path.join(
  process.cwd(),
  "playwright/.auth/existing-user.json",
);

type MyFixtures = {
  homePage: HomePage;
  authModalPage: AuthModalPage;
  checkoutPage: CheckOutPage;
  orderPage: OrdersPage;
  cartPage: CartPage;
};

type AppOptions = {
  storageState: string | undefined;
};

const appTest = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  authModalPage: async ({ page }, use) => {
    const authModalPage = new AuthModalPage(page);
    await use(authModalPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckOutPage(page);
    await use(checkoutPage);
  },
  orderPage: async ({ page }, use) => {
    const orderPage = new OrdersPage(page);
    await use(orderPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
});

export const guestTest = appTest;
export const authorizedTest = appTest.extend<AppOptions>({
  storageState: authFile,
});
export { expect } from "@playwright/test";
