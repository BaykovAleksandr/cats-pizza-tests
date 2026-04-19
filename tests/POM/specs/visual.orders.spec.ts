import { guestTest as test } from "../../fixtures/app.fixture";

test("Orders page empty state", async ({ orderPage }) => {
  await orderPage.setupApiEmptyItems();
  await orderPage.openPage();
  await orderPage.assertHasCorrectPageViewEmptyOrdersList();
});

test("Orders page with items", async ({ orderPage }) => {
  await orderPage.setupApiWithOneItem();
  await orderPage.openPage();
  await orderPage.assertHasCorrectPageViewWithOneOrder();
});
