import { CrossCommerceProductFeature } from "../../models/CrossCommerce/CrossCommerce.ProductFeature.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceProductFeatureWebClient extends CrossCommerceWebClientBase {

    static Add(feature: CrossCommerceProductFeature) {

        SetProprietyInPayload(feature, "name")

        return super.Request('/ProductFeature', 'POST', feature).then(response => {
            feature.id = response.body
            return cy.wrap(response, { log: false })
        })

    }

}