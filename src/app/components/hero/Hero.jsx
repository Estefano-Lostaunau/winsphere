import React from 'react';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

export const Hero = () => {
    const intl = useIntl();

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/slot-machines.webp')" }}
        >
            <div
                className="absolute inset-0 bg-gray-900/75 md:bg-transparent sm:from-gray-900/95 md:to-gray-900/50 md:bg-gradient-to-r"
            ></div>

            <div
                className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
            >
                <div className="max-w-xl sm:text-left text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
                        {intl.formatMessage({ id: 'hero_title' })}

                        <strong className="block font-extrabold text-rose-500"> {intl.formatMessage({ id: 'hero_subtitle' })} </strong>
                    </h1>

                    <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
                        {intl.formatMessage({ id: 'hero_description' })}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <Link
                            className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            to="/roulette"
                        >
                            {intl.formatMessage({ id: 'hero_try_now' })}
                        </Link>

                        <a
                            href="#"
                            className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                        >
                            {intl.formatMessage({ id: 'hero_learn_more' })}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};