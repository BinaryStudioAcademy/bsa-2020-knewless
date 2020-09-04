export interface IArticle {
  id?: string;
  name: string;
  text: string;
  image?: string;
  uploadImage: File;
  author?: IAuthorShort
}
 export interface IAuthorShort{
   id: string;
   userId: string;
   name: string;
   avatar: string;
   biography:string;
   articles: IArticle[];
 }