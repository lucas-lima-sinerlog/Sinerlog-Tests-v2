export function SetPayloadFromFixture(fixtureName: string, object: any) {
  return cy.fixture(fixtureName).then((response) => {
    object.payload = response;
  });
}
