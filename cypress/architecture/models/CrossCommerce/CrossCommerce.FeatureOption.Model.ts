import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";

export class CrossCommerceFeatureOption extends ModelBase {

    value: string

    constructor() {
        super();
        this.value = faker.word.adjective()

    }

}