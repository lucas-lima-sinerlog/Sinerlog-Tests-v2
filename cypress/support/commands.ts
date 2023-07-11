// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkStatusCode', (response: any, statusCode: number) => {
  expect(response.status, 'Response Status:').to.be.equal(statusCode)
});

Cypress.Commands.add('checkFieldEqualty', (response: any, fieldName: string, value: any) => {
  expect(response.body[fieldName], `Reponse field '${fieldName}' validation`).to.be.equal(value)
});

Cypress.Commands.add('checkErrorMessage', (response: any, fieldName: string, message: any) => {
  console.log(response.body.errors[fieldName]);
  
  expect(response.body.errors[fieldName], `Error message validation'`).to.contains(message)
});