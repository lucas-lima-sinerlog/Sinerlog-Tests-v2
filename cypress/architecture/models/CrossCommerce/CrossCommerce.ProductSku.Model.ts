import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceProductSku extends ModelBase {

    height: number
    length: number
    price: number
    width: number
    weigth: number

    ean: string

    constructor() {
        super();
        this.code = faker.commerce.product().toUpperCase() + faker.string.uuid().replace(/-/g, '').toUpperCase();
        this.ean = faker.string.numeric(18)
        this.price = faker.number.float({precision: 0.1 , min: 1, max: 5000})
        this.width = faker.number.float({precision: 0.1 , min: 10, max: 500})
        this.height = faker.number.float({precision: 0.1 , min: 10, max: 500})
        this.length = faker.number.float({precision: 0.1 , min: 10, max: 500})
        this.weigth = faker.number.int(100)
    }


    UpdadeProductSkuInfo() {
        this.code = faker.commerce.product().toUpperCase() + faker.string.uuid().replace(/-/g, '').toUpperCase();
        this.ean = faker.string.numeric(18)
        this.price = +faker.commerce.price()
        this.width = faker.number.float({precision: 0.1 , min: 10, max: 20})
        this.height = faker.number.float({precision: 0.1 , min: 10, max: 20})
        this.length = faker.number.float({precision: 0.1 , min: 10, max: 20})
        this.weigth = faker.number.int(100)
    }
}