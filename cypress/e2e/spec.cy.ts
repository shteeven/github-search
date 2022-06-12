import { QueryItem } from '../../src/app/search/search.models';

describe('Search page', () => {
  it('should show correct messages or results based on search value or response', () => {
    cy.visit('/');
    // Check initial state
    cy.get('[data-test=searchInput]').should('be.visible');
    cy.get('[data-test=resultContent]').should(
      'contain.text',
      'Enter a search'
    );

    // Should show no results message when nothing is returned
    cy.intercept(
      'GET',
      'https://api.github.com/search/repositories**',
      (req) => {
        req.reply({
          total_count: 0,
          items: []
        });
      }
    ).as('apiQuery');

    cy.get('[data-test=searchInput]').type('random{enter}');
    cy.wait('@apiQuery');
    cy.get('[data-test=resultContent]').should('contain.text', ' No results');

    // Should show initial message when search input is cleared
    cy.get('[data-test=searchInput]').clear().type('{enter}');
    cy.get('[data-test=resultContent]').should(
      'contain.text',
      'Enter a search'
    );
  });
});
