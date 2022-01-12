import Link from 'next/link'

const AboutPage = () => {
    return (
        <div>
            <section className="container mx-auto px-6 py-10">
                <h2 className="text-4xl font-bold text-center  mb-0">
                    Features
                </h2>
                <div className="flex items-center flex-wrap mb-10">
                    <div className="w-full md:w-1/2 px-4">
                        <h4 className="text-3xl  font-bold mb-3">
                            The board is just the beginning
                        </h4>
                        <p className=" mb-8">
                            Lists and cards are the building blocks of organizing work on a Overlabs board. Grow from there with task assignments, timelines, productivity metrics, calendars, and more.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <img src="/about1.png" alt="responsive" />
                    </div>
                </div>
                <div className="flex items-center flex-wrap mb-20">
                    <div className="w-full md:w-1/2 px-4">
                        <img src="/about2.png" alt="component-friendly" />
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <h4 className="text-3xl  font-bold mb-3">
                            Cards contain everything you need
                        </h4>
                        <p className=" mb-8">
                            The cards are your portal to more organized work—where every single part of your task can be managed, tracked, and shared with teammates.
                        </p>
                    </div>
                </div>
                <div className="flex items-center flex-wrap mb-20">
                    <div className="w-full md:w-1/2 px-4">
                        <h4 className="text-3xl  font-bold mb-3">
                            No-code automation
                        </h4>
                        <p className=" mb-8">
                            With Overlabs built-in automation, Butler, reduce the number of tedious tasks (and clicks) on your project board by harnessing the power of automation across your entire team.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                        <img src="/about3.png" alt="customizable" />
                    </div>
                </div>
            </section>
            <section>
                <div className="container mx-auto px-6 py-20">
                    <h2 className="text-4xl font-bold text-center  mb-8">
                        Testimonials
                    </h2>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/3 px-2 mb-4">
                            <div className="rounded shadow py-2">
                                <p className=" text-base px-6 mb-5">
                                    Sunt corrupti delectus eaque pariatur dicta magnam, velit possimus cupiditate iusto hic, ullam, error vel odio adipisci! Mollitia molestias sit beatae? Corrupti!
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm px-6">
                                    John Doe
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4">
                            <div className="rounded shadow py-2">
                                <p className=" text-base px-6 mb-5">
                                    Sunt corrupti delectus eaque pariatur dicta magnam, velit possimus cupiditate iusto hic, ullam, error vel odio adipisci! Mollitia molestias sit beatae? Corrupti!
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm px-6">
                                    Jane Doe
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-2 mb-4">
                            <div className="rounded shadow py-2">
                                <p className=" text-base px-6 mb-5">
                                    Sunt corrupti delectus eaque pariatur dicta magnam, velit possimus cupiditate iusto hic, ullam, error vel odio adipisci! Mollitia molestias sit beatae? Corrupti!
                                </p>
                                <p className="text-gray-500 text-xs md:text-sm px-6">
                                    James Doe
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="call-to-action">
                <div className="container mx-auto px-6 text-center py-10">
                    <h2 className="mb-6 text-4xl font-bold text-center text-white">
                        Impress them all!
                    </h2>
                    <h3 className="my-4 text-2xl text-white">
                        Build the next generation of design experiences
                    </h3>
                    <button className="transform hover:scale-110 text-black transition duration-300 ease-in-out bg-white font-bold rounded-full mt-6 py-6 px-8 shadow-lg uppercase tracking-wider">
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
