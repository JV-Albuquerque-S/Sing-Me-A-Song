beforeEach(() => {
  cy.resetDatabase()
})

describe('Post recommendation tests', () => {
  it('Post a new recommendation', () => {
    const body = {
      name: 'Recommendation name',
      link: 'https://www.youtube.com/watch?v=3g_YXE8hT98'
    }

    cy.visit('http://localhost:3000/');

    cy.intercept("get", 'http://localhost:5000/recommendations').as('getRecommendations');
    cy.wait("@getRecommendations");

    cy.get('input[placeholder="Name"]').type(body.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(body.link);

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('recommendations');
    cy.get('button').click();

    cy.wait('@recommendations');

    cy.contains('Recommendation name').should('be.visible');
  });

  it('Post a repeated recommendation', () => {
    const body = {
      name: 'Recommendation name',
      link: 'https://www.youtube.com/watch?v=3g_YXE8hT98'
    }

    cy.visit('http://localhost:3000/');

    cy.intercept("get", 'http://localhost:5000/recommendations').as('getRecommendations');
    cy.wait("@getRecommendations");

    cy.get('input[placeholder="Name"]').type(body.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(body.link);

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('recommendations');
    cy.get('button').click();

    cy.get('input[placeholder="Name"]').type(body.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(body.link);

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('recommendations');
    cy.get('button').click();

    cy.wait('@recommendations');

    cy.get("article").should("have.length", 1);
  })
})