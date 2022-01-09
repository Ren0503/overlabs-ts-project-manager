import React, { FunctionComponent } from "react";
import { Menu, MenuItem, MenuList } from "components/shared";
import { useAuth } from "context/AuthContext";
import { useBoardModal } from "context/BoardModalContext";
import { useProject } from "context/ProjectContext";
import { Board } from "interfaces";
import { FaEllipsisH } from "react-icons/fa";
import useDisclosure from "hooks/useDisclosure";

interface BoardMenuProps {
    columnId: string;
    board: Board;
}

const BoardMenu: FunctionComponent<BoardMenuProps> = ({ columnId, board }) => {
    const { onClose, toggle, isOpen } = useDisclosure();
    const { setBoardModal } = useBoardModal();
    const { deleteBoard } = useProject();
    const { user } = useAuth();

    if (!user) return null;

    return (
        <Menu onClose={onClose}>
            <button onClick={toggle}>
                <FaEllipsisH />
            </button>
            <MenuList isOpen={isOpen}>
                <MenuItem
                    onClick={() => {
                        setBoardModal(columnId, board);
                        onClose();
                    }}
                >
                    edit board
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        await deleteBoard(board._id, columnId);
                        onClose();
                    }}
                >
                    delete board
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default BoardMenu;
