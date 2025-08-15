import LoginPage from '../support/pageObjects/LoginPage';

describe('Specify landscape details', () => {

  it('Preconditions', () => {
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

    //   Click the FAB and fill the hectare details
    cy.get('.OptionMenu_list__gUcVw > :nth-child(1)').click();
    cy.get('.CompactDetailGeneralLandscapeEditData_rowFull__Vkwmw > .TextInput_root__BhsU5 > label > .TextInput_dom__UzyZG')
      .clear()  
      .type('150000');
    cy.get(':nth-child(2) > .TextInput_root__BhsU5 > label > .TextInput_dom__UzyZG')
      .clear()
      .type('130000');
    cy.get(':nth-child(3) > .TextInput_root__BhsU5 > label > .TextInput_dom__UzyZG')
      .clear()
      .type('110000');  
    cy.get(':nth-child(4) > .TextInput_root__BhsU5 > label > .TextInput_dom__UzyZG')
      .clear()
      .type('60000');
    
    //   Select the years and click submit details button
    cy.get('select[name="forestCoverYear"]')
      .select('2021') 

    cy.get(':nth-child(3) > .Select_root__48_3r > label > .Select_dom__qIHvy')
      .select('2021')

    cy.get(':nth-child(4) > .Select_root__48_3r > label > .Select_dom__qIHvy')  
      .select('2022')
    cy.get('.EditModalFooter_actions___k36X > .Button_tertiary__FXv_P').click();

  });


});