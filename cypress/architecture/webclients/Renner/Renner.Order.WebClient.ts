import { RennerOrder } from "../../models/Renner/Renner.Order.Model";
import { CrossCommerceOrder } from "../../models/CrossCommerce/CrossComerce.Order.Model";
import { RennerConnectorWebClientBase } from "./Renner.Connector.WebClient.Base";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";

export class RennerOrderWebClient extends RennerConnectorWebClientBase {

    static Add(order: RennerOrder, crossCommerceOrder: CrossCommerceOrder) {

        SetProprietyInPayload(order, "marketplaceOrderId")
        SetProprietyInPayload(order, "commerceItems")
        SetProprietyInPayload(order, "totalAmount")

        crossCommerceOrder.code = order.marketplaceOrderId.toString()

        super.Request('/Order', 'POST', order)

    }

    static Cancel(order: RennerOrder) { super.Request(`/Order/${order.marketplaceOrderId}/markAsCanceled`, 'PUT', order) }

    static Paid(order: RennerOrder) { super.Request(`/Order/${order.marketplaceOrderId}/markAsPaid`, 'PUT', order) }
    
}