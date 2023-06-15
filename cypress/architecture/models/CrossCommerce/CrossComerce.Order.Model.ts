import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceOrder extends ModelBase {
    code: string

    /**
     *
     */
    constructor() {
        super();
        this.code = 'Order-' + faker.string.uuid()
    }
}