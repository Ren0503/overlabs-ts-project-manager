import mongoose from 'mongoose';
import { ColumnDocument } from '../types';

const columnSchema = new mongoose.Schema<ColumnDocument>({
    title: {
        type: String,
        required: true
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    boards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }],
});

export const Column = mongoose.model<ColumnDocument>('Column', columnSchema);