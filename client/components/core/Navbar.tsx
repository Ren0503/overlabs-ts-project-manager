import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Avatar, Button } from 'components/shared';
import { useAuth } from 'context/AuthContext';
import { FaPlus, FaSpinner } from 'react-icons/fa';
import UserMenu from './UserMenu';

const Navbar = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
    return (
        <>
            <header className='fixed inset-0 w-screen h-16 bg-gray-800 shadow'>
                <nav className='container flex items-center h-full'>
                    <Link href={user ? '/projects' : '/'}>
                        <a className='text-2xl font-bold'>
                            <span className='text-blue-600'>Over</span>Labs
                        </a>
                    </Link>

                    <div className='flex items-center ml-auto space-x-3'>
                        {!loading ? (
                            user ? (
                                <>
                                    <Button isRound onClick={() => router.push('/new')}>
                                        <FaPlus />
                                    </Button>
                                    <UserMenu>
                                        <Avatar src={user.avatar} alt={user.username} />
                                    </UserMenu>
                                </>
                            ) : (
                                <>
                                    <Link href='/login'>
                                        <a className='btn btn-outline'>login</a>
                                    </Link>
                                    <Link href='/register'>
                                        <a className='btn'>register</a>
                                    </Link>
                                </>
                            )
                        ) : (
                            <FaSpinner className='animate-spin' />
                        )}
                    </div>
                </nav>
            </header>
            <div className='flex h-28'></div>
        </>
    );
};

export default Navbar;
