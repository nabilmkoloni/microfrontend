export enum GenaralCurrencyFormat {
    TZS = "TZS",
    USD = "USD"
}


export const GenaralCurrencyFormatMapping: Record<GenaralCurrencyFormat, string> = {
    [GenaralCurrencyFormat.TZS]: "TZS",
    [GenaralCurrencyFormat.USD]: "USD"
};


export enum GenaralPackageFormat {
    AI = "AI",
    FB = "FB",
    HB = "HB",
    BB = "BB"
}

export const GenaralPackageFormatMapping: Record<GenaralPackageFormat, string> = {
    [GenaralPackageFormat.AI]: "ALL INCLUSIVE",
    [GenaralPackageFormat.FB]: "FULL BOARD",
    [GenaralPackageFormat.HB]: "HALF BOARD",
    [GenaralPackageFormat.BB]: "BED AND BREAKFIRST",
    
};


export enum GenaralOffenceFormat {
    P = "P",
    A = "A",
    R = "R",
    PD = "PD"
}

export const GenaralOffeceFormatMapping: Record<GenaralOffenceFormat, string> = {
    [GenaralOffenceFormat.P]: "PENDING",
    [GenaralOffenceFormat.A]: "APPROVED",
    [GenaralOffenceFormat.R]: "REJECTED",
    [GenaralOffenceFormat.PD]: "PAID",
    
};





export enum GenaralIdentityFormat {
    ZANID = "ZANID",
    NIDA = "NIDA",
    PASSPORT = "PASSPORT"
}


export const GenaralIdentityFormatMapping: Record<GenaralIdentityFormat, string> = {
    [GenaralIdentityFormat.ZANID]: "ZANID",
    [GenaralIdentityFormat.NIDA]: "NIDA",
    [GenaralIdentityFormat.PASSPORT]: "PASSPORT",
};



export enum GenderFormat {
    MALE = "Male",
    FEMALE = "Female"
}


export const GenderFormatMapping: Record<GenderFormat, string> = {
    [GenderFormat.MALE]: "Male",
    [GenderFormat.FEMALE]: "Female"
};
  

export enum HotelCurrencyFormat{
    TZS = "TZS",
    USD = "USD",
    EURO = "EURO"
}

export const HotelCurrencyFormatMapping :Record<HotelCurrencyFormat, String> = {
    [HotelCurrencyFormat.TZS]:"TZS",
    [HotelCurrencyFormat.USD]:"USD",
    [HotelCurrencyFormat.EURO]:"EURO" 
}

export enum SalesReportType{
    SALES = "SALES",
    ITEMS = "ITEMS"
}


export enum ReturnTypes{
    SALES = "GENERAL SALES",
    ITEMS = "HOTEL"
}

export const SalesReportTypeMapping :Record<SalesReportType, String> = {
    [SalesReportType.SALES]:"Sales Report",
    [SalesReportType.ITEMS]:"Items Report"
}


export const ReturnTypeMapping :Record<ReturnTypes, String> = {
    [ReturnTypes.SALES]:"General Sales",
    [ReturnTypes.ITEMS]:"Hotel"
}
export enum ItemsType{
    taxable = "taxable",
    nontaxable = "nontaxable"
}

export const ItemsTypeMapping :Record<ItemsType, String> = {
    [ItemsType.taxable]:"Taxable",
    [ItemsType.nontaxable]:"Non Taxable"
}

export enum AccomodationReportType{
    INHOUSE = "INHOUSE",
    GUEST = "GUEST"
}

export const AccomodationReportTypeMapping :Record<AccomodationReportType, String> = {
    [AccomodationReportType.INHOUSE]:"Inhouse Guests",
    [AccomodationReportType.GUEST]:"Guests History"
}

export enum CheckOutReportType{
    ALL = "ALL",
    SPECIFIC = "SPECIFIC"
}

export const CheckOutReportTypeMapping :Record<CheckOutReportType, String> = {
    [CheckOutReportType.ALL]:"All Guests",
    [CheckOutReportType.SPECIFIC]:"Specific Date/s Guests"
}

export enum BusinessUnitCategory{
    U = "U",
    V = "V",
    W = "W",
    X = "X",
    Y = "Y",
    Z = "Z"
}

export const BusinessUnitCategoryMapping :Record<BusinessUnitCategory, String> = {
    [BusinessUnitCategory.U]:"U",
    [BusinessUnitCategory.V]:"V",
    [BusinessUnitCategory.W]:"W",
    [BusinessUnitCategory.X]:"X",
    [BusinessUnitCategory.Y]:"Y",
    [BusinessUnitCategory.Z]:"Z"
}

export enum BusinessUnitType{
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    S = "S",
}

export const BusinessUnitTypeMapping :Record<BusinessUnitType, String> = {
    [BusinessUnitType.A]:"A",
    [BusinessUnitType.B]:"B",
    [BusinessUnitType.C]:"C",
    [BusinessUnitType.D]:"D",
    [BusinessUnitType.E]:"E",
    [BusinessUnitType.F]:"F",
    [BusinessUnitType.G]:"G",
    [BusinessUnitType.S]:"S",
}

export enum CartCategory{
    CIC = "CIC",
    IS = "IS",
    NIS = "NIS",
    SR = "SR"
}

export const CartCategoryMapping :Record<CartCategory, String> = {
    [CartCategory.CIC]:"Checked In Customer",
    [CartCategory.IS]:"Inventory Sales",
    [CartCategory.NIS]:"Non-Inventory Sales",
    [CartCategory.SR]:"Special Relief"
}

export enum SaleCartCategory{
    CIC = "CIC",
    IS = "IS",
    NIS = "NIS"
}

export const SaleCartCategoryMapping :Record<SaleCartCategory, String> = {
    [SaleCartCategory.CIC]:"Checked In Customer",
    [SaleCartCategory.IS]:"Inventory Sales",
    [SaleCartCategory.NIS]:"Non-Inventory Sales"
}

export enum CustomerType{
    WT = "WT",
    RC = "RC",
    GI = "GI"
}

export const CustomerTypeMapping :Record<CustomerType, String> = {
    [CustomerType.WT]:"Walking Through",
    [CustomerType.RC]:"Registered Customer",
    [CustomerType.GI]:"Government Institution"
}

export enum CustomerSelectType{
    NEW = "NEW",
    EXIST = "EXIST"
}

export const CustomerSelectTypeMapping :Record<CustomerSelectType, String> = {
    [CustomerSelectType.NEW]:"NEW",
    [CustomerSelectType.EXIST]:"EXIST"
}

export enum CurrencyConversionType{
    SHOW = "SHOW",
    UNSHOW = "UNSHOW"
}

export const CurrencyConversionTypeMapping :Record<CurrencyConversionType, String> = {
    [CurrencyConversionType.SHOW]:"SHOW",
    [CurrencyConversionType.UNSHOW]:"UNSHOW"
}