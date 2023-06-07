import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceProductFeature extends ModelBase {


    constructor() {
        super();
        this.name = `Cy Feature ${faker.string.uuid()}`
    }

}