import UserPage from "../../pages/UserPage";

describe("User registration page", () => {
  const userPage = new UserPage();
  const userLocators = userPage.locators;
  /* 
  2. Navigate to url 'http://automationexercise.com'
  3. Verify that home page is visible successfully
  4. Click on 'Signup / Login' button
  5. Verify 'New User Signup!' is visible
  6. Enter name and email address
  7. Click 'Signup' button
  8. Verify that 'ENTER ACCOUNT INFORMATION' is visible */

  it("TC01 - allows user to sign up using name and email", () => {
    cy.title().should("eq", "Automation Exercise");
    userPage.clickSignUpOrLoginLink();
    userLocators.getNewUserSignUpForm().should("be.visible");
    userPage.fillOutSignUpForm("John", "johnp@gmail.com");
    cy.url().should("contain", "/signup");
    userLocators
      .getNewUserSignUpFormHeader()
      .should("be.visible")
      .and("have.text", "Enter Account Information");
  });

  it("TC02 - does NOT allow invalid or already existing email", () => {
    cy.title().should("eq", "Automation Exercise");
    userPage.clickSignUpOrLoginLink();
    userLocators.getNewUserSignUpForm().should("be.visible");
    userPage.fillOutSignUpForm("John", "john@gmail.com");
    userLocators.getEmailExistErrorMessage().should("be.visible");
  });
});
