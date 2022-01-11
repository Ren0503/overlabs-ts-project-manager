import { isEqual } from 'lodash';
import { Request, Response } from 'express';
import { Board, Column } from '../models';
import { getUserFromCookie } from '../utils';
import { IBoard } from '../types';
import { Types } from 'mongoose';

export const createBoard = async (req: Request, res: Response) => {
    try {
        const userId = getUserFromCookie(req, res, true);
        const { columnId, boardData } = req.body;
        const board = await Board.create({
            ...boardData,
            projectId: req.params.projectId,
            author: userId,
        });
        const column = await Column.findOne({
            _id: new Types.ObjectId(columnId),
            projectId: req.params.projectId,
        });

        if (column) {
            column.boards.unshift(board._id);
            await column.save();

            await board.populate('author');
            return res.status(201).json({ board: board.toJSON() });
        } else {
            res.status(404).json({ message: "Error Not Found " });
        }
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const dragBoard = async (req: Request, res: Response) => {
    try {
        const userId = getUserFromCookie(req, res, true);
        const { draggableId, source, destination } = req.body;

        const board = await Board.findOne({
            _id: new Types.ObjectId(draggableId),
            projectId: req.query.projectId,
            author: userId,
        });
        if (!board) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        if (isEqual(source, destination) || !destination) {
            return res.status(400).json({ error: 'board not dragged' });
        }

        await Column.updateOne(
            { _id: source.droppableId },
            {
                $pull: {
                    boards: new Types.ObjectId(draggableId)
                }
            }
        );

        await Column.updateOne(
            { _id: destination.droppableId },
            {
                $push: {
                    boards: { $each: [draggableId], $position: destination.index },
                },
            }
        );
        return res.json({ ok: true });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
}

export const updateBoard = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId;
        const boardId = req.params.boardId;
        const userId = getUserFromCookie(req, res, true);

        const boardToEdit: Partial<IBoard> = {
            title: req.body.board.title,
            description: req.body.board.description,
        };
        const editedBoard = await Board.findOneAndUpdate(
            { projectId, _id: boardId, author: userId },
            { $set: boardToEdit },
            { lean: true }
        );
        if (!editedBoard) {
            // check if column is changed
            return res.status(400).json({ error: 'board update failed' });
        }
        return res.json({ board: editedBoard });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};

export const deleteBoard = async (req: Request, res: Response) => {
    try {
        const projectId = req.params.projectId;
        const boardId = req.params.boardId;
        const userId = getUserFromCookie(req, res, true);

        const boardDeleteResult = await Board.deleteOne({
            _id: boardId,
            projectId,
            author: userId,
        });

        const columnUpdateResult = await Board.updateOne(
            {
                boards: boardId,
                projectId,
            },
            {
                $pull: {
                    boards: new Types.ObjectId(boardId as string)
                }
            }
        );

        if (
            !boardDeleteResult.deletedCount ||
            !columnUpdateResult.modifiedCount
        ) {
            return res.status(400).json({ error: 'Delete board failed' });
        }

        return res.status(200).json({ ok: true });
    } catch (error) {
        res.status(503);
        throw new Error('Something went wrong');
    }
};