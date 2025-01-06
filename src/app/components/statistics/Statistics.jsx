import React from 'react';
import { useIntl } from 'react-intl';

export const Statistics = () => {
    const intl = useIntl();

    return (
        <section className="bg-gray-50">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        {intl.formatMessage({ id: 'statistics_title' })}
                    </h2>

                    <p className="mt-4 text-gray-500 sm:text-xl">
                        {intl.formatMessage({ id: 'statistics_description' })}
                    </p>
                </div>

                <dl className="mg-6 grid grid-cols-1 gap-4 divide-y divide-gray-100 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">
                            {intl.formatMessage({ id: 'statistics_total_giveaways' })}
                        </dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">1.2k</dd>
                    </div>

                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">
                            {intl.formatMessage({ id: 'statistics_active_users' })}
                        </dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">3.5k</dd>
                    </div>

                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">
                            {intl.formatMessage({ id: 'statistics_total_spins' })}
                        </dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">15k</dd>
                    </div>

                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">
                            {intl.formatMessage({ id: 'statistics_winners_selected' })}
                        </dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">5k</dd>
                    </div>
                </dl>
            </div>
        </section>
    );
};