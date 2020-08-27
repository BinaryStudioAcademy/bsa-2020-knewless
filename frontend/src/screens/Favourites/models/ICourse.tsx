export interface ICourse {
    id: string;
    name: string;
    authorId: string;
    authorName: string;
    level: string;
    duration: number;
    description: string;
    rating: number;
    createdAt: Date;
    image: string;
}