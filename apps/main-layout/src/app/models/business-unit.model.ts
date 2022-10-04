import { BusinessUnitCategory, BusinessUnitType } from "./enum.model"

export class BusinessUnit {
  localityId!: number
  name!: string
  street!: string
  taxpayer!: string
  type!: string
  urn!: string
  id!: number
}

export interface BusinessUnitInformation {
  bunit: {
    businassName: string,
    businessLocation: string,
    businessSector: string,
    category: BusinessUnitCategory,
    created: Date,
    device: [ BusinessUnitDevice ],
    id: number,
    mobileNumber: string,
    name: string,
    parentId: number,
    receipted: boolean,
    recordedBy: number,
    street: string,
    taxpayer: string,
    tinNumber: string,
    tradeName: string,
    type: BusinessUnitType,
    unitDeviceNumber: number,
    unitReceiptNumber: number,
    urn: string
  },
  vrnNumber: string
}

export interface BusinessUnitDevice {
  assignedDeviceNumber: number,
  id: number,
  recordedAt: Date,
  recordedBy: number
}