import mongoose from 'mongoose';
import { Board, Column } from '.';
import { ProjectDocument } from '../types';

const projectSchema = new mongoose.Schema<ProjectDocument>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    sourceCode: {
        type: String,
    },
    website: {
        type: String,
    },
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true
});

projectSchema.pre('deleteOne', async function (next) {
    await Board.deleteMany({ projectId: this._id });
    await Column.deleteMany({ projectId: this._id });
    return next();
});

export const Project = mongoose.model<ProjectDocument>('Project', projectSchema);