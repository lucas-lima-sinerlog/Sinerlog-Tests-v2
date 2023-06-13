import { CrossCommerceFeatureOption } from "../../models/CrossCommerce/CrossCommerce.FeatureOption.Model";
import { CrossCommerceProduct } from "../../models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductSku } from "../../models/CrossCommerce/CrossCommerce.ProductSku.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceProductSkuWebClient extends CrossCommerceWebClientBase {

    static Add(productSku: CrossCommerceProductSku, product: CrossCommerceProduct, featureOption: CrossCommerceFeatureOption) {

        // Dependencies feed
        productSku.payload.productFeaturesOptions = [featureOption.id]

        // Sku feed
        SetProprietyInPayload(productSku, 'code')
        SetProprietyInPayload(productSku, 'ean')
        SetProprietyInPayload(productSku, 'price')
        SetProprietyInPayload(productSku, 'width')
        SetProprietyInPayload(productSku, 'height')
        SetProprietyInPayload(productSku, 'length')
        SetProprietyInPayload(productSku, 'weigth')

        // Request
        return super.Request(`/ProductSku/${product.id}`, 'POST', productSku).then(response => {
            productSku.id = response.body
        })

    }

    static Update(productSku: CrossCommerceProductSku, product: CrossCommerceProduct) {

        SetProprietyInPayload(productSku, 'code')
        SetProprietyInPayload(productSku, 'ean')
        SetProprietyInPayload(productSku, 'price')
        SetProprietyInPayload(productSku, 'width')
        SetProprietyInPayload(productSku, 'height')
        SetProprietyInPayload(productSku, 'length')
        SetProprietyInPayload(productSku, 'weight')

        return super.Request(`/ProductSku/${product.id}/${productSku.id}`, 'PUT', productSku)

    }

}