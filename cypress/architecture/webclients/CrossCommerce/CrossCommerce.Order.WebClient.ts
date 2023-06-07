import { CrossCommerceOrder } from "../../models/CrossCommerce/CrossComerce.Order.Model";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceOrderWebClient extends CrossCommerceWebClientBase {

    static GetByCode(order: CrossCommerceOrder) {
        return super.Request(`/Orders?Term=${order.code}`, 'GET', order)
    }

}