import { ITag } from './ITag';

export interface IStudentSettings {
    id: undefined,
    firstName: string,
    lastName: string,
    avatar: string,
    location:string,
    company: string,
    job: string,
    website: string,
    biography: string,
    direction: string,
    experience: number,
    level: string,
    industry: string,
    role: string,
    employment: string,
    education: string,
    year: number,
    uploadAvatar?: File
    tags: string[]
  }
