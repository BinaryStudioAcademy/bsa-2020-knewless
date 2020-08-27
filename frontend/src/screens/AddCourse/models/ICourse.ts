export interface ICourse {
    name: string;
    image: string;
    lectures?: Array<string>;
    level: string;
    description: string;
    isReleased: boolean;
    uploadImage?: File;
}