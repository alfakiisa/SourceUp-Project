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

  it('visit compacts page', () => {

    cy.visit('https://acc.sourceup.org/compacts')
   });

  it.skip('Login admin', () => {
    //cy.viewport(1280, 720) // set viewport size
    LoginPage.visit();
    //LoginPage.acceptCookies(); // Uncomment if cookie acceptance is needed
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!');
    
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

    //cy.get('LandscapeDataDownloadInitiativeCard_row__dchrc').should('contain', 'Aceh')//
    //cy.get('.search-bar input').type('aceh') // search for "aceh"
    //cy.get('.search-bar button').click() // click on the search button
  })


  it.skip('INIT-02 Verify that pin location matches initiative card', () => {
   

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

  

  it.skip(' INIT-03 Verify that search functionality works as expected', () => {
    

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


  it.skip('INIT-04 Verify that filter by collections dropdown works as expected', () => {
   

    // Open the dropdown
    cy.get('#select-collections').click();

    // Assert that dropdown menu is visible
    cy.get('#react-select-select-collections-listbox')
      .should('be.visible');

    // Assert that all expected options exist
    const expectedOptions = [
      'Local Indicators',
      'Forest Positive Coalition',
      'LandScale',
      'NISCOPS',
      'Laudes Foundation'
    ];

    expectedOptions.forEach(option => {
      cy.get('#react-select-select-collections-listbox')
        .contains(option)
        .should('exist');
    });

    // --- Filtering behavior ---
    // Type filter text
    cy.get('#select-collections')
      .type('Land');

    // Assert only matching options are shown
    cy.get('#react-select-select-collections-listbox')
      .should('contain.text', 'LandScale')
      .and('not.contain.text', 'Local Indicators')
      .and('not.contain.text', 'Forest Positive Coalition')
      .and('not.contain.text', 'NISCOPS')
      .and('not.contain.text', 'Laudes Foundation');

    // Select the filtered option
    cy.contains('#react-select-select-collections-listbox', 'LandScale')
      .click();

    // Assert that the option is selected
    cy.get('.MultiSelect_container__y5jHm')
      .should('contain.text', 'LandScale');
  
  })  




  it('INIT-05 Verify that filter by country works as expected', () => {

    cy.get('.CompactFilterButton_root__XyY93.CompactFilterButton_earth__kMOBD').click(); // Open the country filter dropdown
    cy.get('.EditModalForm_root__Amakx').should('be.visible'); // Assert that contry modal is open
    cy.get('.AutoCompleteInput_input__WYKdG').type('colombia'); // Enter country name
    cy.wait(2000)
    cy.get('div.CheckboxInput_root__NzOGG.CheckboxInput_card__1e_8f').contains('Colombia').click() // Check input box
    cy.wait(3000)
    cy.get('button[class="Button_root__sMa56 Button_tertiary__FXv_P Button_hasIcon__Pfx4E Button_icon_plus__1TZKS"]').contains('Show results').click() // Click on show results

    // Grab the counter text (e.g. "5 results")
    cy.get('.EditModalForm_resultsCounter__giAlA') // adjust to your actual counter selector
      .invoke('text')
      .then((text) => {
        // Extract the number from the text
        const count = parseInt(text.match(/\d+/)[0]);

        // Compare with number of cards rendered
        cy.get('.CompactItem_root__V6qMa') // your card selector
          .should('have.length', count);
      });


    
  })


  
  it.skip('INIT-06 Verify that filter by commodity works as expected', () => {



    
  })


  it.skip('INIT-07 Verify that filter by themes works as expected', () => {



    
  })

})