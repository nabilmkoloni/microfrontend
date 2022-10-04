export class Sales {
    businessUnit!: number
    currency!: string
    countReprint:any
    customer!: string
    tzs_currency?:string
    usd_currency?:string
    id!: number
    isCanceled!: boolean
}

export interface SalesReport {
    totalItems: number;
    salesReport: [ SaleItem ];
    totalPages: number;
    currentPage: number;
    totalAmount: any;
    totalTax: any;
}

export interface SaleItem {
    currency: string;
    customer: string;
    issuedDate: Date;
    rateEURO: number;
    rateUSD: number;
    rateUSDEURO: number;
    salesId: number;
    salesReceiptId: number;
    salesReceiptNumber: string;
    salesReceitpAmount: number;
    salesTaxAmount: number;
    salesTaxId: number;
    unitCategory: string;
    unitId: number;
    unitName: string;
    unitStreet: string;
    unitTaxType: string;
    unitTaxpayer: string;
}

export interface ItemsSalesReport {
    totalItems: number;
    salesReport: [ ItemSaleItem ];
    totalPages: number;
    currentPage: number;
    totalAmount: any;
    totalTax: any;
}

export interface ItemSaleItem {
    currency: string;
    customer: string;
    issuedDate: Date;
    rateEURO: number;
    rateUSD: number;
    rateUSDEURO: number;
    salesId: number;
    salesReceiptId: number;
    salesReceiptNumber: string;
    salesReceitpAmount: number;
    salesTaxAmount: number;
    salesTaxId: number;
    unitCategory: string;
    unitId: number;
    unitName: string;
    unitStreet: string;
    unitTaxType: string;
    unitTaxpayer: string;
    salesItemId: number;
    salesItemDescription: string;
    salesItemPrice: number;
    salesItemDiscount: number;
    salesItemQuantity: number;
    itemId: number;
    itemName: string;
    isTaxable: boolean;
    recordedBy: number;
    recordedAt: Date;
}