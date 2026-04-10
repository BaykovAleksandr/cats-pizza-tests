import { expect, Page } from "@playwright/test";

type Address = {
  city: string;
  street: string;
  house: string;
  apartment: string;
  comment: string;
};

export class CheckOutPage {
  constructor(private page: Page) {
    this.page = page;
  }

  async signInAndCheckout(email: string, password: string) {
    await this.page.getByLabel("Email").fill(email);
    await this.page.getByLabel("Пароль:").fill(password);
    await this.page.getByTestId("signInOrSignOutButton").click();
  }

  async fillAddress(address: Address) {
    await this.page.getByLabel("Город").fill(address.city);
    await this.page.getByLabel("Улица").fill(address.street);
    await this.page.getByLabel("Дом").fill(address.house);
    await this.page.getByLabel("Квартира").fill(address.apartment);
    await this.page.getByLabel("Комментарий курьеру").fill(address.comment);
    //await this.page.getByTestId("approveOrderButton").click();
  }

  async submit() {
    await this.page.getByTestId("approveOrderButton").click();
    await expect(this.page.getByTestId("modalTitle")).toHaveText(
      "Заказ оформлен",
    );
    await this.page.getByTestId("closeModalButton").click();
  }
}
