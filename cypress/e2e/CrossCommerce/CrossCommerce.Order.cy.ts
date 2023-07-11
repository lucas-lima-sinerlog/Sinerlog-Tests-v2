import { CrossCommerceOrder } from "../../architecture/models/CrossCommerce/CrossComerce.Order.Model";
import { CrossCommerceProduct } from "../../architecture/models/CrossCommerce/CrossCommerce.Product.Model";
import { CrossCommerceProductSku } from "../../architecture/models/CrossCommerce/CrossCommerce.ProductSku.Model";
import { SetPayloadFromFixture } from "../../architecture/utils/SetPayloadFromFixture";
import { Wait } from "../../architecture/utils/WaitGivenSeconds";
import { CrossCommerceOrderWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.Order.WebClient";
import { CrossCommerceProductWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.Product.WebClient";
import { CrossCommerceProductSkuWebClient } from "../../architecture/webclients/CrossCommerce/CrossCommerce.ProductSku.WebClient";
describe('Create an Order', () => {

    const crossCommerceOrder = new CrossCommerceOrder()

    it('Creates an Order', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            crossCommerceOrder.CalculateTotalAmount()

            CrossCommerceOrderWebClient.Add(crossCommerceOrder).then(response => {

                expect(response.statusText, 'Status Text').to.be.equals('Created')

            })

        })

    });

});

describe('Create an order with a Product Sku that exceeds weight', () => {

    const crossCommerceProduct: CrossCommerceProduct = new CrossCommerceProduct
    const crossCommerceProductSku: CrossCommerceProductSku = new CrossCommerceProductSku
    const crossCommerceOrder: CrossCommerceOrder = new CrossCommerceOrder

    const crossCommerceProductSkuList: CrossCommerceProductSku[] = []
    it('Creates a Product', () => {

        SetPayloadFromFixture('CrossCommerce/Product/add-crosscommerce-product.json', crossCommerceProduct).then(__ => {

            CrossCommerceProductWebClient.Add(crossCommerceProduct)

        })

    });

    it('Creates a Product Sku with weigth exceeded', () => {

        SetPayloadFromFixture('CrossCommerce/ProductSku/add-crosscommerce-product-sku.json', crossCommerceProductSku).then(__ => {

            crossCommerceProductSku.weight = 30001

            CrossCommerceProductSkuWebClient.Add(crossCommerceProductSku, crossCommerceProduct).then(__ => {

                crossCommerceProductSkuList.push(crossCommerceProductSku)

            })
        });



    });

    it('Creates an Order with this newly created Product Sku', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            CrossCommerceOrderWebClient.Add(crossCommerceOrder, crossCommerceProductSkuList)

        })

    });

    it('Wait for Job execution', () => {
        cy.wait(200000)
    });

    it('Gets the Order and Check this status', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            expect(response.body.status).to.be.equals('Order to  split')

        })

    });

});

describe('Create an order with a Product Sku that exceeds height dimension', () => {

    const crossCommerceProduct: CrossCommerceProduct = new CrossCommerceProduct
    const crossCommerceProductSku: CrossCommerceProductSku = new CrossCommerceProductSku
    const crossCommerceOrder: CrossCommerceOrder = new CrossCommerceOrder

    const crossCommerceProductSkuList: CrossCommerceProductSku[] = []

    it('Creates a Product', () => {

        SetPayloadFromFixture('CrossCommerce/Product/add-crosscommerce-product.json', crossCommerceProduct).then(__ => {

            CrossCommerceProductWebClient.Add(crossCommerceProduct)

        })

    });

    it('Creates a Product Sku with height dimension exceeded', () => {

        SetPayloadFromFixture('CrossCommerce/ProductSku/add-crosscommerce-product-sku.json', crossCommerceProductSku).then(__ => {

            crossCommerceProductSku.height = 101

            CrossCommerceProductSkuWebClient.Add(crossCommerceProductSku, crossCommerceProduct).then(__ => {

                crossCommerceProductSkuList.push(crossCommerceProductSku)

            })

        })

    });

    it('Creates an Order with this newly created Product Sku', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            CrossCommerceOrderWebClient.Add(crossCommerceOrder, crossCommerceProductSkuList)

        })

    });

    it('Wait for Job execution', () => {
        cy.wait(100000)
    });

    it('Gets the Order and Check this status', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder)

    });

})

