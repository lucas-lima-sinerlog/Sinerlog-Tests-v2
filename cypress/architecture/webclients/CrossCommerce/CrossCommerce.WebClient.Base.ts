import { ApiKey } from "../../enums/apiKey";
import { Env } from "../../environment/environment";
import { ModelBase } from "../../models/Model.Base";
import { Logger } from "../../utils/Logger";

export class CrossCommerceWebClientBase {

    static Request(urlPrefix: string, method: string, object: ModelBase) {

        Logger.LogRequestBody(object.payload)

        return cy.request({
            method: method,
            url: `${Env.BaseUrl.CrossCommerce}${urlPrefix}`,
            body: object.payload,
            headers: { 'ApiKey': ApiKey.Sinerlog, }
        }).then(response => {
            Logger.LogResponseBody(response.body)
            return cy.wrap(response, { log: false })
        });
    }

}