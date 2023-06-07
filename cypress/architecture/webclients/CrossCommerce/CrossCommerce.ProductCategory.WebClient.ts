import { CrossCommerceProductCategory } from "../../models/CrossCommerce/CrossCommerce.ProductCategory.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceProductCategoryWebClient extends CrossCommerceWebClientBase {

    static Add(category: CrossCommerceProductCategory) {

        SetProprietyInPayload(category, "name")

        return super.Request('/ProductCategories', "POST", category).then(response => {
          category.id = response.body
        })

    }

}