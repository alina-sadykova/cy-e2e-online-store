export default class UserPage {
  locators = {
    getSignUpOrLoginLink: () => cy.get("a[href='/login']"),
    getNewUserSignUpHeader: () => cy.get(".signup-form h2"),
    getNewUserSignUpForm: () => cy.get(".signup-form"),
    getSignUpName: () => cy.getByDataQa("signup-name"),
    getSignUpName: () => cy.getByDataQa("signup-name"),
    getSignUpEmail: () => cy.getByDataQa("signup-email"),
    getSignUpButton: () => cy.getByDataQa("signup-button"),
    getEmailExistErrorMessage: () =>
      cy.contains("Email Address already exist!"),
    getAccountFormHeader: () => cy.get("h2[class^='title']>b"),
    getNewUserSignUpFormLabels: () => cy.get(".login-form label"),
    getFormLabels: () => cy.ger("form label"),

    // locators for account info form:
    getRadioOptionGender: () => cy.get(".radio input"),
    getTitleMr: () => cy.get('[value="Mr"]'),
    getTitleMrs: () => cy.get('[value="Mrs"]'),
    getInputName: () => cy.get("#name"),
    getInputEmail: () =>
      cy.get("label[for='email']").parent().find("input").last(),
    getInputPassword: () => cy.get("input[data-qa='password']"),
    getInputDay: () => cy.get("#days"),
    getInputMonth: () => cy.get("#months"),
    getInputYear: () => cy.get("#years"),
    getCheckboxNewsletter: () => cy.get("#newsletter"),
    getCheckboxSpecialOffer: () => cy.get("#optin"),
    getNewsletterCheckbox: () => cy.get("#newsletter"),
    getSpecialOffersCheckbox: () => cy.get("#optin"),

    // locators for address form:
    getFirstNameInput: () => cy.get("#first_name"),
    getLastNameInput: () => cy.get("#last_name"),
    getCompanyInput: () => cy.get("#company"),
    getAddress1Input: () => cy.get("#address1"),
    getAddress2Input: () => cy.get("#address2"),
    getCountrySelect: () => cy.get("#country"),
    getStateInput: () => cy.get("#state"),
    getCityInput: () => cy.get("#city"),
    getZipInput: () => cy.get("#zipcode"),
    getMobileInput: () => cy.get("#mobile_number"),
    getCreateAccountButton: () => cy.get("[data-qa='create-account']"),

    getContinueButton: () => cy.get('[data-qa="continue-button"]'),
    getLoggedinAs: () => cy.get(".fa-user").parent(),
    getDeleteAccountButton: () => cy.get('a[href*="/delete_account"]'),
    getAccountDeletedHeader: () => cy.get('[data-qa="account-deleted"]'),
  };

  // methods
  clickSignUpOrLoginLink = () => {
    this.locators.getSignUpOrLoginLink().click();
  };

  fillSignUpForm = (name, email) => {
    this.locators.getSignUpName().type(name);
    this.locators.getSignUpEmail().type(email);
    this.locators.getSignUpButton().click();
  };

  enterAccountInfo = ({
    title,
    fullname,
    email,
    password,
    dob,
    subscribe,
    offers,
  }) => {
    const { day, month, year } = dob;
    if (title === "Mr.") this.locators.getTitleMr().check();
    if (title === "Mrs.") this.locators.getTitleMrs().check();

    this.locators.getInputName().should("have.value", fullname);
    this.locators.getInputEmail().should("have.value", email);
    this.locators.getInputPassword().type(password);

    this.locators.getInputDay().select(day);
    this.locators.getInputMonth().select(month);
    this.locators.getInputYear().select(year);

    if (subscribe) this.locators.getNewsletterCheckbox().check();
    if (offers) this.locators.getSpecialOffersCheckbox().check();
  };

  fillAddressForm = ({
    firstName,
    lastName,
    company,
    address1,
    address2,
    country,
    state,
    city,
    zipcode,
    mobile,
  }) => {
    this.locators.getFirstNameInput().type(firstName);
    this.locators.getLastNameInput().type(lastName);
    this.locators.getCompanyInput().type(company);
    this.locators.getAddress1Input().type(address1);

    if (address2) this.locators.getAddress2Input().type(address2);

    this.locators.getCountrySelect().select(country);
    this.locators.getStateInput().type(state);
    this.locators.getCityInput().type(city);
    this.locators.getZipInput().type(zipcode);
    this.locators.getMobileInput().type(mobile);
  };

  checkLoggedinAs = (username) => {
    this.locators
      .getLoggedinAs()
      .should("include.text", `Logged in as ${username}`);
  };

  deleteAccountandVerify = () => {
    this.locators.getDeleteAccountButton().click();
    this.locators.getAccountDeletedHeader().should("be.visible");
  };
}
