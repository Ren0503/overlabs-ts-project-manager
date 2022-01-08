import mongoose, { Document } from 'mongoose';
import { BoardDocument, ProjectDocument } from '.';

export interface Column {
    _id: string;
    title: string;
    projectId: ProjectDocument;
    boards: BoardDocument[];
    createdAt: number;
    updatedAt: number;
}

export interface ColumnDocument extends Omit<Column, '_id'>, Document { }

export interface ColumnModel extends mongoose.Model<ColumnDocument> { }