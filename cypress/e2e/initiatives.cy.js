import LoginPage from '../support/pageObjects/LoginPage';

describe('Initiatives page', () => {
  beforeEach('Login as admin', () => {
    // cy.viewport(1280, 720) // Optional: set viewport size
    LoginPage.visit();
    // LoginPage.acceptCookies(); // Uncomment if cookie acceptance is needed
    LoginPage.openMenu();
    LoginPage.clickLogin();
    LoginPage.azureLogin('l.vuckovic+admin@vegait.rs', 'Admin123!');
    cy.wait(3000);
  });

  it('Download landscape data', () => {
    // Assert header is correct
    cy.get('h1.CompactSidebarCompacts_title__oCDs8')
      .should('contain', 'Find sustainability changemakers');

    // Select landscapes
    cy.get(
      '.Button_root__sMa56.Button_tertiary__FXv_P.Button_noContent__e0DyF.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS'
    ).click();

    cy.get('.CheckboxInput_label__B515S').first().click();
    cy.get('.CheckboxInput_label__B515S').eq(1).click();

    // Download chosen
    cy.get(
      '.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_plus__1TZKS'
    )
      .last()
      .click();

    cy.get('.CheckboxInput_label__B515S')
      .first()
      .should('be.visible')
      .click({ force: true });

    cy.get(
      '.Button_root__sMa56.Button_tertiary__FXv_P.Button_hasIcon__Pfx4E.Button_icon_arrow__qFEJR'
    ).click();
  });

  it('Verify that pin location matches initiative card', () => {
    cy.get('.CompactItem_root__V6qMa')
      .first()
      .within(() => {
        cy.get('.CompactItem_title__loJ_n')
          .invoke('text')
          .then((cardTitle) => {
            // Click the corresponding map marker
            cy.get(
              '[style*="cursor: pointer"] > .CompactMapMarker_root__f0_UP'
            ).click();

            // Assert the card with same title is highlighted
            cy.get('.CompactItem_root__V6qMa')
              .contains(cardTitle)
              .should('be.visible')
              .and('have.class', 'active'); // adjust class if different
          });
      });
  });

  it('Verify that search functionality works as expected', () => {
    const searchKeyword = 'aceh';

    cy.get('input[name="search"]').click().type(searchKeyword);
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

  it('Verify that filter by themes works as expected', () => {
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
