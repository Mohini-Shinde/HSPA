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
    CarpetArea?: number;
    Address: string;
    Address2?: string;
    CityId: number;
    City: string;
    FloorNo?: string;
    TotalFloor?: string;
    //readyToMove: boolean;
    RTM: number;
    AOP?: string;
    MainEntrance?: string;
    Security?: number;
    Gated?: boolean;
    Maintenance?: number;
    //estPossessionOn?: string;
    Posession?: string;
    Photo?: string;
    Description?: string;
    PostedOn:string
    Image:string
    //photos?: Photo[];
}
