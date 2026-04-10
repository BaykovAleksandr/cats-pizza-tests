import { CleanUpApi } from "./../api/CleanUpApi";
import { testAddress, testUsers } from "./../data/testData";
import { test } from "../../fixtures/app.fixture";

test.describe("Orders", () => {
  test.describe.configure({ mode: "serial" });
  test.afterEach(async ({ request }) => {
    const cleanUpApi = new CleanUpApi(request);
    await cleanUpApi.deleteOrdersByEmail(testUsers.existing.email);
  });

  test("Make order with login in checkout", async ({
    homePage,
    checkoutPage,
    orderPage,
  }) => {
    await homePage.open();
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.signInAndCheckout(
      testUsers.existing.email,
      testUsers.existing.password,
    );
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await orderPage.open();
    await orderPage.assertHasOrder();
  });

  test("Make order after login", async ({
    homePage,
    checkoutPage,
    orderPage,
    authModalPage,
  }) => {
    await homePage.open();
    await authModalPage.signIn(
      testUsers.existing.email,
      testUsers.existing.password,
    );
    await homePage.addFirstCatToCart();
    await homePage.goToCheckoutFromCart();
    await checkoutPage.fillAddress(testAddress);
    await checkoutPage.submit();
    await orderPage.open();
    await orderPage.assertHasOrder();
  });
});
