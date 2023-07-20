import { SetPayloadFromFixture } from "../../architecture/utils/SetPayloadFromFixture";

describe('Order Split', () => {

    const crossCommerceOrderSplit = new CrossCommerceOrderSplit()

    it('Creates a Splited Order', () => {

        SetPayloadFromFixture('CrossCommerce/OrdersSplit/add-crosscommerce-order-split.json', crossCommerceOrderSplit).then(__ => {

            CrossCommerceOrderSplitWebClient.Add(crossCommerceOrderSplit)

        })

    });

})