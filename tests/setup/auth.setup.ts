import { test as setup } from "@playwright/test";
import { authFile } from "../fixtures/app.fixture";
import { HomePage } from "../POM/pages/HomePage";
import { AuthModalPage } from "../POM/pages/AuthModalPage";
import { testUsers } from "../POM/data/testData";

setup('Authenticate existing user', async ({page}) => {
	const homePage = new HomePage(page)
	const authModal = new AuthModalPage(page)

	await homePage.open()
	await authModal.signIn(testUsers.existing.email, testUsers.existing.password)
	await authModal.assertSignedIn()

	await page.context().storageState({path: authFile})
})
