export interface SalesReport {
    customer:string,
    id:number,
    totalItems?:number
    totalTax?:string
    totalAmount?:string
    itemsData?:any
}
