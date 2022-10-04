export class Institutions {
    id:number
    description:string
    code:string
    name:string
}

export interface Institution {
    id: number,
    recordedBy: number,
    recordedAt: Date,
    code: string,
    description: string,
    name: string
}