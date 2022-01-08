import mongoose from 'mongoose';
import { BoardDocument, Labels } from '../types';

const boardSchema = new mongoose.Schema<BoardDocument>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    label: {
        type: String,
        enum: Labels,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Project',
    },
}, {
    timestamps: true
});

export const Board = mongoose.model<BoardDocument>('Board', boardSchema);