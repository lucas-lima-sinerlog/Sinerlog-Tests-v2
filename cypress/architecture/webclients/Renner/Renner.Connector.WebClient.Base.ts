import { Env } from "../../environment/environment";
import { ModelBase } from "../../models/Model.Base";
import { Logger } from "../../utils/Logger";

export class RennerConnectorWebClientBase {

    static Request(urlPrefix: string, method: string, object: ModelBase) {

        method == 'GET' ? object.payload = null : Logger.LogRequestBody(object.payload)

        return cy.request({
            method: method,
            url: `${Env.BaseUrl.RennerConnector}${urlPrefix}`,
            body: object.payload,
            headers: {
                'App-Key': 'sinerlog',
                'App-Token': '#p2m1caz59sa',
            },
        });
    }

}