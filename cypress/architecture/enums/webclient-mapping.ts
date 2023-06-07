import { CrossCommerceFeature } from "../models/CrossCommerce/crosscommerce-feature-model";
import { CrossCommerceFeatureOption } from "../models/CrossCommerce/crosscommerce-feature-option-model";
import { Product } from "../models/CrossCommerce/product-model";
import { ProductSku } from "../models/CrossCommerce/product-sku-model";
import { Provider } from "../models/tracking-admin/provider-model";
import { Entities, Entity, findEntity, setEntity } from "../support/step_definitions/entity-common-step";
import { RennerProductWebClient } from "../webclients/Renner/renner-product-webclient";
import { CrossCommerceCategoryWebClient } from "../webclients/cross-commerce/category-webclient";
import { CrossCommerceBrandWebClient } from "../webclients/cross-commerce/crosscommerce-brand-webclient";
import { CrossCommerceFeatureOptionWebClient } from "../webclients/cross-commerce/crosscommerce-feature-option-webclient";
import { CrossCommerceFeatureWebClient } from "../webclients/cross-commerce/crosscommerce-feature-webclient";
import { CrossCommerceTrackingWebClient } from "../webclients/cross-commerce/crosscommerce-tracking-webclient";
import { LabelWebClient } from "../webclients/cross-commerce/label-webclient";
import { OrderWebClient } from "../webclients/cross-commerce/order-webclient";
import { ProductSkuWebClient } from "../webclients/cross-commerce/product-sku-webclient";
import { ProductWebClient } from "../webclients/cross-commerce/product-webclient";
import { SaleChannelWebClient } from "../webclients/cross-commerce/sale-channel-webclient";
import { ShippingListWebClient } from "../webclients/cross-commerce/shipping-list-webclient";
import { ShippingSellerWebClient } from "../webclients/cross-commerce/shipping-seller-webclient";
import { NotificationUrlWebClient } from "../webclients/onboarding/notification-url-webclient";
import { BagWebClient } from "../webclients/sinerlog-safety-tracker/bag-webclient";
import { FlightWebClient } from "../webclients/sinerlog-safety-tracker/flight-webclient";
import { PackageWebClient } from "../webclients/sinerlog-safety-tracker/package-webclient";
import { SkyhubOrderWebclient } from "../webclients/sky-hub/skyhub-order-webclient";
import { ProviderWebClient } from "../webclients/tracking-admin/provider-webclient";
import { TrackingAdminAccountWebClient } from "../webclients/tracking-admin/tracking-admin-account-webclient";
import { TrackingWebClient } from "../webclients/tracking-services/tracking-webclient";
import { RennerOrderWebClient } from "../webclients/Renner/renner-order-webclient";
import { CrossCommerceBrand } from "../models/CrossCommerce/crosscomerce-brand-model";

