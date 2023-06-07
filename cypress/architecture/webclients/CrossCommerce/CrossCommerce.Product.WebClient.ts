import { CrossCommerceProduct } from "../../models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductBrand } from "../../models/CrossCommerce/CrossCommerce.ProductBrand.Model";
import { CrossCommerceProductCategory } from "../../models/CrossCommerce/CrossCommerce.ProductCategory.Model";
import { CrossCommerceProductFeature } from "../../models/CrossCommerce/CrossCommerce.ProductFeature.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceProductWebClient extends CrossCommerceWebClientBase {

    static Add(product: CrossCommerceProduct, brand: CrossCommerceProductBrand, category: CrossCommerceProductCategory, feature: CrossCommerceProductFeature) {

        product.payload.productBrandId = brand.id
        product.payload.productCategoryId = category.id
        product.payload.productFeatures = [feature.id]

        SetProprietyInPayload(product, "skuCode")

        return super.Request('/Product', 'POST', product).then(response => {
          product.id = response.body.id
        })

    }

}