import { Column, User } from ".";


export interface Project {
    _id: string;
    name: string;
    description?: string;
    sourceCode?: string;
    website?: string;
    columns: Column[];
    creator: User;
    createdAt: number;
    updatedAt: number;
}