export const webClientMap = {
    TrackingAdmin: {
        Account: {
            params: () => { return [Entity]; },
            Create: TrackingAdminAccountWebClient.Add,
            Get: TrackingAdminAccountWebClient.Get,
            Update: TrackingAdminAccountWebClient.Update,
        },
        Provider: {
            params: () => { return [Entity]; },
            Create: ProviderWebClient.Add,
            Get: ProviderWebClient.Get,
            AddEvent: ProviderWebClient.AddEvent,
            GetSinerlogEvent: ProviderWebClient.GetSinerlogEvent,
        },
    },
    TrackingApi: {
        Tracking: {
            params: () => { return [Entity, findEntity(Provider, Entities)]; },
            Create: TrackingWebClient.Add,
            Get: TrackingWebClient.Get,
            GetByProviderCode: TrackingWebClient.GetByProviderToken,
            AddEventCode: TrackingWebClient.AddEventCode,
            AddEvent: TrackingWebClient.AddEvent,
            AddTrackingProvider: TrackingWebClient.AddTrackingProvider,
        },
    },
    SinerlogSafetyTracker: {
        Package: {
            params: () => { return [Entity]; },
            Create: PackageWebClient.Add,
            Get: PackageWebClient.Get,
            Delete: PackageWebClient.Delete,
        },
        Bag: {
            params: () => { return [Entity]; },
            Create: BagWebClient.Add,
            Delete: BagWebClient.Delete,
        },
        Flight: {
            params: () => { return [Entity]; },
            Create: FlightWebClient.Add,
            "Pre-Alert": FlightWebClient.PreAlert,
            Delete: FlightWebClient.Delete,
        },
    },
    CrossCommerce: {
        ShippingSeller: {
            params: () => { return [Entity]; },
            Create: ShippingSellerWebClient.Add,
            Update: ShippingSellerWebClient.Update,
        },
        CrossCommerceTracking: {
            params: () => { return [Entity]; },
            Get: CrossCommerceTrackingWebClient.Get,
        },
        Label: {
            params: () => { return [Entity]; },
            Create: LabelWebClient.Add,
            Update: LabelWebClient.Update,
            Get: LabelWebClient.Get,
            GetJson: LabelWebClient.GetJson,
            DeliveryCancel: LabelWebClient.DeliveryCancel,
        },
        LabelExpress: {
            params: () => { return [Entity]; },
            Create: LabelWebClient.Express,
        },
        Product: {
            params: () => { return [Entity, findEntity(CrossCommerceFeature, Entities), findEntity(CrossCommerceBrand, Entities)] },
            Create: ProductWebClient.Add,
            Get: ProductWebClient.Get,
            Update: ProductWebClient.Update,
        },
        ProductSku: {
            params: () => { return [Entity, findEntity(Product, Entities), findEntity(CrossCommerceFeatureOption, Entities)]; },
            Create: ProductSkuWebClient.Add,
            Get: ProductSkuWebClient.Get,
            Update: ProductSkuWebClient.Update,
            Delete: ProductSkuWebClient.Delete,
        },
        Category: {
            params: () => { return [Entity]; },
            Create: CrossCommerceCategoryWebClient.Add,
        },
        ShippingList: {
            params: () => { return [Entity]; },
            Create: ShippingListWebClient.Add,
            Close: ShippingListWebClient.Close,
        },
        Feature: {
            params: () => { return [Entity]; },
            Create: CrossCommerceFeatureWebClient.Add,
        },
        FeatureOption: {
            params: () => { return [Entity, findEntity(CrossCommerceFeature, Entities)]; },
            Create: CrossCommerceFeatureOptionWebClient.Add,
        },
        Order: {
            params: () => { return [Entity, findEntity(ProductSku, Entities)]; },
            GetByCode: OrderWebClient.GetByCode,
            "Create Async": OrderWebClient.AddAsync,
            GetByPreRegisterId: OrderWebClient.GetByPreRegisterId,
            Create: OrderWebClient.Add,
            Get: OrderWebClient.Get,
            Cancel: OrderWebClient.Cancel,
        },
        SaleChannel: {
            params: () => { return [Entity]; },
            Create: SaleChannelWebClient.Add
        },
        Brand: {
            params: () => { return [Entity]; },
            Create: CrossCommerceBrandWebClient.Add
        }
    },
    SkyHub: {
        Order: {
            params: () => { return [Entity]; },
            Create: SkyhubOrderWebclient.Add,
            Get: SkyhubOrderWebclient.Get,
            Approval: SkyhubOrderWebclient.Approval,
        }
    },
    Onboarding: {
        NotificationUrl: {
            params: () => { return [Entity]; },
            Create: NotificationUrlWebClient.Add
        }
    },
    Renner: {
        Product: {
            params: () => {
                setEntity(findEntity(Product, Entities))
                return [Entity]
            },
            Get: RennerProductWebClient.Get
        },
        Order: {
            params: () => { return [Entity]; },
            Create: RennerOrderWebClient.Add
        }
    }
};