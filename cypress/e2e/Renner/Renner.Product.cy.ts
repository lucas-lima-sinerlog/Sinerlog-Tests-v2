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
import { RennerWebClientBase } from "../../architecture/webclients/Renner/Renner.WebClient.Base";

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
    it('Waits for Product Export process', () => { cy.wait(100000) });

    it('wait', () => {

        cy.pause()
      
    })

    it('Gets the exported Product from Renner Integration', () => {

        RennerWebClientBase.Auth().then(__ => {

            RennerProductWebClient.Get(crossCommerceProduct).then(response => {

                const rennerSkuResponseList = response.body.skus
                const firstRennerSku = rennerSkuResponseList.find((sku) => sku.partnerId === crossCommerceProductSku.id.toString())
                const secondRennerSku = rennerSkuResponseList.find((sku) => sku.partnerId === secondCrossCommerceProductSku.id.toString())


                //Product
                expect(+response.body.partnerId, 'Renner Parter Id / CrossCommerce Id').to.be.equals(crossCommerceProduct.id)
                expect(response.body.displayName, 'Renner Display Name / CrossCommerce Name').to.be.equals(crossCommerceProduct.name)
                expect(response.body.longDescription, 'Renner Long Description / CrossCommerce Description').to.be.equals(crossCommerceProduct.description)

                //Brand
                expect(response.body.brand, 'Brand').to.be.equals(crossCommerceProductBrand.name)
                //Sku Validation
                expect(rennerSkuResponseList.length, 'Double Sku Pré-Validation').to.be.equals(2)

                // First Sku Validation
                expect(+firstRennerSku.partnerId, 'Renner Partner Id / CrossCommerce Id').to.be.equals(crossCommerceProductSku.id)
                expect(firstRennerSku.ean, 'Renner Ean / CrossCommerce Ean').to.be.equals(crossCommerceProductSku.ean)
                expect(firstRennerSku.price, 'Renner Price / CrossCommerce Price').to.be.equals(crossCommerceProductSku.price)
                expect(firstRennerSku.packageDimension.width, 'Renner Width / CrossCommerce Width').to.be.equals(crossCommerceProductSku.width)
                expect(firstRennerSku.packageDimension.height, 'Renner Height / CrossCommerce Height').to.be.equals(crossCommerceProductSku.height)
              expect(firstRennerSku.packageDimension.length, 'Renner Length / CrossCommerce Length').to.be.equals(crossCommerceProductSku.length)
              expect(firstRennerSku.packageDimension.weight, 'Renner Weight / CrossCommerce Weight').to.be.equals(crossCommerceProductSku.height)

                //Second Sku Validation
                expect(+secondRennerSku.partnerId, 'Renner Partner Id / CrossCommerce Id').to.be.equals(secondCrossCommerceProductSku.id)
                expect(secondRennerSku.ean, 'Renner Ean / CrossCommerce Ean').to.be.equals(secondCrossCommerceProductSku.ean)
                expect(secondRennerSku.price, 'Renner Price / CrossCommerce Price').to.be.equals(secondCrossCommerceProductSku.price)
                expect(secondRennerSku.packageDimension.width, 'Renner Width / CrossCommerce Width').to.be.equals(secondCrossCommerceProductSku.width)
                expect(secondRennerSku.packageDimension.height, 'Renner Height / CrossCommerce Height').to.be.equals(secondCrossCommerceProductSku.height)
               expect(secondRennerSku.packageDimension.length, 'Renner Length / CrossCommerce Length').to.be.equals(secondCrossCommerceProductSku.length)
               expect(secondRennerSku.packageDimension.weight, 'Renner Weight / CrossCommerce Weight').to.be.equals(secondCrossCommerceProductSku.height)

            })

        })

    });

    it('Updates a CrossCommerce Product', () => {

        crossCommerceProduct.UpdateProductInfo()

        SetPayloadFromFixture('CrossCommerce/Product/update-a-crosscommerce-product.json', crossCommerceProduct).then(__ => {

            CrossCommerceProductWebClient.Update(crossCommerceProduct)

        })

    });

    it('Updates a CrossCommerce Product Sku', () => {

        crossCommerceProductSku.UpdadeProductSkuInfo()

        SetPayloadFromFixture('CrossCommerce/ProductSku/update-a-crosscommerce-product-sku.json', crossCommerceProductSku).then(__ => {

            CrossCommerceProductSkuWebClient.Update(crossCommerceProductSku, crossCommerceProduct)

        })

    });

    it('Waits for Product Export process', () => { cy.wait(100000) });

    it('Gets the exported Product from Renner Integration', () => {

        RennerWebClientBase.Auth().then(__ => {

            RennerProductWebClient.Get(crossCommerceProduct).then(response => {

                const rennerSkuResponseList = response.body.skus
                const firstRennerSku = rennerSkuResponseList.find((sku) => sku.partnerId === crossCommerceProductSku.id.toString())

                //Product
                expect(+response.body.partnerId, 'Renner Parter Id / CrossCommerce Id').to.be.equals(crossCommerceProduct.id)
                expect(response.body.displayName, 'Renner Display Name / CrossCommerce Name').to.be.equals(crossCommerceProduct.name)
                expect(response.body.longDescription, 'Renner Long Description / CrossCommerce Description').to.be.equals(crossCommerceProduct.description)

                //Brand
                expect(response.body.brand, 'Brand').to.be.equals(crossCommerceProductBrand.name)
                //Sku Validation
                expect(rennerSkuResponseList.length, 'Double Sku Pré-Validation').to.be.equals(2)

                // First Sku Validation
                expect(+firstRennerSku.partnerId, 'Renner Partner Id / CrossCommerce Id').to.be.equals(crossCommerceProductSku.id)
                expect(firstRennerSku.ean, 'Renner Ean / CrossCommerce Ean').to.be.equals(crossCommerceProductSku.ean)
                expect(firstRennerSku.price, 'Renner Price / CrossCommerce Price').to.be.equals(crossCommerceProductSku.price)
                expect(firstRennerSku.packageDimension.width, 'Renner Width / CrossCommerce Width').to.be.equals(crossCommerceProductSku.width)
                expect(firstRennerSku.packageDimension.height, 'Renner Height / CrossCommerce Height').to.be.equals(crossCommerceProductSku.height)
                expect(firstRennerSku.packageDimension.length, 'Renner Length / CrossCommerce Length').to.be.equals(crossCommerceProductSku.length)
                expect(firstRennerSku.packageDimension.weight, 'Renner Weight / CrossCommerce Weight').to.be.equals(crossCommerceProductSku.height)

            })

        })

    });

});