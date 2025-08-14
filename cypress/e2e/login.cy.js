import LoginPage from '../support/pageObjects/LoginPage';

describe('This is Login Test Scenarios', () => {
  it('Valid Login', () => {
    LoginPage.visit();
    // LoginPage.acceptCookies();
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!');
    // ...continue with the rest of your test...
  });
});