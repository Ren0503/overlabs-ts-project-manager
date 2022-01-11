import { useProject } from "context/ProjectContext";
import { DragDropContext } from "react-beautiful-dnd";
import ColumnSingle from "./ColumnSingle";

const ColumnBoard = () => {
    const {
        project: { columns, boards, _id: projectId },
        onDragEnd,
    } = useProject();
    
    console.log(columns);
    console.log(boards);
    console.log(projectId);

    return (
        <section className='grid gap-3 mt-10 mb-20 md:grid-cols-3 md:gap-5'>
            <DragDropContext onDragEnd={onDragEnd}>
                {columns.map((column) => (
                    <ColumnSingle
                        key={`${projectId}_${column.title}`}
                        boards={boards}
                        column={column}
                    />
                ))}
            </DragDropContext>
        </section>
    );
}

export default ColumnBoard;
