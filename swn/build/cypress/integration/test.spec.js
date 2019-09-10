/// <reference types="cypress" />

describe("SWN Tools", () => {

    beforeEach(() => {
        cy.visit("http://localhost:8887", {
            onBeforeLoad(win) {
                cy.stub(win, 'open').as('windowOpen')
            }
        });
    });

    it("has title", () => {
        cy.contains("Login with google")
            .click();

        // cy.contains("Inloggen");

        cy.get('@windowOpen').should('be.calledWith', 'page1.html')

        // cy.window().its('open').should('be.called')

        // cy.get('@windowOpen')
        //     .get("input[name='identifier']")
        //     .type("rster2002dev@gmail.com");
    });

});