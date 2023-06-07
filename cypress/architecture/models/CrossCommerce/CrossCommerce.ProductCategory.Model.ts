import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceProductCategory extends ModelBase {

    /**
     *
     */
    constructor() {
        super();
        this.name = `Cypress ${faker.commerce.department()} ${faker.string.uuid()}`
    }

}