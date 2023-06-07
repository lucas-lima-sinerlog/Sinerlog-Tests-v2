export function SetProprietyInPayload(object, field) {
    object.payload[field] = object[field];
}