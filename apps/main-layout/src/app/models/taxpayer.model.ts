export class Taxpayer {
}

export interface TaxpayerData {
    companyType: string,
    corporateType: string,
    businessSector: string,
    taxIdNumber: string,
    lto: string,
    previousName: string,
    address: [ TaxpayerAddress ],
    taxTypes: [ TaxpayerTaxType ],
    active: string,
    businessName: string,
    znumber: string,
    businessLocation: string,
    vrnnumber: string
}

export interface TaxpayerAddress {
    address_1: string,
    address_2: string,
    city: string,
    country: string,
    phone: string,
    mobile: string,
    fax: string,
    email: string,
    address_type: string,
    po_box: string,
    contact_name: string,
    house_number: string,
    office_type: string,
    shehia: string,
    trading_as: string
}

export interface TaxpayerTaxType {
    name: string
}
