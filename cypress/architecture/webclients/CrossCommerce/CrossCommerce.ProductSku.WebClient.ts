import { CrossCommerceFeatureOption } from "../../models/CrossCommerce/CrossCommerce.FeatureOption.Model";
import { CrossCommerceProduct } from "../../models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductSku } from "../../models/CrossCommerce/CrossCommerce.ProductSku.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceProductSkuWebClient extends CrossCommerceWebClientBase {

    static Add(productSku: CrossCommerceProductSku, product: CrossCommerceProduct, featureOption: CrossCommerceFeatureOption) {

        productSku.payload.productFeaturesOptions = [featureOption.id]

        SetProprietyInPayload(productSku, 'code')
        SetProprietyInPayload(productSku, 'ean')

        return super.Request(`/ProductSku/${product.id}`, 'POST', productSku)

    }

}