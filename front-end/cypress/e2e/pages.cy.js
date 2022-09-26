describe('Pages navigation test', () => {
  it('Go to Top url', () => {
    cy.visit('http://localhost:3000');
    cy.get('[id=top]').click();
    cy.url().should('equal', 'http://localhost:3000/top');
  });

  it('Go to Random url', () => {
    cy.visit('http://localhost:3000');
    cy.get('[id=random]').click();
    cy.url().should('equal', 'http://localhost:3000/random');
  });

  it('Go to Home url', () => {
    cy.visit('http://localhost:3000/top');
    cy.get('[id=home]').click();
    cy.url().should('equal', 'http://localhost:3000/');
  });
});