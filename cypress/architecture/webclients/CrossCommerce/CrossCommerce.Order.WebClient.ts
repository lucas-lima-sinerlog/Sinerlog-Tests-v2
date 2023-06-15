import { Env } from "../../environment/environment";
import { CrossCommerceOrder } from "../../models/CrossCommerce/CrossComerce.Order.Model";
import { CrossCommerceProduct } from "../../models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductSku } from "../../models/CrossCommerce/CrossCommerce.ProductSku.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceOrderWebClient extends CrossCommerceWebClientBase {

    static GetByCode(order: CrossCommerceOrder) {
        return super.Request(`/Orders?Term=${order.code}`, 'GET', order)
    }

    static Add(order: CrossCommerceOrder, productSkus?: CrossCommerceProductSku[]) {

        SetProprietyInPayload(order, "code")

        if (!productSkus)
            order.payload.items[0].code = Env.CrossCommerce.itemCode
        else {
            order.payload.items = []
            productSkus.forEach((productSku) => {
                const item = {
                    "shippingInsurance": true,
                    "gift": false,
                    "code": productSku.code,
                    "unitPrice": 15,
                    "quantity": 2
                }
                order.payload.items.push(item)
            })
        }

        return super.Request(`/Orders`, 'POST', order)

    }

}