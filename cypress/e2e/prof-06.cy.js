import LoginPage from '../support/pageObjects/LoginPage';

describe('Initiative profile/Landscape', () => {
  it('Add or edit conveners', () => {
    LoginPage.visit();
    // LoginPage.acceptCookies();
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!');
    // ...continue with the rest of your test...

    // Check if the "Explore Initiatives" button is present and clickable
    cy.get("[role='button']").eq(0).should("have.text", "Explore Initiatives").click();
    cy.location('pathname').should('include', '/compacts');

    // Navigate to the aceh-tamiang page 
    cy.get(':nth-child(1) > [data-compact-id="d68b409c-c3a3-40b9-957e-ca992cd63788"] > .CompactItem_root__V6qMa').click();
    cy.get('.CompactDetailGeneralLandscape_optionMenuMain__QvXZS button[class*="Button_icon_bullets"]', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    cy.get('.OptionMenu_list__gUcVw > :nth-child(4)').click();

    // Select covener Lestari Capital"
     cy.contains('span.CheckboxInput_label__B515S', 'Lestari Capital').click();
     cy.contains('button', 'Save Changes').click();


    











  });
});