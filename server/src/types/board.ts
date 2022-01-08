import mongoose, { Document } from 'mongoose';
import { ProjectDocument, UserDocument } from '.';

export enum LabelsEnum {
    bug = 'bug',
    enhancement = 'enhancement',
    feature = 'feature',
    help_wanted = 'help wanted',
    question = 'question',
};

export const Labels = Object.values(LabelsEnum);

export interface Board {
    _id: string;
    title: string;
    description?: string;
    label: LabelsEnum;
    author: UserDocument;
    projectId: ProjectDocument;
    createdAt: number;
    updatedAt: number;
};

export interface BoardDocument extends Omit<Board, '_id'>, Document { }

export interface BoardModel extends mongoose.Model<BoardDocument> { }