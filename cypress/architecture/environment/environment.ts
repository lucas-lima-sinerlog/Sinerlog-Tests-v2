import { CrossCommerce } from "./CrossCommerce.Env";
import { BaseUrl } from "./baseurl-model";
import { Tokens } from "./tokens";

 export class Environment {

    Tokens: Tokens
    BaseUrl: BaseUrl
    CrossCommerce: CrossCommerce

    constructor() {
        this.BaseUrl = new BaseUrl
        this.Tokens = new Tokens
        this.CrossCommerce = new CrossCommerce
    }
}

export const Env = new Environment()