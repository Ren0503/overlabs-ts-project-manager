import { createContext, useContext, useReducer } from 'react';
import produce from 'immer';
import { isEqual } from 'lodash';
import { useRouter } from 'next/router';
import { DropResult, OnDragEndResponder } from 'react-beautiful-dnd';

import { useToast } from './ToastContext';
import { Board, Column, Project, User } from 'interfaces';
import { publicFetch } from 'utils';

type BoardActionPayload = {
    columnId?: string;
    board?: Board;
    boardId?: string;
};

type ProjectActionPayload = {
    project: Partial<Project>;
};

interface ProjectAction {
    type:
    | 'EDIT_PROJECT'
    | 'DELETE_PROJECT'
    | 'ADD_BOARD'
    | 'EDIT_BOARD'
    | 'DELETE_BOARD'
    | 'CLEAR_COLUMN'
    | 'SET_COLUMN'
    | 'DRAG_BOARD';
    payload?: string | BoardActionPayload | ProjectActionPayload | DropResult;
};

export interface ProjectState extends Omit<Project, 'creator'> {
    columns: Column[];
    boards: Board[];
    creator: User;
}

const projectReducer = produce((draft: ProjectState, action: ProjectAction) => {
    switch (action.type) {
        case 'EDIT_PROJECT':
            const { project } = action.payload as ProjectActionPayload;
            draft.name = project.name;
            draft.description = project.description;
            draft.sourceCode = project.sourceCode;
            draft.website = project.website;
            break;
        case 'ADD_BOARD': {
            const { board, columnId } = action.payload as BoardActionPayload;
            draft.boards.push(board as Board);
            const columnIndex = draft.columns.findIndex(
                (col) => col._id === columnId
            );
            draft.columns[columnIndex].boards.unshift(board._id);
            break;
        }
        case 'DELETE_BOARD': {
            const { boardId, columnId } = action.payload as BoardActionPayload;
            const columnIndex = draft.columns.findIndex(
                (col) => col._id === columnId
            );
            draft.columns[columnIndex].boards = draft.columns[
                columnIndex
            ].boards.filter((id) => id !== boardId);
            draft.boards = draft.boards.filter((b) => b._id !== boardId);
            break;
        }
        case 'EDIT_BOARD': {
            const { board } = action.payload as BoardActionPayload;
            const boardIndex = draft.boards.findIndex((b) => b._id === board._id);
            draft.boards.splice(boardIndex, 1, board);
            break;
        }
        case 'CLEAR_COLUMN': {
            const columnId = action.payload;
            const columnIndex = draft.columns.findIndex(
                (col) => col._id === columnId
            );
            const boards = draft.columns[columnIndex].boards;
            draft.boards = draft.boards.filter((b) => !boards.includes(b._id));
            draft.columns[columnIndex].boards = [];
            break;
        }
        case 'DRAG_BOARD':
            const { draggableId, source, destination } = action.payload as DropResult;
            if (!destination || isEqual(source, destination)) break;
            const sourceColumnIndex = draft.columns.findIndex(
                (col) => col._id === source.droppableId
            );
            const destColumnIndex = draft.columns.findIndex(
                (col) => col._id === destination.droppableId
            );
            draft.columns[sourceColumnIndex].boards.splice(source.index, 1);
            draft.columns[destColumnIndex].boards.splice(
                destination.index,
                0,
                draggableId
            );
            break;
        case 'DELETE_PROJECT':
        default:
            break;
    }
});

interface ProjectContextType {
    project: ProjectState;
    editProject: (project: Partial<Project>) => Promise<void>;
    deleteProject: () => Promise<void>;
    addBoard: (board: Partial<Board>, columnId: string) => Promise<void>;
    deleteBoard: (boardId: string, columnId: string) => Promise<void>;
    editBoard: (boardToEdit: Board, columnId: string) => Promise<void>;
    clearColumn: (columnId: string) => Promise<void>;
    onDragEnd: OnDragEndResponder;
}

const ProjectContext = createContext<ProjectContextType>(null);

const ProjectProvider: React.FC<{ project: ProjectState }> = ({
    project,
    children,
}) => {
    const toast = useToast();
    const router = useRouter();
    const [state, dispatch] = useReducer(projectReducer, project);

    const editProject: ProjectContextType['editProject'] = async (project) => {
        const res = await publicFetch.put(`/projects/${state._id}`, { project });
        if (res.status === 200)
            dispatch({ type: 'EDIT_PROJECT', payload: { project } });
    };

    const deleteProject: ProjectContextType['deleteProject'] = async () => {
        const res = await publicFetch.delete(`/projects/${state._id}`);
        if (res.status === 200) {
            toast(`project ${state.name} deleted successfully`, 'info');
            router.push('/projects');
        }
    };

    const addBoard: ProjectContextType['addBoard'] = async (
        boardData,
        columnId
    ) => {
        const res = await publicFetch.post(`/projects/${state._id}/boards`, {
            boardData,
            columnId,
        });
        if (res.data.board) {
            dispatch({
                type: 'ADD_BOARD',
                payload: { board: res.data.board as Board, columnId },
            });
        }
    };

    const deleteBoard: ProjectContextType['deleteBoard'] = async (
        boardId,
        columnId
    ) => {
        const res = await publicFetch.delete(`/projects/${state._id}/boards/${boardId}`);
        if (res.status === 200)
            dispatch({ type: 'DELETE_BOARD', payload: { boardId, columnId } });
    };

    const editBoard: ProjectContextType['editBoard'] = async (boardToEdit) => {
        const res = await publicFetch.put(
            `/projects/${state._id}/boards/${boardToEdit._id}`,
            { board: boardToEdit }
        );
        if (res.status === 200)
            dispatch({ type: 'EDIT_BOARD', payload: { board: boardToEdit } });
    };

    const clearColumn: ProjectContextType['clearColumn'] = async (columnId) => {
        const res = await publicFetch.delete(
            `/projects/${state._id}/columns/${columnId}`
        );
        if (res.status === 200)
            dispatch({ type: 'CLEAR_COLUMN', payload: columnId });
    };

    const onDragEnd: OnDragEndResponder = async (result) => {
        const { destination, source } = result;
        if (!destination || isEqual(source, destination)) return;
        dispatch({
            type: 'DRAG_BOARD',
            payload: result,
        });
        try {
            const res = await publicFetch.post(
                `/projects/${state._id}/boards/drag`,
                result
            );
            console.log(res);
        } catch (err) {
            alert(err.message);
            dispatch({
                type: 'DRAG_BOARD',
                payload: {
                    ...result,
                    source: result.destination,
                    destination: result.source,
                },
            });
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                project: state,
                editProject,
                deleteProject,
                addBoard,
                deleteBoard,
                editBoard,
                clearColumn,
                onDragEnd,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => useContext(ProjectContext);

export default ProjectProvider;
