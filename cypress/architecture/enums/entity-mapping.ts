import { RennerProduct } from "../models/Renner/renner-product-model";
import { CrossCommerceCategory } from "../models/CrossCommerce/category-model";
import { CrossCommerceFeature } from "../models/CrossCommerce/crosscommerce-feature-model";
import { CrossCommerceFeatureOption } from "../models/CrossCommerce/crosscommerce-feature-option-model";
import { Label } from "../models/CrossCommerce/label-model";
import { Order } from "../models/CrossCommerce/order-model";
import { Product } from "../models/CrossCommerce/product-model";
import { ProductSku } from "../models/CrossCommerce/product-sku-model";
import { SaleChannel } from "../models/CrossCommerce/sale-channel-model";
import { ShippingList } from "../models/CrossCommerce/shippingList-model";
import { ShippingSeller } from "../models/CrossCommerce/shippingSeller-model";
import { NotificationUrl } from "../models/Onboarding/notification-url-model";
import { OnboardingAccount } from "../models/Onboarding/onboarding-account-model";
import { Bag } from "../models/SinerlogSafetyTracker/bag-model";
import { Flight } from "../models/SinerlogSafetyTracker/flight-model";
import { Package } from "../models/SinerlogSafetyTracker/package-model";
import { SkyhubOrder } from "../models/SkyHub/skyhub-order-model";
import { TrackingServicesTracking } from "../models/TrackingServices/tracking-model";
import { Provider } from "../models/tracking-admin/provider-model";
import { TrackingAdminAccount } from "../models/tracking-admin/tracking-admin-account-model";
import { RennerOrder } from "../models/Renner/renner-order-model";
import { CrossCommerceBrand } from "../models/CrossCommerce/crosscomerce-brand-model";

export const entityMappings = {
    TrackingAdmin: {
        Account: TrackingAdminAccount,
        Provider: Provider
    },
    TrackingApi: {
        Tracking: TrackingServicesTracking
    },
    SinerlogSafetyTracker: {
        Package: Package,
        Bag: Bag,
        Flight: Flight
    },
    CrossCommerce: {
        Product: Product,
        ProductSku: ProductSku,
        Order: Order,
        Category: CrossCommerceCategory,
        Label: Label,
        ShippingList: ShippingList,
        ShippingSeller: ShippingSeller,
        SaleChannel: SaleChannel,
        Feature: CrossCommerceFeature,
        FeatureOption: CrossCommerceFeatureOption,
        Brand: CrossCommerceBrand
    },
    Onboarding: {
        Account: OnboardingAccount,
        NotificationUrl: NotificationUrl
    },
    SkyHub: {
        Order: SkyhubOrder
    },
    Renner: {
        Product: RennerProduct,
        Order: RennerOrder
    }
};