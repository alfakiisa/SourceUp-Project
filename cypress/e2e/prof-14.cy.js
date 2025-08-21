import LoginPage from '../support/pageObjects/LoginPage';
describe('Partners', () => {

  it('visit compacts page', () => {

    cy.visit('https://acc.sourceup.org/compacts')
   })

  it.skip('Login admin', () => {
    //cy.viewport(1280, 720) // set viewport size
    LoginPage.visit();
    //LoginPage.acceptCookies(); // Uncomment if cookie acceptance is needed
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!')
    
  })

  it.skip('INIT-01 Download lanscape data', () => {
   
    //cy.get('a[href="/compacts"]').eq(0).click() // navigate to explore initiatives
    cy.get('h1.CompactSidebarCompacts_title__oCDs8').should('contain', 'Find sustainability changemakers') // check if the header is correct 
    cy.get('button[type="button"]').eq(7).should('be.visible').click() // click on the floating add button
    cy.get('.CheckboxInput_label__B515S').first().click() // check "Aceh" checkbox
    cy.get('.CheckboxInput_label__B515S').eq(1).click() // check "Aceh Landscape" checkbox
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS').last().click() // click on "Download chosen"
    cy.get('.CheckboxInput_label__B515S').first().should('be.visible').click({force: true}) // check "Select All" checkbox
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_arrow__qFEJR').click() // click on "Proceed to Download"

  })


})