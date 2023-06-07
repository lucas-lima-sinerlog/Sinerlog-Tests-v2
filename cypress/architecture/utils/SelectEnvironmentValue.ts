export function SelectEnvironmentValue(dev, hml, prod, local) {
    switch (Cypress.env('env')) {
        case 'dev':
            if (dev == null) throw new Error("null value found.");
            else return dev
        case 'hml':
            if (hml == null) throw new Error("null value found.");
            else return hml
        case 'prod':
            if (prod == null) throw new Error("null value found.");
            else return prod
        case 'local':
            if (local == null) throw new Error("null value found.");
            else return local
        default: throw new Error("Env not found");
    }
}