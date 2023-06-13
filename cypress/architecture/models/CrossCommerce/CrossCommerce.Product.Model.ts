import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceProduct extends ModelBase {

    skuCode: string
    description: string

    constructor() {
        super();
        this.name = faker.commerce.productName()
        this.skuCode = faker.string.uuid()
        this.description = this.name + ' ' + faker.commerce.productDescription() 
    }

    UpdateProductInfo() {
        this.skuCode = this.skuCode+'UPDATED'
    }
}