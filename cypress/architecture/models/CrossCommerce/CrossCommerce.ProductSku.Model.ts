import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceProductSku extends ModelBase {

    ean: string

    constructor() {
        super();
        this.code = faker.commerce.product().toUpperCase() + faker.string.uuid().replace(/-/g, '').toUpperCase();
        this.ean = faker.string.numeric(18)
    }
}