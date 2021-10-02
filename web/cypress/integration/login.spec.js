describe('login tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9998/');
    });

    it('sign in with email', () => {
        cy.get('.index-module--container--1TK4P').click();
        cy.get('.index-module--button--36ycx').click();
        cy.get('#username').type(Cypress.env("email"));
        cy.get('#password').type(Cypress.env("password"));
        cy.get('.MuiButtonBase-root').click();
        cy.get('div:nth-child(2) > form').submit();
        cy.url().should("eq", "http://localhost:9998/admin/#/potassium-argon-age-calculations");
    });

    afterEach(() => {
    });
});
