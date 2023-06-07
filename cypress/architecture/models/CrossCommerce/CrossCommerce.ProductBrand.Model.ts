import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceProductBrand extends ModelBase {
    /**
     *
     */
    constructor() {
        super();
        this.name = `Cypress ${faker.company.name()} ${faker.string.uuid()}`
    }
}