import { ModelBase } from "../Model.Base";
import { faker } from '@faker-js/faker';

export interface Buyer {
    documentType: string;
    document: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}


export class RennerOrder extends ModelBase {

    marketplaceOrderId: number;
    totalAmount: number;
    status: string;
    createdDate: string;
    updatedDate: string;
    buyer: Buyer
    commerceItems: {
        skuId: string;
        quantity: number;
        unitAmount: number;
    }[];
    payments: {
        method: string;
        status: string;
        amount: number;
        installments: number;
        paymentIdentifier: string;
    }[];
    shipping: {
        type: string;
        freightAmount: number;
        status: string;
        estimatedDeliveryDate: string;
        estimatedDaysToDelivery: number;
        carrier: string;
        carrierServiceCode: string;
        address: {
            postalCode: number;
            street: string;
            number: number;
            complement: string;
            reference: string;
            neighborhood: string;
            city: string;
            state: string;
            country: string;
        };
        invoices: {
            type: string;
            number: string;
            key: string;
            amount: string;
            url: string;
            issueDate: string;
            cfop: string;
            volumes: string;
            items: {
                skuId: string;
                quantity: number;
                unitAmount: number;
            }[];
        }[];
        trackingInfos: {
            url: string;
            number: string;
        }[];
        trackingStatuses: {
            eventDate: string;
            status: string;
            description: string | null;
        }[];
    };
    marketplace: {
        name: string;
        cnpj: string;
    };

    constructor() {
        super();
        this.marketplaceOrderId = +faker.string.numeric(9);
        this.status = "NEW";
        this.createdDate = "2020-01-09T20:48:33.809";
        this.updatedDate = "2020-01-18T10:02:39.332714";
        this.buyer = {
            documentType: "CPF",
            document: "02398696057",
            email: "email@email.com",
            firstName: "Joaquim",
            lastName: "Da silva martins",
            phone: "53987665376"
        };
        this.commerceItems = [
            {
                skuId: "CyCode3dcf894d-c429-483c-8df4-a8c41d725363",
                quantity: 2,
                unitAmount: 3.5
            },
            {
                skuId: "CyCode3dcf894d-c429-483c-8df4-a8c41d725363",
                quantity: 2,
                unitAmount: 3.5
            },
            {
                skuId: "CyCode3dcf894d-c429-483c-8df4-a8c41d725363",
                quantity: 2,
                unitAmount: 3.5
            }
        ];
        this.payments = [
            {
                method: "creditCard",
                status: "INITIAL",
                amount: 22.4,
                installments: 2,
                paymentIdentifier: "8441066803"
            }
        ];
        this.shipping = {
            type: "Standard",
            freightAmount: 3.5,
            status: "NEW",
            estimatedDeliveryDate: "2023-06-20T03:00:00.0000",
            estimatedDaysToDelivery: 7,
            carrier: "CORREIOS",
            carrierServiceCode: "PAC",
            address: {
                postalCode: 96200320,
                street: "Av. Bandeirantes",
                number: 123,
                complement: "Apt. 2",
                reference: "Posto de Gásolina Camicado Petrolio e Gás",
                neighborhood: "Centro",
                city: "Pelotas",
                state: "RS",
                country: "BR"
            },
            invoices: [
                {
                    type: "INPUT",
                    number: "99999984749464",
                    key: "31200159717553000617550020015969741003718197",
                    amount: "",
                    url: "sefaz.rs.gov.br/consultasuanota",
                    issueDate: "2020-01-09T03:00:00.000",
                    cfop: "1.102",
                    volumes: "0",
                    items: [
                        {
                            skuId: "123",
                            quantity: 2,
                            unitAmount: 3.5
                        }
                    ]
                }
            ],
            trackingInfos: [
                {
                    url: "https://www2.correios.com.br/sistemas/rastreamento/default.cfm",
                    number: "BR555111"
                }
            ],
            trackingStatuses: [
                {
                    eventDate: "2020-01-17T17:11:22.393",
                    status: "SHIPPED",
                    description: null
                }
            ]
        };
        this.marketplace = {
            name: "Camicado",
            cnpj: "03.002.339/0001-15"
        };

        this.totalAmount = this.shipping.freightAmount + this.commerceItems.reduce((acc, item) => acc + item.quantity * item.unitAmount, 0)
    }
}
