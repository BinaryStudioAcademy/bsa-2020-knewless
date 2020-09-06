export interface CourseMessageBody {
    id: string;
    createdAt: string;
    updatedAt: string;
    text: string;
    courseId: string;
    user: BriefUserDto;
}

export interface BriefUserDto {
    id: string;
    username: string;
    email: string;
    role: string;
}
