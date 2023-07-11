export function SetProprietyInPayload(object, field) {
    object.payload[field] = object[field];
    cy.log(`**Values**\n**Field**: ${field}\n**Value setted**: ${object[field]}`)
}