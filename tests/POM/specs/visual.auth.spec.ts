import { guestTest as test } from '../../fixtures/app.fixture';

test('Sign in modal has correct view', async ({homePage, authModalPage}) => {
	await homePage.open()
	await authModalPage.open()
	await authModalPage.assertSignInModalHasCorrectView()

})

test("Sign up modal has correct view", async ({ homePage, authModalPage }) => {
  await homePage.open();
  await authModalPage.open();
  await authModalPage.openRegisterButton()
  await authModalPage.assertSignUpModalHasCorrectView();
});