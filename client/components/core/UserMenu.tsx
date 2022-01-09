import React, { FunctionComponent } from 'react';
import { useAuth } from 'context/AuthContext';
import useDisclosure from 'hooks/useDisclosure';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from 'components/shared';
import { publicFetch } from 'utils';

const UserMenu: FunctionComponent = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { setUser } = useAuth();

    return (
        <Menu onClose={onClose}>
            <MenuButton
                className='p-0 border'
                isRound
                aria-label='user-menu-trigger'
                onOpen={onOpen}
            >
                {children}
            </MenuButton>

            <MenuList isOpen={isOpen}>
                <MenuItem
                    onClick={async () => {
                        const res = await publicFetch.get('/users/logout');
                        if (res.data === 'Ok') {
                            setUser(null);
                        }
                    }}
                >
                    Sign Out
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserMenu;
