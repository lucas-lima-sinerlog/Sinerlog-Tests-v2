import { RennerOrderWebClient } from "../../architecture/webclients/Renner/Renner.Order.WebClient";
import { CrossCommerceOrderWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.Order.WebClient";
import { RennerOrder } from "../../architecture/models/Renner/Renner.Order.Model";
import { CrossCommerceOrder } from "../../architecture/models/CrossCommerce/CrossComerce.Order.Model";
import { SetPayloadFromFixture } from "../../architecture/utils/SetPayloadFromFixture";
import { Logger } from "../../architecture/utils/Logger";


describe('Import an Order from Renner Integration and Mark as Paid (All Fields Validation)', () => {

    const rennerOrder = new RennerOrder()
    const crossCommerceOrder = new CrossCommerceOrder()

    it('Creates an Order in Renner', () => {

        SetPayloadFromFixture('Renner/Order/add-renner-order', rennerOrder).then(_ => {
            RennerOrderWebClient.Add(rennerOrder, crossCommerceOrder)
        })

    });

    it('Waits for the Import Order Process', () => {

        cy.wait(30000)

    });

    it('Gets the imported Order in CrossCommerce', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            //Order Validations
            expect(response.body.code).to.be.equals(rennerOrder.marketplaceOrderId.toString(), "Order Code / MarketPlaceId")
            expect(response.body.totalAmount).to.be.equals(rennerOrder.totalAmount, "Order Total Amount / Renner Total Amount")
            expect(response.body.totalShipping).to.be.equals(rennerOrder.shipping.freightAmount, "Order Total Shipping / Renner Freight Amount")

            //Buyer Valitations
            expect(response.body.customer.document).to.be.equals(rennerOrder.buyer.document, "**Customer Document / Buyer Document**")
            expect(response.body.customer.phone).to.be.equals(rennerOrder.buyer.phone, "**Customer Phone / Buyer Phone**")
            expect(response.body.customer.email).to.be.equals(rennerOrder.buyer.email, "**Customer E-mail / Buyer E-mail**")
            expect(response.body.customer.name).to.be.equals(`${rennerOrder.buyer.firstName} ${rennerOrder.buyer.lastName}`, "**Customer Name / Buyer First Name + Last Name**")

            //Items Valitations
            expect(response.body.items).to.have.lengthOf(rennerOrder.commerceItems.length, "Quantidade de Itens");

            response.body.items.forEach((crossCommerceOrderItem, i) => {

                const rennerOrderItem = rennerOrder.commerceItems[i];

                expect(crossCommerceOrderItem.skuCode).to.equal(rennerOrderItem.skuId, `${i + 1}º - CrossCommerce SkuCode / Renner SkuId`);
                expect(crossCommerceOrderItem.quantity).to.equal(rennerOrderItem.quantity, `${i + 1}º - CrossCommerce Quantity / Renner Quantity`);
                expect(crossCommerceOrderItem.price).to.equal(rennerOrderItem.unitAmount, `${i + 1}º - CrossCommerce Price / Renner UnitAmount`);

            });

            //Adress Validations

            //Shipping Address
            expect(+response.body.shippingAddress.number, 'Shipping Address Number').to.be.equals(rennerOrder.shipping.address.number)
            expect(response.body.shippingAddress.complement, 'Shipping Address Complement').to.be.equals(rennerOrder.shipping.address.complement)
            expect(response.body.shippingAddress.countryCode, 'Shipping Address CountryCode').to.be.equals(rennerOrder.shipping.address.country)

            //Billing Address
            expect(+response.body.billingAddress.number, 'Billing Address Number').to.be.equals(rennerOrder.shipping.address.number)
            expect(response.body.billingAddress.complement, 'Billing Address Complement').to.be.equals(rennerOrder.shipping.address.complement)
            expect(response.body.billingAddress.countryCode, 'Billing Address CountryCode').to.be.equals(rennerOrder.shipping.address.country)

            //Adress Validations (from Via Cep)
            cy.request('GET', `https://viacep.com.br/ws/${rennerOrder.shipping.address.postalCode}/json/`).then(viaCepResonse => {
                //Shipping Address
                expect(response.body.shippingAddress.street, 'Shipping Address Street').to.be.equals(viaCepResonse.body.logradouro)
                expect(response.body.shippingAddress.city, 'Shipping Address City').to.be.equals(viaCepResonse.body.localidade)
                expect(response.body.shippingAddress.state, 'Shipping Address State').to.be.equals(viaCepResonse.body.uf)
                expect(response.body.shippingAddress.zipcode.replace(/-/g, ''), 'Shipping Address ZipCode').to.be.equals(viaCepResonse.body.cep.replace(/-/g, ''))
              //  expect(response.body.shippingAddress.neighborhood, 'Shipping Address Neighborhood').to.be.equals(viaCepResonse.body.bairro)

                //Billing Address
                expect(response.body.billingAddress.street, 'Billing Address Street').to.be.equals(viaCepResonse.body.logradouro)
                expect(response.body.billingAddress.city, 'Billing Address City').to.be.equals(viaCepResonse.body.localidade)
                expect(response.body.billingAddress.state, 'Billing Address State').to.be.equals(viaCepResonse.body.uf)
                expect(response.body.billingAddress.zipcode.replace(/-/g, ''), 'Billing Address ZipCode').to.be.equals(viaCepResonse.body.cep.replace(/-/g, ''))
                expect(response.body.billingAddress.neighborhood, 'Billing Address Neighborhood').to.be.equals(viaCepResonse.body.bairro)


            })

        })

    });

    it('Marks the Renner Order as Paid', () => {

        SetPayloadFromFixture('Renner/Order/mark-renner-order-as-paid.json', rennerOrder).then(_ => {
            RennerOrderWebClient.Paid(rennerOrder)
        })

    });

    it('Wait for cancelation integration', () => {

        cy.wait(5000)

    });

    it('Gets the imported Order in CrossCommerce', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(_ => { })

    });



});

