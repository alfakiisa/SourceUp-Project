describe('Homepage', () => {

  // Define a session to cache the homepage state
  beforeEach('Cache homepage session', () => {
    cy.session('homepage-session', () => {
      cy.visit('https://acc.sourceup.org');
      // Optionally verify the page loaded correctly
      cy.get('body').should('be.visible');
      // Optionally wait for critical elements or API calls
      // cy.intercept('GET', '/api/some-endpoint').as('loadData');
      // cy.wait('@loadData');
    })
  }) 

  it.only('should display the homepage correctly', () => {
    
    // Check if the header title is correct
    cy.get('div[class="IntroBlock_text__Jmy0Z"]')
    .should('have.text', 'Access data, build partnerships, and showcase impact in commodity production regions.')
    .should('be.visible')

  })

 it('Assert presence of key elements like Login and Signup', () => {
  
  // Check if Log In button is present and clickable
  cy.contains('span.Button_inner__U5HsR', 'Log In')
    .should('be.visible')
    .and('not.be.disabled')
    .click()   

  // Check if Sign Up button is present and clickable   
   cy.get('button[type="button"]').contains('Sign Up')
    .should('be.visible')
    .and('not.be.disabled')
    .click()   

    
  // Check if the i18n button is present and clickable
  cy.get('button[type="button"]').contains('en')
    .should('be.visible')
    .and('not.be.disabled')
    .click()   


  // Check if the Participating Organizations link is present
   cy.contains('ul.SUNavigation_navigation__Rrh4c', 'Participating Organizations')
    .should('be.visible')
    .and('have.attr', 'href')
    .click() 

   // Check if the News & Updates link is present and clickable
    cy.contains('ul.SUNavigation_navigation__Rrh4c', 'News & Updates')
    .should('be.visible')
    .and('have.attr', 'href')
    .click() 

  // Check if the Contact link is present and clickable
   cy.contains('ul.SUNavigation_navigation__Rrh4c', 'Contact')
    .should('be.visible')
    .and('have.attr', 'href')
    .click()   
  
  // Check if the Explore Landscapes link is present, clickable and redirects correctly
  cy.contains('a[class="CTAButton_textWrapper__jGsFC"]', 'EXPLORE LANDSCAPES')
    .should('be.visible')
    .and('have.attr', 'href')
    .click()

  // Check if the How it Works link is present
  cy.contains('a[class="CTAButton_textWrapper__jGsFC"]', 'LEARN HOW IT WORKS')
    .should('be.visible')
    .and('have.attr', 'href')
    .click()
    
    
  // Check if the How it works link is present  
   cy.contains('ul.SUNavigation_navigation__Rrh4c', 'For Landscapes')
    .should('be.visible')
    .and('have.attr', 'href')
    .click() 

    

  
  
  // Check if Show Your Landscape link is present and clickable
  cy.contains('button[type="button"]', '[title="Plus Icon"]')
    .should('be.visible')
    .and('not.be.disabled')
    .click()  

  // Check if Show Your Landscape link is present and clickable
  cy.contains('button[type="button"]', '[title="Plus Icon"]')
    .should('be.visible')
    .and('not.be.disabled')
    .click()  


  // Check if Discover Sustainable Initiatives link is present and clickable
  cy.contains('CompactBlockItem_content__frCjq', 'Show Your Landscape', '.Button_inner__U5HsR')
    .should('be.visible')
    .and('not.be.disabled')
    .click()  

  // Check if Show Your Landscape link is present and clickable
  cy.contains('CompactBlockItem_content__frCjq', 'Discover Sustainable Initiatives', '.Button_inner__U5HsR')
    .should('be.visible')
    .and('not.be.disabled')
    .click()  
    

  })
 
  

  it('url Status', () => {
    const urlOne="https://acc.sourceup.org/_next/data/6wiKskVKqVfhC6qp7XzuY/en/about.json?slug=about"
    const urlTwo="https://acc.sourceup.org/_next/data/6wiKskVKqVfhC6qp7XzuY/en/partners.json?slug=partners"

    cy.request(urlOne).then((response) => {
      expect(response.status).to.eq(200);

    cy.request(urlTwo).then((response) => {
      expect(response.status).to.eq(200);
    })
    })

  })

  it("Click on an impact story news card and verify that it navigates to the relevant page", () => {
    
    // Verify that the Latest impact stories is visible
    cy.contains('h2', 'Latest impact stories').should('be.visible');

    // Click on the first news card and verify it redirect to news page
    cy.get(".StoryBlock_inner__DlHLU").eq(0).click()
      .wait(30000);

    cy.location("pathname").should('eq', '/impact-stories/new-newss');  
  })

  it('click on the View more button and verify it navigates to the relevant page and displays relevant news cards', () => {

    // Verify the View more button is visible and click on it
    cy.get("[role='button']").eq(2).should('have.text', 'View more').click()

    // verify it redirects to the impact stories page
    cy.location("pathname").should('eq', '/impact-stories');

    // Verify the heading text
    cy.contains('h1', 'Impact Stories', { timeout: 10000 })
      .should('be.visible');

    // Verify the subheading text
    cy.contains('.Header_content__uHkTU', 'Get inspired by exciting news and updates from landscapes around the globe')
      .should('be.visible');

      //Verify that the news cards have the exact length displayed
      cy.get(".StoryBlock_inner__DlHLU").should('have.length', 60);       

  })

  it('Start a landscape card is visible', () => {

    // Verify the Start a landscape inititive  card is visible and redirects to the page when clicked on
    cy.contains('.CompactBlockItem_title__DpkvR', 'Start a Landscape Initiative')
      .should('be.visible').click();

    cy.location('pathname').should('eq', '/start-a-compact');  

   
  })
  it('Start a landscape card is visible', () => {

    // Verify the Support an initiative card is visible and redirects to the page when clicked on
    cy.contains('.CompactBlockItem_title__DpkvR', 'Support an initiative in your supply chain')
     .should('be.visible').click();
     
     cy.location('pathname').should('eq', '/compacts');

  })

  it('Partners section', () => {

    // Verify that the partner section is visible, cliackable and redirects to the correct page
    cy.contains('.BrandBlock_title__EMQfg', 'Partners').should('be.visible');
    cy.contains('.BrandBlock_desc__BTRkA', 'SourceUp is a collaboration of private and public partners involved in supply chain sustainability.')
      .should('be.visible');
    cy.get('[role="button"]').eq(3).click();  
    cy.location('pathname').should('eq', '/partners');
  })


  it('Footer Section', () => {

cy.get('a[href="mailto:info@sourceup.org"]')
  .should('be.visible')
  .and('have.attr', 'href', 'mailto:info@sourceup.org');


  // Explore Initiatives
  cy.contains('a[href="/compacts"]', 'Explore Initiatives')
    .should('be.visible')
    .scrollIntoView()
    .should('have.attr', 'href', '/compacts');
  cy.contains('a[href="/compacts"]', 'Explore Initiatives').click();
  cy.location('pathname', { timeout: 10000 }).should('eq', '/compacts');
  cy.go('back');
  

  // Start a Landscape Initiative
  cy.contains('a[href="/start-a-compact"]', 'Start a Landscape Initiative')
  .scrollIntoView()
  .should('have.attr', 'href', '/start-a-compact')
  .click({ force: true });

cy.location('pathname', { timeout: 10000 }).should('eq', '/start-a-compact');
cy.go('back');



  // How it works
  cy.contains('a[href="/how-it-works"]', 'How it works')
    .should('be.visible')
    .scrollIntoView()
    .should('have.attr', 'href', '/how-it-works');
  cy.contains('a[href="/how-it-works"]', 'How it works').click();
  cy.location('pathname', { timeout: 10000 }).should('eq', '/how-it-works');
  cy.go('back');
  

  // About
  cy.contains('a[href="/about"]', 'About')
    .should('be.visible')
    .scrollIntoView()
    .should('have.attr', 'href', '/about');
  cy.contains('a[href="/about"]', 'About').click();
  cy.location('pathname', { timeout: 10000 }).should('eq', '/about');
  cy.go('back');
  

  // Resources
  cy.contains('a[href="/how-it-works/resources"]', 'Resources')
    .should('be.visible')
    .scrollIntoView()
    .should('have.attr', 'href', '/how-it-works/resources');
  cy.contains('a[href="/how-it-works/resources"]', 'Resources').click();
  cy.location('pathname', { timeout: 10000 }).should('eq', '/how-it-works/resources');
  cy.go('back');
  

  // Terms of Use
  cy.contains('a[href="/terms-of-use"]', 'Terms of Use')
    .should('be.visible')
    .scrollIntoView()
    .should('have.attr', 'href', '/terms-of-use');
  cy.contains('a[href="/terms-of-use"]', 'Terms of Use').click();
  cy.location('pathname', { timeout: 10000 }).should('eq', '/terms-of-use');
  cy.go('back');
  

  // Privacy Statement
  cy.contains('a[href="/privacy-statement"]', 'Privacy Statement')
    .should('be.visible')
    .scrollIntoView()
    .should('have.attr', 'href', '/privacy-statement');
  cy.contains('a[href="/privacy-statement"]', 'Privacy Statement').click();
  cy.location('pathname', { timeout: 10000 }).should('eq', '/privacy-statement');
  cy.go('back');

});


it('For sourcing and for organisation section', () => {

 cy.contains('a[href="/start-a-compact"]', 'Start a Landscape Initiative')
  .scrollIntoView()
  .should('be.visible')
  .click({ force: true });
 cy.location('pathname').should('eq', '/start-a-compact');
 cy.go('back');

 // Verify that the for the organization button acts accordingly
 cy.contains('a[href="/compacts"]', 'Support an initiative in your supply chain')
  .should('be.visible')
  .and('have.attr', 'href', '/compacts')
  .click();

 cy.location('pathname').should('eq', '/compacts');
 cy.go('back');


  })

})