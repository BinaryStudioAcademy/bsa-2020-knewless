export interface IItem {
    id: string;
    name: string;
    description?: string;
    field1?: string;
    field2?: string;
    array?: Array<IItem>;
}