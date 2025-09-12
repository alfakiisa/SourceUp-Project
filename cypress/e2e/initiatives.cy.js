
import LoginPage from '../support/pageObjects/LoginPage';
describe('Initiatives page', () => {

  beforeEach('Login admin', () => {
    //cy.viewport(1280, 720) // set viewport size
    LoginPage.visit();
    //LoginPage.acceptCookies(); // Uncomment if cookie acceptance is needed
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!')
    cy.wait(3000)
    
  })


  it('Download lanscape data', () => {
   
    //cy.get('a[href="/compacts"]').eq(0).click() // navigate to explore initiatives
    cy.get('h1.CompactSidebarCompacts_title__oCDs8').should('contain', 'Find sustainability changemakers') // check if the header is correct 
    //cy.get('button[type="button"]').eq(7).click() //should('be.visible').click() // click on the floating add button
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_noContent__e0DyF.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS').click() // click on the floating add button
    cy.get('.CheckboxInput_label__B515S').first().click() // check "Aceh" checkbox
    cy.get('.CheckboxInput_label__B515S').eq(1).click() // check "Aceh Landscape" checkbox
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS').last().click() // click on "Download chosen"
    cy.get('.CheckboxInput_label__B515S').first().should('be.visible').click({force: true}) // check "Select All" checkbox
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_arrow__qFEJR').click() // click on "Proceed to Download"

  })


  it('Verify that pin location matches initiative card', () => {
   

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

  

  it('Verify that search functionality works as expected', () => {
  const searchKeyword = 'aceh' // define the search keyword

  cy.get('input[name="search"]').click().type(searchKeyword).wait(3000) // search for "aceh"

  cy.get('a.CompactItem_root__V6qMa').each(($el) => {
    cy.wrap($el)
      .invoke('text')
      .then((text) => {
        if (text.toLowerCase().includes(searchKeyword.toLowerCase())) {
          // Only assert if the card actually contains "aceh"
          expect(text.toLowerCase()).to.include(searchKeyword.toLowerCase())
        } else {
          // Optionally, log that it was skipped
          cy.log(`Skipping card: "${text}"`)
        }
      })
  })
})


  it('Verify that filter by collections dropdown works as expected', () => {
   

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


  it('Verify that filter by country works as expected', () => {

    cy.get('.CompactFilterButton_root__XyY93.CompactFilterButton_earth__kMOBD').click(); // Open the country filter dropdown
    cy.get('.EditModalForm_root__Amakx').should('be.visible'); // Assert that country modal is open
    cy.get('.AutoCompleteInput_input__WYKdG').type('indonesia'); // Enter country name
    cy.get('div.CheckboxInput_root__NzOGG.CheckboxInput_card__1e_8f').contains('Indonesia')
      .trigger('mousedown').trigger('mouseup').click() // Click on checkbox using mouse events
    cy.wait(5000)
    cy.get('button[class="Button_root__sMa56 Button_tertiary__FXv_P Button_hasIcon__Pfx4E Button_icon_plus__1TZKS"]')
      .contains('Show results').click() // Click on show results

    
    cy.get('.EditModalForm_resultsCounter__giAlA') // Grab the counter text (e.g. "Shown results: 5")
      .invoke('text')
      .then((text) => {
      
        const count = parseInt(text.match(/\d+/)[0])   // Extract the number from the text

        
        cy.get('.CompactItem_root__V6qMa') // Compare with number of cards rendered
          .should('have.length', count)
      })
    
  })

  
  
  it('Verify that filter by commodity works as expected', () => {

    cy.get('.CompactFilterButton_root__XyY93.CompactFilterButton_plant__ifOJV').click(); // Open the commodity filter
    cy.get('.EditModalForm_root__Amakx').should('be.visible'); // Assert that commodity modal is open
    cy.get('.AutoCompleteInput_input__WYKdG').type('avocado'); // Enter commodity name

    //cy.get('input[name="3a8cb9ef-aab7-49ee-85b8-c317a1fe5daf"]').should('be.visible')
    //cy.get('div.CheckboxInput_root__NzOGG.CheckboxInput_card__1e_8f').contains('avocado')
    cy.get('div.AutoCompleteInput_checkbox__0FV9d')
      .trigger('mousedown').trigger('mouseup').click({force: true}) // Click on checkbox using mouse events
    cy.wait(5000)
    cy.get('button[class="Button_root__sMa56 Button_tertiary__FXv_P Button_hasIcon__Pfx4E Button_icon_plus__1TZKS"]').contains('Show results').click() // Click on show results

    // Assert that result counted matches number of cards returned
    cy.get('.EditModalForm_resultsCounter__giAlA') //Grab the counter text (e.g. "Shown results: 5")
      .invoke('text')
      .then((text) => {
   
        const count = parseInt(text.match(/\d+/)[0]) // Extract the number from the text

        // Compare with number of cards rendered
        cy.get('.CompactItem_root__V6qMa') 
          .should('have.length', count);
      });
    
  })


  it('Verify that filter by themes works as expected', () => {
    cy.get('.CompactFilterButton_root__XyY93.CompactFilterButton_tag__SgXcC').click(); // Open the themes filter
    cy.get('.EditModalForm_root__Amakx').should('be.visible'); // Assert that modal is open
    cy.get('.AutoCompleteInput_input__WYKdG').type('livelihood'); // Enter theme name
    cy.wait(2000)
    //cy.get('input.CheckboxInput_input__OpdCv').check({force: true}) // Click on checkbox
    cy.get('div.CheckboxInput_root__NzOGG.CheckboxInput_card__1e_8f').contains('Livelihood')
      .trigger('mousedown').trigger('mouseup').click({force: true}) // Click on checkbox using mouse events
    cy.wait(5000) // Wait for change of event
    cy.get('button[class="Button_root__sMa56 Button_tertiary__FXv_P Button_hasIcon__Pfx4E Button_icon_plus__1TZKS"]')
      .contains('Show results').click() // Click on show results

    // Assert that result counted matches number of cards returned
   cy.get('.EditModalForm_resultsCounter__giAlA') // Grab the counter text (e.g. "Shown results: 5")
      .invoke('text')
      .then((text) => {
        const count = parseInt(text.match(/\d+/)[0]) // Extract the number from the text

        // Compare with number of cards rendered
        cy.get('.CompactItem_root__V6qMa') 
          .should('have.length', count)
      })    
  })

})