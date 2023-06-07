import { Env } from "../../environment/environment";
import { ModelBase } from "../../models/Model.Base";
import { Logger } from "../../utils/Logger";

export class RennerWebClientBase {

    static Request(urlPrefix: string, method: string, object: ModelBase) {

        method == 'GET' ? object.payload = null : Logger.LogRequestBody(object.payload)

        return cy.request({
            method: method,
            url: `${Env.BaseUrl.Renner}${urlPrefix}`,
            body: object.payload,
            headers: {
                'Authorization': `Bearer ${Cypress.env('rennerBearerToken')}`
            }
        }).then(response => {
            Logger.LogResponseBody(response.body)
            return cy.wrap(response, { log: false })
        });
    }

    static Auth() {
        return cy.request({
            method: 'POST',
            url: `${Env.BaseUrl.Renner}/oauth/token`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic c2luZXJsb2c6I3AybTFjYXo1OXNh',
            },
            failOnStatusCode: false,
            form: true,
            body: {
                'grant_type': 'client_credentials'
            }
        }).then(response => {
            Logger.LogResponseBody(response.body)
            Cypress.env('rennerBearerToken', response.body.access_token)
            expect(response.status).to.be.equals(200, "Authorization")
        })
    }

}