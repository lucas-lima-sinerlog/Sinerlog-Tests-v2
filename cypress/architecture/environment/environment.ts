import { BaseUrl } from "./baseurl-model";
import { Tokens } from "./tokens";

 export class Environment {

    Tokens: Tokens
    BaseUrl: BaseUrl

    constructor() {
        this.BaseUrl = new BaseUrl
        this.Tokens = new Tokens
    }
}

export const Env = new Environment()