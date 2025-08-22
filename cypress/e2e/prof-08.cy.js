import LoginPage from '../support/pageObjects/LoginPage';

describe('Initiative profile', () => {

  it('Set header image', () => {
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

    cy.wait(10000)

//  // Delete exisiting header
//     cy.get('button.Button_icon_bullets__DRgQ0').eq(0).click({ force: true });
//     cy.contains('li', 'Set header image').click();
//     cy.get('button.Button_icon_trashcan__7V10J').click();
//     cy.get('button[form="removal-modal-forms"]').click()

//     cy.wait(10000)


    // upload the header image
    cy.get('button.Button_icon_bullets__DRgQ0').eq(0).click({ force: true });
    cy.contains('li', 'Set header image').click();
    cy.get('button.Button_icon_plus__1TZKS', { timeout: 10000 }).click();
    cy.get('input[type="file"][name="file"]')
      .selectFile('cypress/fixtures/aceh-tamiang.webp', { force: true });

    cy.contains('button', 'Submit image block').click();

    cy.wait(10000)
   

    // // Edit the header image
    cy.get('button.Button_icon_bullets__DRgQ0').eq(0).click({ force: true });
    cy.contains('li', 'Set header image').click();
    cy.get('button.Button_icon_pencil__UWmEM').click();
    cy.get('input[type="file"][name="file"]')
      .selectFile('cypress/fixtures/aceh-tamiang.webp', { force: true });

    cy.contains('button', 'Submit image block').click();


  })
});
