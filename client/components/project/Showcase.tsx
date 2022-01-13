import React from 'react'
import Link from 'next/link';

const Showcase = () => {
    return (
        <div className='container h-[100vh-4rem]'>
            <div className='grid items-center grid-cols-1 gap-10 sm:grid-cols-2'>
                <div className='flex flex-col items-center justify-center text-center sm:items-start sm:text-left'>
                    <h1 className='text-4xl font-bold xl:text-6xl'>
                        <span className='text-blue-700'>Over</span>Labs helps teams move work forward.
                    </h1>
                    <p className='my-4 text-lg xl:text-xl md:w-3/4'>
                        Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique — accomplish it all with Trello.
                    </p>
                    <div className='flex flex-col items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row'>
                        <Link href='/login'>
                            <a className="text-xl font-bold btn btn-outline transform hover:scale-110 transition duration-300 ease-in-out font-bold rounded-full py-6 px-8 shadow-lg uppercase tracking-wider">
                                Get Started
                            </a>
                        </Link>
                    </div>
                </div>
                <div className='flex items-center p-5 py-7'>
                    <img
                        className='object-contain w-full'
                        src='/teamwork.png'
                        alt='hero_image'
                    />
                </div>
            </div>
        </div>
    )
};

export default Showcase;
