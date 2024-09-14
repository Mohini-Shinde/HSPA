import { IPropertyBase } from "./IPropertybase";

export class Property implements IPropertyBase {
    Id: number;
    SellRent: number;
    Name: string;
    //propertyTypeId: number;
    PType: string;
    BHK: number;
    //furnishingTypeId: number;
    FType: string;
    Price: number;
    BuiltArea: number;
    carpetArea?: number;
    address: string;
    address2?: string;
    CityId: number;
    City: string;
    floorNo?: string;
    totalFloors?: string;
    //readyToMove: boolean;
    RTM: number;
    age?: string;
    mainEntrance?: string;
    security?: number;
    gated?: boolean;
    maintenance?: number;
    //estPossessionOn?: string;
    Posession?: string;
    photo?: string;
    description?: string;
    PostedOn:string
    //photos?: Photo[];
}
