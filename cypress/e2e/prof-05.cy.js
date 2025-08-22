import LoginPage from '../support/pageObjects/LoginPage';

describe('Initiative profile/Landscape', () => {
  it('Adjust about text', () => {
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
    cy.get(':nth-child(3) > p').click();
    cy.get('select[name="language"]').select('English');


   // Wrap the iframe body into an alias
cy.get('iframe#idhTinyMce_ifr')
  .its('0.contentDocument.body')
  .should('not.be.empty')
  .then(cy.wrap)
  .as('editorBody');

// Clear and type in separate steps so Cypress can re-query
cy.get('@editorBody').find('p').clear();

cy.get('@editorBody').find('p').type('Testing About', { force: true });




    cy.get('button:contains("Translate to all languages")')
      .click({ force: true });
    cy.get('button[form="compact-description-edit"]').click();
  


    


  });
});
