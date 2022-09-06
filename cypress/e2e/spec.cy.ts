/// <reference types="cypress" />

it('shows loading element on scroll', () => {
  cy.visit('0.0.0.0:3000')
  cy.get('.ballanim').should('be.visible')
  cy.get('.ballanim').should('not.be.visible')

  cy.get('.pokemon')
    .should('have.length', 20)
    .then((pokemons) => {
      cy.get('#root').scrollTo('bottom')
      cy.get('.pokemon').should('have.length', pokemons.length * 2)
      cy.wait(1000)
    })

  cy.get('#root').scrollTo('bottom')
  cy.get('.ballanim').should('be.visible')
  cy.get('.ballanim').should('not.be.visible')
  cy.wait(1000)

  cy.get('#root').scrollTo('bottom')
  cy.get('.ballanim').should('be.visible')
  cy.get('.ballanim').should('not.be.visible')
  cy.wait(1000)
})