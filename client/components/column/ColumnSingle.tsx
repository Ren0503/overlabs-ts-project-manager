import { SingleBoard } from 'components/board';
import { useAuth } from 'context/AuthContext'
import { useBoardModal } from 'context/BoardModalContext';
import { Board, Column } from 'interfaces'
import React, { FunctionComponent } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';
import ColumnMenu from './ColumnMenu';

interface ColumnProps {
    column: Column;
    boards: Board[];
}

const ColumnSingle: FunctionComponent<ColumnProps> = ({ column, boards }) => {
    const { user } = useAuth();
    const { setBoardModal } = useBoardModal();

    return (
        <div className='border border-gray-600 rounded-md'>
            <header className='flex items-center justify-between p-3 border-b border-gray-600'>
                <div className='flex items-center space-x-2'>
                    <div className='flex items-center justify-center w-6 h-6 bg-gray-700 rounded-full'>
                        <span className='text-sm'>{column.boards.length}</span>
                    </div>
                    <h2 className='text-lg font-bold'>{column.title}</h2>
                </div>
                <div className='flex items-center space-x-3'>
                    <button hidden={!user} onClick={() => setBoardModal(column._id)}>
                        <FaPlus />
                    </button>

                    <ColumnMenu columnId={column._id} />
                </div>
            </header>
            <Droppable droppableId={column._id}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='p-3 overflow-y-auto h-96'
                    >
                        {column.boards.map((boardId, index) => {
                            const board = boards.find((b) => b._id === boardId);
                            if (!board) return null;
                            return (
                                <SingleBoard
                                    key={`${board._id}_${column._id}`}
                                    column={column}
                                    board={board}
                                    dragIndex={index}
                                />
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
};

export default ColumnSingle;
