import UserPage from "../../pages/UserPage";

describe("User registration page", () => {
  const userPage = new UserPage();
  const userLocators = userPage.locators;
  let formLabels;
  let userInfo;

  before(() => {
    cy.fixture("signUpFormLabels").then((data) => {
      formLabels = data;
      console.log("formLabels", formLabels);
    });
    cy.fixture("userAccountInfo").then((data) => {
      userInfo = data;
      console.log("userInfo", userInfo);
    });
  });

  /* 
  2. Navigate to url 'http://automationexercise.com'
  3. Verify that home page is visible successfully
  4. Click on 'Signup / Login' button
  5. Verify 'New User Signup!' is visible
  6. Enter name and email address
  7. Click 'Signup' button
  */

  it("TC01 - allows user to sign up using name and email", function () {
    cy.title().should("eq", "Automation Exercise");
    userPage.clickSignUpOrLoginLink();
    userLocators
      .getNewUserSignUpHeader()
      .should(
        "have.text",
        formLabels.find((el) => el.key === "signupHeader")?.value
      );

    userPage.fillSignUpForm(userInfo.fullname, userInfo.email);

    cy.url().should("contain", "/signup");

    userLocators.getAccountFormHeader().each((el) => {
      cy.wrap(el).should("be.visible");
    });
  });

  it("TC02 - does NOT allow invalid or already existing email", () => {
    cy.title().should("eq", "Automation Exercise");
    userPage.clickSignUpOrLoginLink();
    userLocators.getNewUserSignUpForm().should("be.visible");
    userPage.fillSignUpForm(userInfo.fullname, userInfo.existingEmail);
    userLocators.getEmailExistErrorMessage().should("be.visible");
  });

  /*
  8. Verify that 'ENTER ACCOUNT INFORMATION' is visible 
  9. Fill details: Title, Name, Email, Password, Date of birth
  10. Select checkbox 'Sign up for our newsletter!'
  11. Select checkbox 'Receive special offers from our partners!'
  12. Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
  13. Click 'Create Account button'
  14. Verify that 'ACCOUNT CREATED!' is visible
  15. Click 'Continue' button
  16. Verify that 'Logged in as username' is visible
  17. Click 'Delete Account' button
  18. Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button */

  it("TC03 - allows to create a new account and delete it", () => {
    userPage.clickSignUpOrLoginLink();
    userPage.fillSignUpForm(userInfo.fullname, userInfo.email);

    userLocators.getAccountFormHeader().each((el) => {
      cy.wrap(el).should("be.visible");
    });

    userPage.enterAccountInfo(userInfo);

    userPage.fillAddressForm(userInfo);

    userLocators.getCreateAccountButton().click();
    userLocators
      .getAccountFormHeader()
      .should(
        "have.text",
        formLabels.find((el) => el.key === "accountCreatedHeader")?.value
      );

    userLocators.getContinueButton().click();
    userPage.checkLoggedinAs(userInfo.fullname);

    userPage.deleteAccountandVerify();
    userLocators.getContinueButton().click();
  });
});
