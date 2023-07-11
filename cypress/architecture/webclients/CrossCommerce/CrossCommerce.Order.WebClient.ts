import { Env } from "../../environment/environment";
import { CrossCommerceOrder } from "../../models/CrossCommerce/CrossComerce.Order.Model";
import { CrossCommerceProduct } from "../../models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductSku } from "../../models/CrossCommerce/CrossCommerce.ProductSku.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceOrderWebClient extends CrossCommerceWebClientBase {
    static AddAsync(order: CrossCommerceOrder, productSkus?: CrossCommerceProductSku[]) {

        //Feed payload
        SetProprietyInPayload(order, "code")
        order.payload.customer.document = order.customerDocument

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
                    "quantity": 1
                }
                order.payload.items.push(item)
            })
        }

        return super.Request(`/Orders/async`, 'POST', order)

    }

    static GetByCode(order: CrossCommerceOrder) {
        return super.Request(`/Orders?Term=${order.code}`, 'GET', order)
    }

    static Add(order: CrossCommerceOrder, productSkus?: CrossCommerceProductSku[]) {




        order.payload.customer.document = order.customerDocument

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
                    "quantity": 1
                }
                order.payload.items.push(item)
            })
        }
        
        //Feed payload
        SetProprietyInPayload(order, "code")
        SetProprietyInPayload(order, "totalTax")
        SetProprietyInPayload(order, "totalShipping")
        SetProprietyInPayload(order, "totalInsurance")
        SetProprietyInPayload(order, "totalDiscount")
        SetProprietyInPayload(order, "totalItems")
        SetProprietyInPayload(order, "totalAmount")

        return super.Request(`/Orders`, 'POST', order)

    }

}