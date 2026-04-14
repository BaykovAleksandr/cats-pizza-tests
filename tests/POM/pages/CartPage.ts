import { expect, type Page } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  async open() {
    await this.page.goto("/cart");
  }

  async assertEmpty() {
    await expect(
      this.page.getByText("Корзина пуста. Добавьте котика с главной страницы."),
    ).toBeVisible();
  }

  async assertCatCounter(value: string) {
    await expect(this.page.getByTestId("itemCounter")).toHaveValue(value);
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
}
