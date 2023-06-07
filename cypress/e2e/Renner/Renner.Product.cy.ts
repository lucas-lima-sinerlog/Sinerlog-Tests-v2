import { CrossCommerceFeatureOption } from "../../architecture/models/CrossCommerce/CrossCommerce.FeatureOption.Model";
import { CrossCommerceProduct } from "../../architecture/models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductBrand } from "../../architecture/models/CrossCommerce/CrossCommerce.ProductBrand.Model";
import { CrossCommerceProductCategory } from "../../architecture/models/CrossCommerce/CrossCommerce.ProductCategory.Model";
import { CrossCommerceProductFeature } from "../../architecture/models/CrossCommerce/CrossCommerce.ProductFeature.Model";
import { CrossCommerceProductSku } from "../../architecture/models/CrossCommerce/CrossCommerce.ProductSku.Model";
import { RennerProduct } from "../../architecture/models/Renner/Renner.Product.Model";
import { SetPayloadFromFixture } from "../../architecture/utils/SetPayloadFromFixture";
import { CrossCommerceFeatureOptionWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.FeatureOption.WebClient";
import { CrossCommerceProductWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.Product.WebClient";
import { CrossCommerceProductBrandWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.ProductBrand.WebClient";
import { CrossCommerceProductCategoryWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.ProductCategory.WebClient";
import { CrossCommerceProductFeatureWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.ProductFeature.WebClient";
import { CrossCommerceProductSkuWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.ProductSku.WebClient";
import { RennerProductWebClient } from "../../architecture/webclients/Renner/Renner.Product.WebClient";
import { RennerWebClientBase } from "../../architecture/webclients/Renner/Renner.WebClient.base";

describe('Export a Double Sku Product to Renner Integration', () => {

    //CrossCommerce Entities
    const crossCommerceProductCategory = new CrossCommerceProductCategory()
    const crossCommerceProductBrand = new CrossCommerceProductBrand()
    const crossCommerceProductFeature = new CrossCommerceProductFeature()
    const crossCommerceProductFeatureOption = new CrossCommerceFeatureOption()
    const secondCrossCommerceProductFeatureOption = new CrossCommerceFeatureOption()
    const crossCommerceProduct = new CrossCommerceProduct()
    const crossCommerceProductSku = new CrossCommerceProductSku()
    const secondCrossCommerceProductSku = new CrossCommerceProductSku()

    //Renner Entities
    const rennerProduct = new RennerProduct()


    it('Creates a Product Category', () => {

        SetPayloadFromFixture('CrossCommerce/Category/add-crosscommerce-product-category.json', crossCommerceProductCategory).then(
            __ => {

                CrossCommerceProductCategoryWebClient.Add(crossCommerceProductCategory)

            })

    });

    it('Creates a Product Brand', () => {

        SetPayloadFromFixture('CrossCommerce/Brand/add-crosscommerce-product-brand.json', crossCommerceProductBrand).then(
            __ => {

                CrossCommerceProductBrandWebClient.Add(crossCommerceProductBrand)

            })

    });

    it('Creates a Product Feature', () => {

        SetPayloadFromFixture('CrossCommerce/Feature/add-crosscommerce-product-feature.json', crossCommerceProductFeature).then(
            __ => {

                CrossCommerceProductFeatureWebClient.Add(crossCommerceProductFeature)

            })

    });

    it('Creates a Feature Option', () => {

        SetPayloadFromFixture('CrossCommerce/FeatureOption/add-crosscommerce-feature-option.json', crossCommerceProductFeatureOption).then(
            __ => {

                CrossCommerceFeatureOptionWebClient.Add(crossCommerceProductFeatureOption, crossCommerceProductFeature)

            })

    });
    it('Creates a Product', () => {

        SetPayloadFromFixture('CrossCommerce/Product/add-crosscommerce-product.json', crossCommerceProduct).then(
            __ => {

                CrossCommerceProductWebClient.Add(crossCommerceProduct, crossCommerceProductBrand, crossCommerceProductCategory, crossCommerceProductFeature)

            })

    });
    it('Creates a Product Sku', () => {

        SetPayloadFromFixture('CrossCommerce/ProductSku/add-crosscommerce-product-sku.json', crossCommerceProductSku).then(
            __ => {

                CrossCommerceProductSkuWebClient.Add(crossCommerceProductSku, crossCommerceProduct, crossCommerceProductFeatureOption)

            })

    });

    it('Creates another Feature Option', () => {

        SetPayloadFromFixture('CrossCommerce/FeatureOption/add-crosscommerce-feature-option.json', secondCrossCommerceProductFeatureOption).then(
            __ => {

                CrossCommerceFeatureOptionWebClient.Add(secondCrossCommerceProductFeatureOption, crossCommerceProductFeature)

            })

    });

    it('Creates another Product Sku', () => {

        SetPayloadFromFixture('CrossCommerce/ProductSku/add-crosscommerce-product-sku.json', secondCrossCommerceProductSku).then(__ => {

            CrossCommerceProductSkuWebClient.Add(secondCrossCommerceProductSku, crossCommerceProduct, secondCrossCommerceProductFeatureOption)

        })

    });
    it('Waits for Product Export process', () => { cy.wait(120000) });

    it('Gets the exported Product from Renner Integration', () => {

        RennerWebClientBase.Auth().then(__ => {

            RennerProductWebClient.Get(crossCommerceProduct)

        })

    });

});