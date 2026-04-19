import { guestTest as test } from "../../fixtures/app.fixture";

test("Home page with items has correct view", async ({ homePage }) => {
  await homePage.setupApiEmptyCart();
  await homePage.open();
  await homePage.assertCorrectPageViewWithItems();
});

test("Home modal has correct view", async ({ homePage }) => {
  await homePage.setupApiEmptyCart();
  await homePage.open();
  await homePage.openItemDetailModal();
  await homePage.assertCorrectPageViewWithOpenDetailModal();
});

test("Empty cart drawer has correct view", async ({ homePage }) => {
  await homePage.setupApiEmptyCart();
  await homePage.open();
  await homePage.openCart();
  await homePage.assertCorrectPageViewWithOpenCartEmptyDrawer();
});

test("Empty cart drawer with one item has correct view", async ({
  homePage,
}) => {
  await homePage.setupApiCartWithItem();
  await homePage.open();
  await homePage.openCart();
  await homePage.assertCorrectPageViewWithOpenCartDrawerWithOneItem();
});
