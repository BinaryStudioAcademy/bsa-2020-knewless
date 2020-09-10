export interface IArticle {
  id?: string;
  name: string;
  text: string;
  image?: string;
  uploadImage: File;
  author?: IAuthorShort;
  favourite?: boolean;
}

export interface IFavouriteArticle {
  id?: string;
  name: string;
  image?: string;
  authorName: string;
  readingTime: number;
}

export interface IAuthorShort {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  biography: string;
  articles: IArticle[];
}
