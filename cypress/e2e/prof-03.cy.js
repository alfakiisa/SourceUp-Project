import LoginPage from '../support/pageObjects/LoginPage';

describe('Initiative profile/Landscape/Images', () => {
  it('Adjust title and description', () => {
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

      // select the Upload picture/video option
       cy.get('.OptionMenu_list__gUcVw > :nth-child(2)').click()
       cy.get('input[name="blobTitle"]').type('Test Image Upload');
       cy.get('input[name="blobDescription"]')
         .should('be.visible')
         .type('This is my description');

      cy.get('input[name="blobUrl"]')
        .selectFile("cypress/fixtures/test-image.png", {force: true});
      cy.get('button[form="initative-image-video-add"]').click();
      cy.get('button[form="initiative-gallery-edit"]').click();
  

cy.get("div[class='CompactDetailGeneral_content___w8r_'] div:nth-child(2) div:nth-child(1) div:nth-child(1) button:nth-child(1)")
  .click({force: true})
cy.get('.OptionMenu_list__gUcVw > :nth-child(1)').click();

 cy.get('input[name="blobTitle"]').clear().type('New Test Image Upload');
       cy.get('input[name="blobDescription"]')
         .clear()
         .type('This is my New description');
cy.get('button[form="initiative-gallery-edit"]').click();




  });
});