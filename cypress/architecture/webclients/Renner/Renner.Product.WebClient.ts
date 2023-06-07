import { CrossCommerceProduct } from "../../models/CrossCommerce/CrossCommerce.Product.Model";
import { RennerWebClientBase } from "./Renner.WebClient.base";

export class RennerProductWebClient extends RennerWebClientBase {

    static Get(crossCommerceProduct: CrossCommerceProduct) {

        super.Request(`/connector/generic/v2/pub/product/${crossCommerceProduct.id}`, 'GET', crossCommerceProduct)

    }
}