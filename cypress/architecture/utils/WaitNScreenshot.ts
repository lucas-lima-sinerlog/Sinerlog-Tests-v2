export function WaitNScreenshot(scenarioName, entityName, step) {
    cy.wait(2000).screenshot(`${entityName}/${scenarioName}/${step}`, {overwrite: true})
}