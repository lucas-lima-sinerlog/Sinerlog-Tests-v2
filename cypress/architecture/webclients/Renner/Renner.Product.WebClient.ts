import { CrossCommerceProduct } from "../../models/CrossCommerce/CrossCommerce.Product.Model";
import { RennerWebClientBase } from "./Renner.WebClient.Base";

export class RennerProductWebClient extends RennerWebClientBase {

    static Get(crossCommerceProduct: CrossCommerceProduct) {

        return super.Request(`/connector/generic/v2/pub/product/${crossCommerceProduct.id}`, 'GET', crossCommerceProduct)

    }
}