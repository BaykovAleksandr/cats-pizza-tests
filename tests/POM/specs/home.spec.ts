import { guestTest as test } from "../../fixtures/app.fixture";

test.describe("Catalog and Cart (Guest)", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test("Catalog opens and shows cards", async ({ homePage }) => {
    await homePage.assertLoaded();
    await homePage.assertCartVisible();
  });

  test("Guest adds first cat to cart and sees badge count", async ({
    homePage,
  }) => {
    await homePage.addFirstCatToCart();
    await homePage.assertCartBadgeCount(1);
  });

  test("Guest opens cart and navigates to cart page", async ({ homePage }) => {
    await homePage.addFirstCatToCart();
    await homePage.openCart();
    await homePage.goToCartPage();
    await homePage.assertCartPageOpened();
  });
});
