import { Router } from 'express';
import { 
    createBoard,
    createProject, 
    deleteBoard, 
    deleteColumn, 
    deleteProject, 
    dragBoard, 
    getAllProjects,
    getProjectById,
    updateBoard,
    updateProject, 
} from '../controllers';

const router = Router();

router.route('/')
    .get(getAllProjects)
    .post(createProject)

router.route('/:projectId/columns/:columnId').delete(deleteColumn)

router.route('/:projectId/boards/drag').post(dragBoard)

router.route('/:projectId/boards/:boardId')
    .put(updateBoard)
    .delete(deleteBoard)

router.route('/:projectId/boards').post(createBoard)

router.route('/:projectId')
    .get(getProjectById)
    .put(updateProject)
    .delete(deleteProject)

export default router;