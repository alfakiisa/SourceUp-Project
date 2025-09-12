import LoginPage from '../support/pageObjects/LoginPage';

describe('This is Login Test Scenarios', () => {
  it('Valid Login', () => {
    // Clear cookies before running the test
    cy.clearCookies();
    LoginPage.visit();
    // LoginPage.acceptCookies();
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!');
  });
});