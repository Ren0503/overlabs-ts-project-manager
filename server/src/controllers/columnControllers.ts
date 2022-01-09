import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Board, Column, Project } from '../models';
import { getUserFromCookie } from '../utils';
import { ProjectDocument } from '../types';

export const deleteColumn = async (req: Request, res: Response) => {
    try {
        const userId = getUserFromCookie(req, res, true);

        const projects = await Project.aggregate()
            .match({
                _id: new mongoose.Schema.Types.ObjectId(req.params.projectId as string)
            })
            .lookup({
                from: 'columns',
                localField: '_id',
                foreignField: 'projectId',
                as: 'columns',
            });

        const project: ProjectDocument = projects[0];
        const projectOwnerId = project.creator.toString();

        if (projectOwnerId === userId) {
            const boardIds = project.columns.find(
                (col) => col._id == req.params.columnId
            );
            await Column.updateOne(
                { _id: req.params.columnId, projectId: req.params.projectId },
                { $set: { boards: [] } }
            );
            await Board.deleteMany({ _id: { $in: boardIds } });
            return res.json({ ok: true });
        }
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
}