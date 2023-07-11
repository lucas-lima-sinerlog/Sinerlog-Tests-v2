import { CrossCommerceShippingSeller } from "../../models/CrossCommerce/CrossCommerce.ShippingSeller.Model";
import { SetProprietyInPayload } from "../../utils/SetProprietyInPayload";
import { CrossCommerceWebClientBase } from "./CrossCommerce.WebClient.Base";

export class CrossCommerceShippingSellerWebClient extends CrossCommerceWebClientBase {

    static Update(shippingSeller: CrossCommerceShippingSeller) {
        return super.Request(`/ShippingSeller/${shippingSeller.id}`, 'PUT', shippingSeller)
    }

    static Add(shippingSeller: CrossCommerceShippingSeller) {

        SetProprietyInPayload(shippingSeller, 'status')
        SetProprietyInPayload(shippingSeller, 'code')

        console.log(shippingSeller.code);
        

        return super.Request('/ShippingSeller', 'POST', shippingSeller).then(response => {
          shippingSeller.id = response.body
        })

    }

    static Get(shippingSeller: CrossCommerceShippingSeller) {

        return super.Request(`/ShippingSeller/${shippingSeller.id}`, 'GET', shippingSeller)

    }

}