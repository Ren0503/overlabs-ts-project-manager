import React from 'react';
import { useProject } from 'context/ProjectContext';
import useDisclosure from 'hooks/useDisclosure';
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
import { FaCog } from 'react-icons/fa';
import { Formik, Form } from 'formik';
import { isEmpty } from 'utils';

const EditProjectModal = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { project, editProject } = useProject();

    return (
        <>
            <Button className='w-max' variant='outline' isRound onClick={onOpen}>
                <FaCog />
            </Button>
            <Modal isOpen={isOpen}>
                <ModalContent>
                    <ModalHeader isClosable onClose={onClose}>
                        Edit project info
                    </ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                name: project.name,
                                description: project.description,
                                sourceCode: project.sourceCode,
                                website: project.website,
                            }}
                            onSubmit={async (values) => {
                                try {
                                    await editProject(values);
                                    onClose();
                                } catch (err) {
                                    alert(JSON.stringify(err));
                                }
                            }}
                        >
                            {({ isSubmitting, values }) => (
                                <Form>
                                    <InputField label='Name' name='name' />
                                    <TextField label='Description' name='description' />
                                    <InputField
                                        type='url'
                                        label='Source code'
                                        name='sourceCode'
                                        placeholder='https://github.com/ren/example'
                                    />
                                    <InputField
                                        type='url'
                                        label='Website'
                                        name='website'
                                        placeholder='https://ren.com'
                                    />

                                    <ModalFooter isClosable onClose={onClose}>
                                        <Button
                                            type='submit'
                                            isLoading={isSubmitting}
                                            disabled={isEmpty(values, ['sourceCode', 'website'])}
                                        >
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
};

export default EditProjectModal;
