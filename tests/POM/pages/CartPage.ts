import { expect, type Page } from "@playwright/test";
import { CartApi } from "../api/mockApi/cartApi";

export class CartPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/cart");
  }

  async setupApiEmptyCart() {
    const cartApi = new CartApi(this.page);

    await cartApi.setEmptyCart();
  }

  async setupApiWithOneItem() {
    const cartApi = new CartApi(this.page);

    await cartApi.setCartWithOneItem();
  }

  async removeFirstItem() {
    const removeButton = this.page
      .getByRole("button", { name: "Удалить" })
      .first();
    await removeButton.waitFor({ state: "visible" });
    await removeButton.click();
  }

  async clear() {
    const clearButton = this.page.getByRole("button", {
      name: "Очистить корзину",
    });
    await clearButton.waitFor({ state: "visible" });
    await clearButton.click();
  }

  async addOneMoreSameCat() {
    const plusButton = this.page.getByRole("button", { name: "+" });
    await plusButton.waitFor({ state: "visible" });
    await plusButton.click();
  }

  async assertEmpty() {
    await expect(
      this.page.getByText("Корзина пуста. Добавьте котика с главной страницы."),
    ).toBeVisible();
  }

  async assertCatCounter(value: string) {
    await expect(this.page.getByTestId("itemCounter")).toHaveValue(value);
  }

  async assertHasCorrectViewWithOneItem() {
    await expect(this.page).toHaveScreenshot("cartWithOneItem.png");
  }

  async assertHasCorrectEmptyView() {
    await expect(this.page).toHaveScreenshot("cartEmpty.png");
  }
}
