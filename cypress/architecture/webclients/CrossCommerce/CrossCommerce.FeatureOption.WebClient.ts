import { CrossCommerceFeatureOption } from "../../models/CrossCommerce/CrossCommerce.FeatureOption.Model";
import { CrossCommerceProductFeature } from "../../models/CrossCommerce/CrossCommerce.ProductFeature.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceFeatureOptionWebClient extends CrossCommerceWebClientBase {

    static Add(option: CrossCommerceFeatureOption, feature: CrossCommerceProductFeature) {

        SetProprietyInPayload(option, "value")

        option.payload.productFeatureId = feature.id

        return super.Request('/ProductFeatureOption', 'POST', option).then(response => {
            option.id = response.body
        })

    }
}