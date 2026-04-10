import { CleanUpApi } from "./../api/CleanUpApi";
import { testUsers } from "./../data/testData";
import { test } from "../../fixtures/app.fixture";

test.describe("Auth", () => {
  let createdUserEmail: string | null = null;

  test.afterAll(async ({ request }) => {
    if (!createdUserEmail) {
      return;
    }
    const cleanUpApi = new CleanUpApi(request);
    await cleanUpApi.deleteUserByEmail(createdUserEmail);

    createdUserEmail = null;
  });
  test("Sign in", async ({ homePage, authModalPage }) => {
    await homePage.open();
    await authModalPage.signIn(
      testUsers.existing.email,
      testUsers.existing.password,
    );
    await authModalPage.assertSignedIn();
  });

  test("Sign up", async ({ homePage, authModalPage }) => {
    createdUserEmail = `${Date.now()}@test.ru`;

    await homePage.open();
    await authModalPage.signUp(
      "testName",
      createdUserEmail,
      testUsers.existing.password,
    );
    await authModalPage.assertSignedIn();
  });
});
