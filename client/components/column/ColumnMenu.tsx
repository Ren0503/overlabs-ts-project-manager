import React, { FunctionComponent } from 'react'
import { Menu, MenuItem, MenuList } from 'components/shared';
import { useAuth } from 'context/AuthContext';
import { useProject } from 'context/ProjectContext';
import { FaEllipsisV } from 'react-icons/fa';
import useDisclosure from 'hooks/useDisclosure';

const ColumnMenu: FunctionComponent<{ columnId: string }> = ({ columnId }) => {
    const { isOpen, onClose, toggle } = useDisclosure();
    const { clearColumn } = useProject();
    const { user } = useAuth();

    if (!user) return null;

    return (
        <Menu onClose={onClose}>
            <button onClick={toggle}>
                <FaEllipsisV />
            </button>
            <MenuList isOpen={isOpen}>
                <MenuItem
                    onClick={() => {
                        clearColumn(columnId);
                        onClose();
                    }}
                >
                    clear column
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default ColumnMenu;
