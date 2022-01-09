import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { Board, Column, Project } from '../models';
import { getUserFromCookie } from '../utils';

export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.aggregate()
            .lookup({
                from: 'boards',
                as: 'boards',
                localField: '_id',
                foreignField: 'projectId',
            })
            .lookup({
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'creator',
            })
            .unwind('creator')
            .project({ 'creator.password': 0 });

        return res.json({ projects });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const createProject = async (req: Request, res: Response) => {
    try {
        const userId = getUserFromCookie(req, res, true);
        const { name, description } = req.body;

        // check if a project already exists with the same name
        const existingProject = await Project.findOne({
            name,
            creator: userId,
        }).lean();

        if (existingProject) {
            return res
                .status(400)
                .json({ error: `project name ${name} is already taken` });
        }

        const project = await Project.create({
            name,
            description,
            creator: userId,
        });

        const boards = await Board.create([
            {
                title: `tasks for ${name}`,
                description: 'this is a test board',
                projectId: project._id,
                author: userId,
            },
        ]);

        const columns = await Column.create([
            { title: 'todo', projectId: project._id, boards },
            { title: 'in progress', projectId: project._id },
            { title: 'completed', projectId: project._id },
        ]);

        project.columns = columns;
        await project.save();

        return res.status(201).json({
            project: project.toJSON(),
        });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const projects = await Project.aggregate()
            .match({ _id: new mongoose.Schema.Types.ObjectId(req.params.projectId as string) })
            .lookup({
                from: 'columns',
                localField: '_id',
                foreignField: 'projectId',
                as: 'columns',
            })
            .lookup({
                from: 'users',
                localField: 'creator',
                foreignField: '_id',
                as: 'creator',
            })
            .unwind('creator')
            .project({ 'creator.password': 0 });

        const boards = await Board.aggregate()
            .match({
                projectId: new mongoose.Schema.Types.ObjectId(req.params.projectId as string),
            })
            .lookup({
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author',
            })
            .unwind('author')
            .project({ 'author.password': 0 });

        if (!projects.length) {
            return res.status(404).json({ error: 'Project not found' });
        }

        return res.json({ project: { ...projects[0], boards } });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const userId = getUserFromCookie(req, res, true);

        const { acknowledged } = await Project.updateOne(
            {
                _id: req.params.projectId,
                creator: userId,
            },
            { $set: req.body.project },
            { lean: true }
        );

        return res.status(acknowledged ? 200 : 400).json({ ok: acknowledged });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const deleteProject = async (req: Request, res: Response) => {
    try {
        const userId = getUserFromCookie(req, res, true);

        const { deletedCount } = await Project.deleteOne({
            _id: req.params.projectId,
            creator: userId,
        });

        return res.status(deletedCount ? 200 : 400).json({ ok: deletedCount });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};