import { Project, Board } from ".";


export interface Column {
    _id: string;
    title: string;
    projectId: Project;
    boards: string[];
    createdAt: number;
    updatedAt: number;
}