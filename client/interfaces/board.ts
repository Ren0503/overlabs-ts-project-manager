import { Project, User } from ".";

export enum LabelsEnum {
    bug = 'bug',
    enhancement = 'enhancement',
    feature = 'feature',
    help_wanted = 'help wanted',
    question = 'question',
}

export interface Board {
    _id: string;
    title: string;
    description?: string;
    label: LabelsEnum;
    author: User;
    projectId: Project;
    createdAt: number;
    updatedAt: number;
}