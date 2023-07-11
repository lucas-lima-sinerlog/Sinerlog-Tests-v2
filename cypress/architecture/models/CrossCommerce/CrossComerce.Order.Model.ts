import { faker } from "@faker-js/faker";
import { ModelBase } from "../Model.Base";
import { DOCUMENTS } from "../../constants/Documents";

export interface Payments {
    method: string,
    cardBrand: string,
    total: number,
    transactionId: number,
    currency: string
}

export class CrossCommerceOrder extends ModelBase {

    code: string
    customerDocument: string
    payments: Payments
    totalAmount: number;
    totalItems: number = 0
    totalTax: number;
    totalShipping: number;
    totalInsurance: number;
    totalDiscount: number;

    constructor() {
        super();
        this.code = 'Order-' + faker.string.uuid()
        this.customerDocument = DOCUMENTS.REGULAR
        this.totalTax = faker.number.int({max: 100})
        this.totalShipping = faker.number.int({max: 100})
        this.totalInsurance = faker.number.int({max: 100})
        this.totalDiscount = faker.number.int({max: 5})


        // Payments
        this.payments = {
            method: "",
            cardBrand: "",
            total: 0,
            transactionId: 0,
            currency: ""
        };

        this.payments.currency = "BRL"
        this.payments.transactionId = 1
        this.payments.total = 135
        this.payments.method = "CreditCard"
        this.payments.cardBrand = "Visa"

    }

    CalculateTotalAmount() {
        for (const item of this.payload.items) {
            this.totalItems += item.unitPrice;
          }
        this.totalAmount = this.totalItems + this.totalTax + this.totalShipping + this.totalInsurance - this.totalDiscount
    }

}
