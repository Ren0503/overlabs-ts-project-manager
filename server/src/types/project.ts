import mongoose, { Document } from 'mongoose';
import { ColumnDocument, UserDocument } from '.';

export interface Project {
    _id: string;
    name: string;
    description?: string;
    sourceCode?: string;
    website?: string;
    columns: ColumnDocument[];
    creator: UserDocument;
    createdAt: number;
    updatedAt: number;
};

export interface ProjectDocument extends Document, Omit<Project, '_id'> { }

export interface ProjectModel extends mongoose.Model<ProjectDocument> { }