import React, { createContext, useContext, useEffect, useState } from 'react'
import { Board } from 'interfaces';
import { useProject } from './ProjectContext';
import { 
    Button, 
    InputField, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    TextField 
} from 'components/shared';
import { Form, Formik } from 'formik';
import { isEmpty } from 'utils';
import useDisclosure from 'hooks/useDisclosure';

type SetModalFunction = (column: string, boardToEdit?: Board) => void;

interface BoardModalContext {
    column: string;
    setBoardModal: SetModalFunction;
    modelHelper: ReturnType<typeof useDisclosure>;
};

const BoardModalContext = createContext<BoardModalContext>(null);

const BoardModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [column, setColumn] = useState<string | undefined>();
    const [boardToEdit, setBoardToEdit] = useState<Board | undefined>();

    const { isOpen, onClose, onOpen, toggle } = useDisclosure(() =>
        setColumn(undefined)
    );
    const { addBoard, editBoard, project } = useProject();

    const setBoardModal: SetModalFunction = (
        selectedColumn,
        board = undefined
    ) => {
        console.log('get called', selectedColumn, board);
        setColumn(selectedColumn);
        setBoardToEdit(board);
    };

    useEffect(() => {
        if (!column) onClose();
        else onOpen();
        // eslint-diable-next-line react-hooks/exhaustive-deps
    }, [column, isOpen]);

    useEffect(() => {
        if (!isOpen) setBoardToEdit(undefined);
        // eslint-diable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <BoardModalContext.Provider
            value={{
                column,
                modelHelper: { isOpen, onClose, onOpen, toggle },
                setBoardModal,
            }}
        >
            <Modal isOpen={isOpen}>
                <ModalContent>
                    <ModalHeader isClosable onClose={onClose}>
                        {boardToEdit ? 'Edit' : 'Add'} board
                    </ModalHeader>
                    <ModalBody>
                        <Formik
                            enableReinitialize
                            initialValues={
                                !boardToEdit
                                    ? {
                                        title: '',
                                        description: '',
                                    }
                                    : { ...boardToEdit }
                            }
                            onSubmit={async (values) => {
                                try {
                                    if (!boardToEdit) {
                                        await addBoard(values, column);
                                    } else {
                                        await editBoard(values as Board, column);
                                    }
                                    onClose();
                                } catch (err) {
                                    alert(err);
                                }
                            }}
                        >
                            {({ isSubmitting, values }) => (
                                <Form id='board-form'>
                                    <InputField label='title' name='title' />
                                    <TextField label='description' name='description' />

                                    <ModalFooter isClosable onClose={onClose}>
                                        <Button
                                            isLoading={isSubmitting}
                                            disabled={isEmpty(values, ['description'])}
                                            form='board-form'
                                            type='submit'
                                        >
                                            Save board
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </BoardModalContext.Provider>
    )
};

export const useBoardModal = () => useContext(BoardModalContext);

export default BoardModalProvider;