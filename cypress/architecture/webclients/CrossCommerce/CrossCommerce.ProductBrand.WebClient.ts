import { CrossCommerceProductBrand } from "../../models/CrossCommerce/CrossCommerce.ProductBrand.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceProductBrandWebClient extends CrossCommerceWebClientBase {

    static Add(brand: CrossCommerceProductBrand) {

        SetProprietyInPayload(brand, "name")

        return super.Request('/ProductBrands', 'POST', brand).then(response => {
            brand.id = response.body
        })

    }

}