describe('Create an Order with a Inregular CPF', () => {

    const crossCommerceOrder = new CrossCommerceOrder()

    it('Creates an order with a invalid CPF', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            crossCommerceOrder.customerDocument = '45570179836'

            CrossCommerceOrderWebClient.Add(crossCommerceOrder).then(response => {

                expect(response.statusText, 'Status Text').to.be.equals('Created')

            })

        })

    });

    it('Wait', () => {

        cy.wait(60000)

    });

    it('Gets the Order and Check this status', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            expect(response.body.status).to.be.equals('CustomsIssue')

        })

    });

});

describe('Attempt to Create an Order with a Invalid CPF', () => {

    const crossCommerceOrder = new CrossCommerceOrder()

    it('Creates an order with a invalid CPF', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            crossCommerceOrder.customerDocument = '4557017983'

            CrossCommerceOrderWebClient.Add(crossCommerceOrder).then(response => {

                expect(response.statusText, 'Status Text').to.be.equals('Bad Request')
                expect(response.body.errors['Customer.Document'], 'Status Text').to.contain('This Document is not Valid!')

            })

        })

    });

});

describe('Create an Order and validate Payments info', () => {

    const crossCommerceOrder = new CrossCommerceOrder

    it('Creates an Order', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            CrossCommerceOrderWebClient.Add(crossCommerceOrder)

        })

    });

    it('Waits for 5 seconds', () => {

        Wait.Seconds(2)

    });

    it('Gets the order and validate Payments array', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            expect(response.body.payments, "Payments array").not.empty

        })

    });

});

describe('Create an Order Async and validate Payments info', () => {

    const crossCommerceOrder = new CrossCommerceOrder

    it('Creates an Order', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            CrossCommerceOrderWebClient.AddAsync(crossCommerceOrder)

        })

    });

    it('Waits for 30 seconds', () => {

        Wait.Seconds(30)

    });

    it('Gets the order and validate Payments array', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            expect(response.body.payments, "Payments array").not.empty

        })

    });

});

describe('Create an Order with with Zero Freight (totalShipping)', () => {

    const crossCommerceOrder = new CrossCommerceOrder

    it('Attempts to Create an Order with Zero Freight ', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            crossCommerceOrder.totalShipping = 0
            crossCommerceOrder.CalculateTotalAmount()

            CrossCommerceOrderWebClient.Add(crossCommerceOrder).then(response => {

                cy.checkStatusCode(response, 400)
                cy.checkErrorMessage(response, "TotalShipping", "'Total Shipping' must be greater than '0'.")

            })

        })

    });

});

describe('Create an Order with with Zero Freight (totalShipping)', () => {

    const crossCommerceOrder = new CrossCommerceOrder

    it('Attempts to Create an Order with Zero Freight ', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            crossCommerceOrder.CalculateTotalAmount()
            crossCommerceOrder.totalInsurance = 1000

            CrossCommerceOrderWebClient.Add(crossCommerceOrder).then(response => {

                cy.checkStatusCode(response, 400)
                cy.checkErrorMessage(response, "TotalAmount", "Total Amount must be TotalItems + TotalTax + TotalShipping + TotalInsurance - TotalDiscount")

            })

        })

    });

});

describe('Create an Order and Validates Total Insurance field', () => {

    const crossCommerceOrder = new CrossCommerceOrder()

    it('Creates an Order', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order.json', crossCommerceOrder).then(__ => {

            crossCommerceOrder.CalculateTotalAmount()

            CrossCommerceOrderWebClient.Add(crossCommerceOrder).then(response => {

                expect(response.statusText, 'Status Text').to.be.equals('Created')

            })

        })

    });

    it('Gets the order and validate Payments array', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            cy.checkFieldEqualty(response, 'totalInsurance', crossCommerceOrder.totalInsurance)

        })

    });

});

describe.only('SISCOMEX', () => {

    const crossCommerceOrder = new CrossCommerceOrder

    it('Creates an Order', () => {

        SetPayloadFromFixture('CrossCommerce/Order/add-crosscommerce-order', crossCommerceOrder).then(__ => {
            CrossCommerceOrderWebClient.Add(crossCommerceOrder)
        })

    });

    it('Waits for Integration Time', () => {
        cy.wait(20000)
    });

    it('Gets the order and validate Logistic Code', () => {

        CrossCommerceOrderWebClient.GetByCode(crossCommerceOrder).then(response => {

            expect(response)
          
        })

    });

    it('Validates if the Order was exported as a Package in SST', () => {
        
    });

});