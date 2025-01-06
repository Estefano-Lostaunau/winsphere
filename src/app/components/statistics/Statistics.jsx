import React from 'react'

export const Statistics = () => {
    return (
        <section className="bg-gray-50">

            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by Event Organizers</h2>

                    <p className="mt-4 text-gray-500 sm:text-xl">
                        Our raffle wheel application is trusted by event organizers worldwide to conduct fair and exciting giveaways. Add participants, spin the wheel, and let the fun begin!
                    </p>
                </div>

                <dl
                    className="mg-6 grid grid-cols-1 gap-4 divide-y divide-gray-100 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
                >
                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Total Giveaways</dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">1.2k</dd>
                    </div>

                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Active Users</dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">3.5k</dd>
                    </div>

                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Total Spins</dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">15k</dd>
                    </div>

                    <div className="flex flex-col px-4 py-8 text-center">
                        <dt className="order-last text-lg font-medium text-gray-500">Winners Selected</dt>
                        <dd className="text-4xl font-extrabold text-rose-600 md:text-5xl">5k</dd>
                    </div>
                </dl>
            </div>

        </section>
    )
}
