import { CrossCommerceOrder } from "../../architecture/models/CrossCommerce/CrossComerce.Order.Model";
import { CrossCommerceProduct } from "../../architecture/models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductSku } from "../../architecture/models/CrossCommerce/CrossCommerce.ProductSku.Model";
import { SetPayloadFromFixture } from "../../architecture/utils/SetPayloadFromFixture";
import { CrossCommerceOrderWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.Order.WebClient";
import { CrossCommerceProductWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.Product.WebClient";
import { CrossCommerceProductSkuWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.ProductSku.WebClient";

describe.only('Create an order with a Product Sku that exceeds weight', () => {

    const crossCommerceProduct: CrossCommerceProduct = new CrossCommerceProduct
    const crossCommerceProductSku: CrossCommerceProductSku = new CrossCommerceProductSku
    const crossCommerceOrder: CrossCommerceOrder = new CrossCommerceOrder

    const crossCommerceProductSkuList: CrossCommerceProductSku[] = []
    it('Creates a Product', () => {

        SetPayloadFromFixture('CrossCommerce/Product/add-crosscommerce-product.json', crossCommerceProduct).then(__ => {

            CrossCommerceProductWebClient.Add(crossCommerceProduct)

        })

    });

    it('Creates a Product Sku with weigth exceeded', () => {

        SetPayloadFromFixture('CrossCommerce/ProductSku/add-crosscommerce-product-sku.json', crossCommerceProductSku).then(__ => {

            crossCommerceProductSku.weight = 30001

            CrossCommerceProductSkuWebClient.Add(crossCommerceProductSku, crossCommerceProduct).then(__ => {

                crossCommerceProductSkuList.push(crossCommerceProductSku)

            })
        });


 
    });

    it('Creates an Order with this newly created Product Sku', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            CrossCommerceOrderWebClient.Add(crossCommerceOrder, crossCommerceProductSkuList)

        })

    });

});

describe('Create an order with a Product Sku that exceeds height dimension', () => {

    const crossCommerceProduct: CrossCommerceProduct = new CrossCommerceProduct
    const crossCommerceProductSku: CrossCommerceProductSku = new CrossCommerceProductSku
    const crossCommerceOrder: CrossCommerceOrder = new CrossCommerceOrder

    const crossCommerceProductSkuList: CrossCommerceProductSku[] = []

    it('Creates a Product', () => {

        SetPayloadFromFixture('CrossCommerce/Product/add-crosscommerce-product.json', crossCommerceProduct).then(__ => {

            CrossCommerceProductWebClient.Add(crossCommerceProduct)

        })

    });

    it('Creates a Product Sku with height dimension exceeded', () => {

        SetPayloadFromFixture('CrossCommerce/ProductSku/add-crosscommerce-product-sku.json', crossCommerceProductSku).then(__ => {

            crossCommerceProductSku.payload.height = 101

            CrossCommerceProductSkuWebClient.Add(crossCommerceProductSku, crossCommerceProduct).then(__ => {

                crossCommerceProductSkuList.push(crossCommerceProductSku)

            })

        })



    });

    it('Creates an Order with this newly created Product Sku', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            CrossCommerceOrderWebClient.Add(crossCommerceOrder, crossCommerceProductSkuList)

        })

    });

})