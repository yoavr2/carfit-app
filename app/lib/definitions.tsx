

export interface Item {
    id : number;
    name : string;
    length : string;
    width : string;
    height : string;
    checked: boolean;
}

export interface Specs {
    min_cargo_capacity: string;
    max_cargo_capacity: string;
    min_length: string;
    max_length: string;
    min_width: string;
    max_width: string;
    height: string;
    height_of_lift_threshold: string;
}