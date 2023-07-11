import { SelectEnvironmentValue } from "../utils/SelectEnvironmentValue"

export class CrossCommerce {

    productBrandId = SelectEnvironmentValue(25, 1, 1, 1)
    productCategoryId = SelectEnvironmentValue(2, 1, 1, 1)
    productFeatures = SelectEnvironmentValue([119], [1], [1], [1])
    productSku = SelectEnvironmentValue('', '', '', '')
    itemCode = SelectEnvironmentValue('TOWELS157F3830960B467897099AE7A3EC71F4', '', '', '')
    productFeatureOptionId = SelectEnvironmentValue(92, 1, 1, 1)

}