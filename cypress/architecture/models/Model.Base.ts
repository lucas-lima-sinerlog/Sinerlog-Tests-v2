import { faker } from "@faker-js/faker";

export class ModelBase {

    payload: any
    name: string
    id: number
    code: string

    /**
     *
     */
    constructor() {
        this.code = 'Code-' + faker.string.uuid().toUpperCase()
    }

}