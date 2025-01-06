import React from 'react'
import { Link } from 'react-router-dom'

export const Hero = () => {
    return (
        <section
            className="relative  bg-[url(https://s3.amazonaws.com/utep-uploads/wp-content/uploads/unr/2019/07/01081817/slot-machines.jpg)] bg-cover bg-center bg-no-repeat"
        >
            <div
                className="absolute inset-0 bg-gray-900/75 md:bg-transparent sm:from-gray-900/95 md:to-gray-900/50 md:bg-gradient-to-r"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl sm:text-left text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        Conduct Fair and Exciting

                        <strong className="block font-extrabold text-rose-500"> Raffles and Giveaways. </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        Our raffle wheel application helps you organize fair and fun giveaways. Easily add participants, spin the wheel, and let the excitement unfold as winners are randomly selected.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Link
                            className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            to="/roulette"
                        >
                            Try Now
                        </Link>

                        <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
