import { SelectEnvironmentValue } from "../utils/SelectEnvironmentValue"

export class BaseUrl {

    CrossCommerce: string
    Onboarding: string
    SinerlogSafetyTracker: string
    SinerlogHubManagement: string
    Phx: string
    TrackingServices: string
    TrackingAdmin: string
    SinerlogSafetyTrackerAuth: string
    CrossBorderEPortal: string
    SstReceiver: string
    CommerceReceiver: string
    Renner: string
    RennerConnector: string

    constructor() {

        /*
        - DEV
        - HML
        - PROD
        - LOCAL
        */

        this.CrossCommerce = SelectEnvironmentValue(
            'https://crosscommerce-api.dev.sinerlog.log.br/api',
            'https://crosscommerce-api.hml.sinerlog.log.br/api',
            'https://crosscommerce-api.prd.sinerlog.log.br/api',
            'https://localhost:7047/api'
        )

        this.Onboarding = SelectEnvironmentValue(
            'https://onboarding.dev.sinerlog.log.br/api',
            'https://onboarding.hml.sinerlog.log.br/api',
            'https://onboarding.prd.sinerlog.log.br/api',
            'https://localhost:7191/api'
        )

        this.SinerlogSafetyTracker = SelectEnvironmentValue(
            'https://api-sst.dev.sinerlog.log.br/api',
            'https://api-sst.hml.sinerlog.log.br/api',
            'https://sst-api.prd.sinerlog.log.br/api',
            'null'
        )

        this.SinerlogSafetyTrackerAuth = SelectEnvironmentValue(
            'https://api-sst.dev.sinerlog.log.br/oauth/token',
            'https://api-sst.hml.sinerlog.log.br/oauth/token',
            'https://sst-api.prd.sinerlog.log.br/oauth/token',
            'null'
        )

        this.TrackingServices = SelectEnvironmentValue(
            'https://tracking-api.dev.sinerlog.log.br',
            'https://tracking-api.hml.sinerlog.log.br',
            'https://tracking-api.prd.sinerlog.log.br',
            'https://localhost:7163'
        )

        this.TrackingAdmin = SelectEnvironmentValue(
            'https://tracking-admin.dev.sinerlog.log.br/api',
            'https://tracking-admin.hml.sinerlog.log.br/api',
            'https://tracking-admin.prd.sinerlog.log.br/api',
            'https://localhost:7112/api'
        )

        this.SinerlogHubManagement = SelectEnvironmentValue(
            'http://dev.dev.sinerlog.log.br',
            'https://hml.shm.sinerlog.log.br',
            'null',
            'null'
        )

        this.Phx = SelectEnvironmentValue(
            'https://dev.phxservices.com',
            'https://dev.phxservices.com',
            'https://dev.phxservices.com',
            'https://dev.phxservices.com'
        )

        this.SstReceiver = SelectEnvironmentValue(
            'https://sst-receiver.dev.sinerlog.log.br/api/receiver',
            'https://sst-receiver.hml.sinerlog.log.br/api/receiver',
            'https://sst-receiver.prd-hub.sinerlog.log.br/api/receiver',
            'https://sst-receiver.hml.sinerlog.log.br/api/receiver'
        )
        this.CommerceReceiver = SelectEnvironmentValue(
            'https://dev.xuxa.global.br/api',
            '',
            '',
            ''
        )

        this.Renner = SelectEnvironmentValue(
            'https://sandboxmarketplaceapi.lojasrenner.com.br',
            'https://sandboxmarketplaceapi.lojasrenner.com.br',
            'https://sandboxmarketplaceapi.lojasrenner.com.br',
            'https://sandboxmarketplaceapi.lojasrenner.com.br'
        )

        this.RennerConnector = SelectEnvironmentValue(
            'https://sinerlog-renner-connector.dev.sinerlog.log.br',
            'https://sinerlog-renner-connector.dev.sinerlog.log.br',
            'https://sinerlog-renner-connector.dev.sinerlog.log.br',
            'https://sinerlog-renner-connector.dev.sinerlog.log.br'
        )

        this.CrossBorderEPortal = SelectEnvironmentValue('https://portalrfb.dev.sinerlog.log.br', 'null', 'https://trust.sinerlog.global', 'null')

    }
}