describe('Import an Order from Renner Integration and Cancel', () => {

    const rennerOrder: RennerOrder = new RennerOrder
    const crossCommerceOrder: CrossCommerceOrder = new CrossCommerceOrder


    it('Creates an Order in Renner', () => {

        SetPayloadFromFixture('Renner/Order/add-renner-order', rennerOrder).then(_ => {
            RennerOrderWebClient.Add(rennerOrder, crossCommerceOrder)
        })

    });

    it('Waits for the Import Order Process', () => {

        cy.wait(5000)

    });

    it('Gets the imported Order in CrossCommerce', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            //Order Validations
            expect(response.body.code).to.be.equals(rennerOrder.marketplaceOrderId.toString(), "Order Code / MarketPlaceId")
            expect(response.body.totalAmount).to.be.equals(rennerOrder.totalAmount, "Order Total Amount / Renner Total Amount")
            expect(response.body.totalShipping).to.be.equals(rennerOrder.shipping.freightAmount, "Order Total Shipping / Renner Freight Amount")

            //Buyer Valitations
            expect(response.body.customer.document).to.be.equals(rennerOrder.buyer.document, "**Customer Document / Buyer Document**")
            expect(response.body.customer.phone).to.be.equals(rennerOrder.buyer.phone, "**Customer Phone / Buyer Phone**")
            expect(response.body.customer.email).to.be.equals(rennerOrder.buyer.email, "**Customer E-mail / Buyer E-mail**")
            expect(response.body.customer.name).to.be.equals(`${rennerOrder.buyer.firstName} ${rennerOrder.buyer.lastName}`, "**Customer Name / Buyer First Name + Last Name**")

            //Items Valitations
            expect(response.body.items).to.have.lengthOf(rennerOrder.commerceItems.length, "Quantidade de Itens");

            response.body.items.forEach((crossCommerceOrderItem, i) => {

                const rennerOrderItem = rennerOrder.commerceItems[i];

                expect(crossCommerceOrderItem.skuCode).to.equal(rennerOrderItem.skuId, `${i + 1}º - CrossCommerce SkuCode / Renner SkuId`);
                expect(crossCommerceOrderItem.quantity).to.equal(rennerOrderItem.quantity, `${i + 1}º - CrossCommerce Quantity / Renner Quantity`);
                expect(crossCommerceOrderItem.price).to.equal(rennerOrderItem.unitAmount, `${i + 1}º - CrossCommerce Price / Renner UnitAmount`);

            });

        })

    });

    it('Cancels the Renner Order', () => {

        SetPayloadFromFixture('Renner/Order/cancel-renner-order.json', rennerOrder).then(_ => {

            RennerOrderWebClient.Cancel(rennerOrder)

        })

    });

    it('Wait for cancelation integration', () => {

        cy.wait(5000)

    });

    it('Gets the imported Order in CrossCommerce', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            expect(response.body.status).to.be.equals("Canceled")

        })

    });

});