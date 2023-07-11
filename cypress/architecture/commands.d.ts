declare namespace Cypress {
  interface Chainable {
    checkStatusCode(response: any, statusCode: number): void;
    checkFieldEqualty(response: any, fieldName: string, value: any): void;
    checkErrorMessage(response: any, fieldName: string, message: any): void;
  }
}