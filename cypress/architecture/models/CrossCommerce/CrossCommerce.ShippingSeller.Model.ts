import { ModelBase } from "../Model.Base";

export class CrossCommerceShippingSeller extends ModelBase {

    status: string

    /**
     *
     */
    constructor() {
        super();
        this.status = 'Active'
        
    }

}