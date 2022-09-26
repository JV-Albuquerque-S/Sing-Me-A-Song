beforeEach(() => {
  cy.resetDatabase()
})

describe('Upvote recommendation tests', () => {
  it('upvote a recommendation', () => {
    const body = {
      name: 'Recommendation name',
      link: 'https://www.youtube.com/watch?v=3g_YXE8hT98'
    }

    cy.visit('http://localhost:3000/');

    cy.get('input[placeholder="Name"]').type(body.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(body.link);

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('recommendations');
    cy.get('button').click();

    cy.wait('@recommendations');

    cy.contains(body.name).should('be.visible');

    cy.get('#root article:first div:last svg:first').click();
    cy.get('#root article:first div:last').should('have.text', '1');
  })

  it('downvote a recommendation', () => {
    const body = {
      name: 'Recommendation name',
      link: 'https://www.youtube.com/watch?v=3g_YXE8hT98'
    }

    cy.visit('http://localhost:3000/');

    cy.get('input[placeholder="Name"]').type(body.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(body.link);

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('recommendations');
    cy.get('button').click();

    cy.wait('@recommendations');

    cy.contains(body.name).should('be.visible');

    cy.get('#root article:last div:last svg:last').click();
    cy.get('#root article:first div:last').should('have.text', '-1');
  });

  it('downvote a recommendation to -6 votes', () => {
    const body = {
      name: 'Recommendation name',
      link: 'https://www.youtube.com/watch?v=3g_YXE8hT98'
    }

    cy.visit('http://localhost:3000/');

    cy.get('input[placeholder="Name"]').type(body.name);
    cy.get('input[placeholder="https://youtu.be/..."]').type(body.link);

    cy.intercept('POST', 'http://localhost:5000/recommendations').as('recommendations');
    cy.get('button').click();

    cy.wait('@recommendations');

    cy.contains(body.name).should('be.visible');

    for(let i = 0; i <6; i++){
      cy.get("#root article:last div:last svg:last").click();
    }

    cy.contains(body.name).should('not.exist');
  })
})