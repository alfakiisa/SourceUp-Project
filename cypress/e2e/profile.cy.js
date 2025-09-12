import LoginPage from '../support/pageObjects/LoginPage';

describe('Initiative profile/Landscape', () => {

  it('Specify landscape details', () => {
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


  it('Upload picture/video', () => {
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
  
  });


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
  

    cy.get(':nth-child(1) > .CompactDetailGeneralLandscape_image___l0p0').trigger('mouseover')
    cy.get('button.Button_icon_bullets__DRgQ0').eq(3).click({ force: true })


    cy.get('li .OptionMenu_icon__KZL_d.OptionMenu_pencil__zcJLP').click({force: true})

    cy.get('input[name="blobTitle"]').clear().type('New Test Image Upload');
       cy.get('input[name="blobDescription"]')
         .clear()
         .type('This is my New description');
    cy.get('button[form="initiative-gallery-edit"]').click();




  });

  it('Remove picture', () => {
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
  
  
      cy.get(':nth-child(1) > .CompactDetailGeneralLandscape_image___l0p0').trigger('mouseover')
      cy.get('button.Button_icon_bullets__DRgQ0').eq(3).click({ force: true })


      cy.get('.OptionMenu_list__gUcVw > :nth-child(2)').click()
      cy.get('button[form="removal-modal-forms"]').click();
    



  });

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


   it('Add or edit conveners', () => {
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
    cy.get('.OptionMenu_list__gUcVw > :nth-child(4)').click();

    // Select covener Lestari Capital"
     cy.contains('span.CheckboxInput_label__B515S', 'Lestari Capital').click();
     cy.contains('button', 'Save Changes').click();


  });


  it('Add or edit consortiums', () => {
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

    cy.get('.OptionMenu_list__gUcVw > :nth-child(5)').click();
    cy.contains('span.CheckboxInput_label__B515S', 'Forest Positive Coalition').click();
    cy.contains('button', 'Save Changes').click();


  });

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