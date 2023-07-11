import { CrossCommerceShippingSeller } from "../../architecture/models/CrossCommerce/CrossCommerce.ShippingSeller.Model";
import { SetPayloadFromFixture } from "../../architecture/utils/SetPayloadFromFixture";
import { SetProprietyInPayload } from "../../architecture/utils/SetProprietyInPayload";
import { CrossCommerceShippingSellerWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.ShippingSeller.WebClient";

describe('Create a Active Shipping Seller', () => {

    const crossCommerceShippingSeller = new CrossCommerceShippingSeller()

    it('Creates an Active Shipping Seller', () => {

        SetPayloadFromFixture('CrossCommerce/ShippingSeller/add-crosscommerce-shippingSeller.json', crossCommerceShippingSeller).then(__ => {


            CrossCommerceShippingSellerWebClient.Add(crossCommerceShippingSeller)

        })

    });

    it('Gets the newly created Shipping Seller and validates status field', () => {

        CrossCommerceShippingSellerWebClient.Get(crossCommerceShippingSeller).then(response => {

            expect(response.body.status, 'Shipping Seller "active" field:').to.be.equals(crossCommerceShippingSeller.status)

        })

    });

});

describe('Create a Inactive Shipping Seller', () => {

    const crossCommerceShippingSeller = new CrossCommerceShippingSeller()

    it('Creates an Inactive Shipping Seller', () => {

        crossCommerceShippingSeller.status = 'Inactive'

        SetPayloadFromFixture('CrossCommerce/ShippingSeller/add-crosscommerce-shippingSeller.json', crossCommerceShippingSeller).then(__ => {

            CrossCommerceShippingSellerWebClient.Add(crossCommerceShippingSeller)

        })

    });

    it('Gets the newly created Shipping Seller and validates status field', () => {

        console.log(crossCommerceShippingSeller.status);


        CrossCommerceShippingSellerWebClient.Get(crossCommerceShippingSeller).then(response => {

            expect(response.body.status).to.be.equals(crossCommerceShippingSeller.status)

        })

    });


});

describe('Create a Shipping Seller without "status" field', () => {

    const crossCommerceShippingSeller = new CrossCommerceShippingSeller()

    it('Creates an Inactive Shipping Seller', () => {

        delete crossCommerceShippingSeller.status

        SetPayloadFromFixture('CrossCommerce/ShippingSeller/add-crosscommerce-shippingSeller.json', crossCommerceShippingSeller).then(__ => {

            CrossCommerceShippingSellerWebClient.Add(crossCommerceShippingSeller)

        })

    });

    it('Gets the newly created Shipping Seller and validates status field', () => {

        console.log(crossCommerceShippingSeller.status);


        CrossCommerceShippingSellerWebClient.Get(crossCommerceShippingSeller).then(response => {

            expect(response.body.status).to.be.equals('Active')

        })

    });

});

describe('Create a Shipping Seller and update for Inactive', () => {

    const crossCommerceShippingSeller = new CrossCommerceShippingSeller()

    it('Creates an Inactive Shipping Seller', () => {

        SetPayloadFromFixture('CrossCommerce/ShippingSeller/add-crosscommerce-shippingSeller.json', crossCommerceShippingSeller).then(__ => {

            CrossCommerceShippingSellerWebClient.Add(crossCommerceShippingSeller)

        })

    });

    it('Gets the newly created Shipping Seller and validates status field', () => {


        CrossCommerceShippingSellerWebClient.Get(crossCommerceShippingSeller).then(response => {

            expect(response.body.status).to.be.equals(crossCommerceShippingSeller.status)

        })

    });


    it('Updates the newly created Active Shipping Seller', () => {

        crossCommerceShippingSeller.status = 'Inactive'
        SetProprietyInPayload(crossCommerceShippingSeller, 'status')

        CrossCommerceShippingSellerWebClient.Update(crossCommerceShippingSeller).then(response => {

            cy.checkStatusCode(response, 200)

        })

    });

    it('Gets the newly created Shipping Seller and validates status field', () => {

        CrossCommerceShippingSellerWebClient.Get(crossCommerceShippingSeller).then(response => {

            expect(response.body.status).to.be.equals(crossCommerceShippingSeller.status)

        })

    });

});