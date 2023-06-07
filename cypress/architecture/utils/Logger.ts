export class Logger {
    static LogResponseBody(response) {
        cy.log(`**Response body:** ${JSON.stringify(response)}`)


    }
    static LogRequestBody(payload) {
        if (Cypress.env('debug'))
            cy.log(`**Request body:** ${JSON.stringify(payload)}`)
    }
}


