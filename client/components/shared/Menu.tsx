import React, { 
    createRef, 
    DetailedHTMLProps, 
    FunctionComponent, 
    HTMLAttributes, 
    LiHTMLAttributes 
} from 'react';
import classNames from 'classnames';
import useClickAway from 'hooks/useClickAway';
import Button, { ButtonProps } from './Button';

type MenuButtonProps = ButtonProps & {
    onOpen: () => void;
};

export const MenuButton: FunctionComponent<MenuButtonProps> = ({
    onOpen,
    ...props
}) => {
    return <Button {...props} onClick={onOpen} />;
};

type MenuProps = {
    onClose: () => void;
};

export const Menu: FunctionComponent<MenuProps> = (props) => {
    const ref = createRef<HTMLDivElement>();

    useClickAway(ref, props.onClose);

    return (
        <div ref={ref} className='relative flex py-2'>
            {props.children}
        </div>
    );
};

type MenuItemProps = DetailedHTMLProps<
    LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
>;

export const MenuItem: FunctionComponent<MenuItemProps> = ({ className, ...props }) => {
    return (
        <li
            className={classNames(
                'flex items-center font-semibold h-10 px-3 hover:bg-gray-800 cursor-pointer',
                className
            )}
            {...props}
        />
    );
};

type MenuListProps = DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
> & {
    isOpen: boolean;
};

export const MenuList: FunctionComponent<MenuListProps> = ({
    isOpen,
    className,
    ...props
}) => {
    return (
        <ul
            className={classNames(
                'absolute z-50 right-0 w-max border border-gray-900  bg-gray-700 shadow-xl rounded-md overflow-hidden transition-all duration-300',
                {
                    'hidden opacity-0 top-0': !isOpen,
                    'block opacity-100 top-full': isOpen,
                },
                className
            )}
            {...props}
        />
    );
};
