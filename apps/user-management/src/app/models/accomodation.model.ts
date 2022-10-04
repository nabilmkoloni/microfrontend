export class Accomodation {
    accommodationId:string
    accomodationDiscount:number
    accomodationPrice:number
    checkIn:string
    country:string
    currency:string
    fullName:string
    passportNo:string
    salesId: number
    unitId: number
    checkOut:string
    name:string
}

export interface InhouseGuests {
    currentPage:number;
    result: [ InhouseGuestAccomodation ];
    totalItems: number;
    totalPages: number;
}

export interface InhouseGuestAccomodation {
    accommodationId:number,
    accommodationSource:string,
    arrivalDate:Date,
    checkIn:Date,
    checkOut:Date,
    closedDate:Date,
    country:string,
    currency:string,
    days:number,
    documentName:string,
    documentNo:string,
    fullName:string,
    guestId:number,
    numberOfGuest:number,
    openedDate:Date,
    paymentType:string,
    room: [ InhouseGuestRoom ],
    salesId:number,
    unitId:number,
    uuid:number
}

export interface InhouseGuestRoom {
    accomodationDiscount:number;
    accomodationPrice:number;
    dateIn:Date;
    name:string;
    room:number;
    roomId:number;
}