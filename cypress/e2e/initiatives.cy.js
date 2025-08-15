/**
"1. Click on the floating add button
2. Search ""aceh"" in the search bar
3. Select all returned results
4. Click on ""Download chosen""
5. Check ""Select All""
6. Click on ""Proceed to Download "
 */
import LoginPage from '../support/pageObjects/LoginPage';
describe('Initiatives page', () => {
  it.skip('Login admin', () => {
    //cy.viewport(1280, 720) // set viewport size
    LoginPage.visit();
    //LoginPage.acceptCookies(); // Uncomment if cookie acceptance is needed
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!');
    
  })


  it.skip('Download lanscape data', () => {
    cy.visit('https://acc.sourceup.org/compacts')
    //cy.get('a[href="/compacts"]').eq(0).click() // navigate to explore initiatives
    cy.get('h1.CompactSidebarCompacts_title__oCDs8').should('contain', 'Find sustainability changemakers') // check if the header is correct 
    cy.get('button[type="button"]').eq(7).should('be.visible').click() // click on the floating add button
    cy.get('.CheckboxInput_label__B515S').first().click() // check "Aceh" checkbox
    cy.get('.CheckboxInput_label__B515S').eq(1).click() // check "Aceh Landscape" checkbox
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS').last().click() // click on "Download chosen"
    cy.get('.CheckboxInput_label__B515S').first().should('be.visible').click({force: true}) // check "Select All" checkbox
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_arrow__qFEJR').click() // click on "Proceed to Download"

    //cy.get('LandscapeDataDownloadInitiativeCard_row__dchrc').should('contain', 'Aceh')//
    //cy.get('.search-bar input').type('aceh') // search for "aceh"
    //cy.get('.search-bar button').click() // click on the search button
  })


  it.skip('Verify that pin location matches initiative card', () => {
    cy.visit('https://acc.sourceup.org/compacts')

    //cy.get('CompactMapMarker_root__f0_UP').should('be.visible') // check if the map marker is visible
    // Get the title from the first card
      
    cy.get('.CompactItem_root__V6qMa').first().within(() => {
        cy.get('.CompactItem_title__loJ_n')
          .invoke('text')
          .then((cardTitle) => {
            // Click the corresponding marker
            //cy.get('.CompactMapMarker_root__f0_UP').eq(48).should('be.visible').click();
            cy.get('[style="cursor: pointer; transform: translate(260px, 262px) translate(-50%, -50%) translate(0px, 0px);"] > .CompactMapMarker_root__f0_UP').click();

            // Assert that after clicking, the card with same title is highlighted/visible
            cy.get('.CompactItem_root__V6qMa')
              .contains(cardTitle)
              .should('be.visible')
              .and('have.class', 'active'); // replace 'active' with the real highlight class
        })
    })


  })

  

  it.skip('Verify search functionality', () => {
    cy.visit('https://acc.sourceup.org/compacts')

    cy.get('input[name="search"]').click().type('aceh').wait(3000) // search for "aceh"

    // Assert each card contains the search keyword "aceh"
    const searchKeyword = 'aceh' // define the search keyword
    cy.get('a.CompactItem_root__V6qMa').each(($el) => { // iterate through each initiative card
      cy.wrap($el) // wrap the element to use Cypress commands
      .invoke('text') // get the text of the element
      .then((text) => { // check if the text includes the search keyword
        expect(text.toLowerCase()).to.include(searchKeyword.toLowerCase()) // assert that the text includes the search keyword
      }) 
    })
  })


  it('filter by collections dropdown', () => {

    cy.visit('https://acc.sourceup.org/compacts')
    cy.get('[class*="css-aro51m"]').click() // open dropdown
    cy.contains('.dropdown-option', 'Active').click() // select "Active"

    // Now assert that only active items appear
    //cy.get('.card-status').each($status => {
      //expect($status.text()).to.eq('Active')
    //})




    
  })



  it.skip('filter by country', () => {



    
  })


  
  it.skip('filter by commodity', () => {



    
  })


  it.skip('filter by themes', () => {



    
  })

})