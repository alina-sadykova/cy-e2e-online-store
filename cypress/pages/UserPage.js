export default class UserPage {
  locators = {
    getSignUpOrLoginLink: () => cy.get("a[href='/login']"),
    getNewUserSignUpForm: () => cy.get(".signup-form"),
    getSignUpName: () => cy.getByDataQa("signup-name"),
    getSignUpName: () => cy.getByDataQa("signup-name"),
    getSignUpEmail: () => cy.getByDataQa("signup-email"),
    getSignUpButton: () => cy.getByDataQa("signup-button"),
    getEmailExistErrorMessage: () =>
      cy.contains("Email Address already exist!"),
    getNewUserSignUpFormHeader: () => cy.get(".login-form>h2 b"),
  };

  // methods
  clickSignUpOrLoginLink = () => {
    this.locators.getSignUpOrLoginLink().click();
  };
  fillOutSignUpForm = (name, email) => {
    this.locators.getSignUpName().type(name);
    this.locators.getSignUpEmail().type(email);
    this.locators.getSignUpButton().click();
  };
}
