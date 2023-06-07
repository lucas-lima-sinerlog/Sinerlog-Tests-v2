import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceProduct extends ModelBase {

    skuCode: string

    constructor() {
        super();
        this.skuCode = faker.string.uuid()
    }
}