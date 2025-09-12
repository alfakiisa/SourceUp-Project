import LoginPage from '../support/pageObjects/LoginPage';

describe('Initiatives page', () => {
  beforeEach('Valid Login', () => {
     // Clear cookies before running the test
     cy.clearCookies();
     LoginPage.visit();
     // LoginPage.acceptCookies();
     LoginPage.openMenu();
     LoginPage.clickLogin();
     LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!');
   });
  
  /*
  before(() => {
  cy.session('admin', () => {
    // Visit your app
    cy.visit('https://acc.sourceup.org');

    // Start login flow
    LoginPage.openMenu();
    LoginPage.clickLogin();

    // Handle Azure B2C login
    cy.origin('https://idhsourceup.b2clogin.com', () => {
      // These commands run inside the Azure login page
      cy.get('#email').type('l.vuckovic+admin@vegait.rs');
      cy.get('#password').type('Admin123!');
      cy.get('#next').click();
    });

    // After login, Cypress returns to your app origin
    cy.url().should('include', '/dashboard'); // assert login success
    });
  });


  beforeEach(() => {
    cy.session('admin'); // restore the session before each test
  });
 */

  it('Download landscape data', () => {
    // Assert header is correct
    cy.get('.IntroBlock_text__Jmy0Z')
      .should('contain', 'Access data, build partnerships, and showcase impact in commodity production regions.');
 
      // Go to landscapes
    cy.get('.CTAButton_button__dsjzD').first().click();

    // Click on FAB
    cy.get('button[class="Button_root__sMa56 Button_tertiary__FXv_P Button_noContent__e0DyF Button_hasIcon__Pfx4E Button_icon_plus__1TZKS"]').click()
    
    // Select landscape data to download 
    cy.get('.CheckboxInput_label__B515S').first().click();
    cy.get('.CheckboxInput_label__B515S').eq(1).click();

    // Click on Download chosen
    cy.get('.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS')
      .last().click();

    // Click on Select All checkbox  
    cy.get('.CheckboxInput_label__B515S')
      .first()
      .should('be.visible')
      .click({ force: true });

    // Click on Proceed to Download button
    cy.get(
      '.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_arrow__qFEJR'
    ).click();
  });


  it('Verify that pin location matches initiative card', () => {

    // Go to landscapes
    cy.get('.CTAButton_button__dsjzD').first().click();

    // Locate first compact card
    cy.get('.CompactItem_root__V6qMa.CompactItem_childStyles__0G4hk')
      .first().should('be.visible')
      .within(() => {
        cy.get('.CompactItem_title__loJ_n')
          .invoke('text')
          .then((cardTitle) => {
            // Click the corresponding map marker
            cy.get('.CompactMapMarker_root__f0_UP').first().click({force:true});

            // Assert the card with same title is highlighted
            cy.get('.CompactItem_root__V6qMa')
              .contains(cardTitle.trim())
              .should('be.visible')
              .and('have.class', 'active'); // adjust class if different
          });
      });
  });


  it('Verify that search functionality works as expected', () => {
    const searchKeyword = 'aceh';

      // Got to landscapes
    cy.get('.CTAButton_button__dsjzD').first().click();

    cy.get('input[name="search"][class="TextInput_dom__UzyZG"]').click().type(searchKeyword);
    cy.wait(3000);

    cy.get('a.CompactItem_root__V6qMa').each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .then((text) => {
          if (text.toLowerCase().includes(searchKeyword.toLowerCase())) {
            expect(text.toLowerCase()).to.include(searchKeyword.toLowerCase());
          } else {
            cy.log(`Skipping card: "${text}"`);
          }
        });
    });
  });

  it('Verify that filter by collections dropdown works as expected', () => {

    // Go to landscapes
    cy.get('.CTAButton_button__dsjzD').first().click();

    // Open dropdown
    cy.get('#select-collections').click();

    // Assert dropdown menu visible
    cy.get('#react-select-select-collections-listbox').should('be.visible');

    // Assert expected options exist
    const expectedOptions = [
      'Local Indicators',
      'Forest Positive Coalition',
      'LandScale',
      'NISCOPS',
      'Laudes Foundation',
    ];

    cy.wrap(expectedOptions).each((option) => {
      cy.get('#react-select-select-collections-listbox')
        .contains(option)
        .should('exist');
    });

    // Filtering behavior
    cy.get('#select-collections').type('Land');

    cy.get('#react-select-select-collections-listbox')
      .should('contain.text', 'LandScale')
      .and('not.contain.text', 'Local Indicators')
      .and('not.contain.text', 'Forest Positive Coalition')
      .and('not.contain.text', 'NISCOPS')
      .and('not.contain.text', 'Laudes Foundation');

    // Select filtered option
    cy.contains('#react-select-select-collections-listbox', 'LandScale').click();

    // Assert selection
    cy.get('.MultiSelect_container__y5jHm').should('contain.text', 'LandScale');
  });

  it('Verify that filter by country works as expected', () => {

    // Go to landscapes
    cy.get('.CTAButton_button__dsjzD').first().click();

    // Open country filter
    cy.get(
      '.CompactFilterButton_root__XyY93.CompactFilterButton_earth__kMOBD'
    ).click();

    cy.get('.EditModalForm_root__Amakx').should('be.visible');

    // Search and select Indonesia
    cy.get('.AutoCompleteInput_input__WYKdG').type('indonesia');
    cy.get(
      'div.CheckboxInput_root__NzOGG.CheckboxInput_card__1e_8f'
    ).contains('Indonesia')
      .trigger('mousedown')
      .trigger('mouseup')
      .click();

    cy.wait(5000);

    cy.get(
      'button.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS'
    )
      .contains('Show results')
      .click();

    // Compare counter with number of results
    cy.get('.EditModalForm_resultsCounter__giAlA')
      .invoke('text')
      .then((text) => {
        const count = parseInt(text.match(/\d+/)[0]);
        cy.get('.CompactItem_root__V6qMa').should('have.length', count);
      });
  });

  it('Verify that filter by commodity works as expected', () => {

    // Go to landscapes
    cy.get('.CTAButton_button__dsjzD').first().click();

    // Open commodity filter
    cy.get(
      '.CompactFilterButton_root__XyY93.CompactFilterButton_plant__ifOJV'
    ).click();

    cy.get('.EditModalForm_root__Amakx').should('be.visible');

    // Search and select Avocado
    cy.get('.AutoCompleteInput_input__WYKdG').type('avocado');
    cy.get('div.AutoCompleteInput_checkbox__0FV9d')
      .trigger('mousedown')
      .trigger('mouseup')
      .click({ force: true });

    cy.wait(5000);

    cy.get(
      'button.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS'
    )
      .contains('Show results')
      .click();

    // Compare counter with number of results
    cy.get('.EditModalForm_resultsCounter__giAlA')
      .invoke('text')
      .then((text) => {
        const count = parseInt(text.match(/\d+/)[0]);
        cy.get('.CompactItem_root__V6qMa').should('have.length', count);
      });
  });

  it.only('Verify that filter by themes works as expected', () => {

    // Go to landscapes
    cy.get('.CTAButton_button__dsjzD').first().click();

    // Open themes filter
    cy.get(
      '.CompactFilterButton_root__XyY93.CompactFilterButton_tag__SgXcC'
    ).click();

    cy.get('.EditModalForm_root__Amakx').should('be.visible');

    // Search and select Livelihood
    cy.get('.AutoCompleteInput_input__WYKdG').type('livelihood');
    cy.wait(2000);

    cy.get(
      'div.CheckboxInput_root__NzOGG.CheckboxInput_card__1e_8f'
    ).contains('Livelihood')
      .trigger('mousedown')
      .trigger('mouseup')
      .click({ force: true });

    cy.wait(5000);

    cy.get(
      'button.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS'
    )
      .contains('Show results')
      .click();

    // Compare counter with number of results
    cy.get('.EditModalForm_resultsCounter__giAlA')
      .invoke('text')
      .then((text) => {
        const count = parseInt(text.match(/\d+/)[0]);
        cy.get('.CompactItem_root__V6qMa').should('have.length', count);
      });
  });
});
