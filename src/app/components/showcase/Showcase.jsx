import React from 'react'
import matchUpImg from '../../../../public/matchup.png';
import rouletteImg from '../../../../public/roulette.png';
import rouletteIcon from '../../../../public/roulette-icon.svg';
import matchupIcon from '../../../../public/matchup-icon.svg';

export const Showcase = () => {
    return (
        <section className="bg-white">
            <div className="relative overflow-hidden pt-16 pb-32 space-y-24">
                {/* Section 1 */}
                <div className="relative">
                    <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                        <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                            <div>
                                <div>
                                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-500">
                                        <img
                                            src={rouletteIcon}
                                            alt="Roulette Icon"
                                            className="h-10 w-10 text-white"
                                        />
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                        Roulette
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-800">
                                        Our advanced Roulette feature allows you to conduct exciting raffles and giveaways effortlessly. Customize the number of winners, add engaging sound effects, and ensure a fair and fun selection process for all participants.
                                    </p>
                                    <div className="mt-6 text-xs font-medium grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 text-gray-950">

                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-360"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M17 15.328c2.414 -.718 4 -1.94 4 -3.328c0 -2.21 -4.03 -4 -9 -4s-9 1.79 -9 4s4.03 4 9 4" />
                                                <path d="M9 13l3 3l-3 3" />
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Choose Number of Winners
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-antenna-bars-3"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M6 18l0 -3"></path>
                                                <path d="M10 18l0 -6"></path>
                                                <path d="M14 18l0 .01"></path>
                                                <path d="M18 18l0 .01"></path>
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Add Sound Effects
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-load-balancer"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M12 13m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                                <path d="M12 20m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                                                <path d="M12 16v3"></path>
                                                <path d="M12 10v-7"></path>
                                                <path d="M9 6l3 -3l3 3"></path>
                                                <path d="M12 10v-7"></path>
                                                <path d="M9 6l3 -3l3 3"></path>
                                                <path d="M14.894 12.227l6.11 -2.224"></path>
                                                <path d="M17.159 8.21l3.845 1.793l-1.793 3.845"></path>
                                                <path d="M9.101 12.214l-6.075 -2.211"></path>
                                                <path d="M6.871 8.21l-3.845 1.793l1.793 3.845"></path>
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Customizable Wheel Design
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-brand-speedtest"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5.636 19.364a9 9 0 1 1 12.728 0"></path>
                                                <path d="M16 9l-4 4"></path>
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Real-Time Results
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <a
                                            className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                                            href="/login"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 sm:mt-16 lg:mt-0">
                            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                                <img
                                    loading="lazy"
                                    width="647"
                                    height="486"
                                    className="w-full rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                    style={{ color: "transparent" }}
                                    src={rouletteImg}
                                    alt="NLP visualization"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="relative">
                    <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                        <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0 lg:col-start-2">
                            <div>
                                <div>
                                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-500">
                                        <img
                                            src={matchupIcon}
                                            alt="Match Up Icon"
                                            className="h-8 w-8 text-white"
                                        />
                                    </span>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                        Match up
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-800">
                                        Organize exciting team-based raffles and giveaways with Winsphere. Easily create and manage teams, spin the wheel, and let the competition determine your winners.
                                    </p>
                                    <div className="mt-6 text-xs font-medium grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 text-gray-950">

                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-organization"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <circle cx="9" cy="7" r="4" />
                                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                                <path d="M15 11a4 4 0 0 1 -6 0" />
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Instant Team Matching
                                            </span>
                                        </div>

                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-calendar-event"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <rect x="4" y="5" width="16" height="16" rx="2" />
                                                <line x1="16" y1="3" x2="16" y2="7" />
                                                <line x1="8" y1="3" x2="8" y2="7" />
                                                <line x1="4" y1="11" x2="20" y2="11" />
                                                <circle cx="12" cy="16" r="1" />
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Schedule Matches
                                            </span>
                                        </div>

                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-trend-up"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <polyline points="7 17 10 14 13 17 18 12 21 15" />
                                                <polyline points="17 7 21 7 21 11" />
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Track Team Performance
                                            </span>
                                        </div>

                                        <div className="inline-flex items-center gap-2 text-xs text-gray-700">
                                            <svg
                                                className="icon icon-tabler text-gray-600 size-4 icon-tabler-alert-question"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <circle cx="12" cy="12" r="9" />
                                                <line x1="12" y1="17" x2="12" y2="12" />
                                                <circle cx="12" cy="8" r=".5" fill="currentColor" />
                                                <path d="M12 3a9 9 0 0 0 0 18" />
                                            </svg>
                                            <span className="text-gray-600 font-medium text-sm">
                                                Real-Time Match Updates
                                            </span>
                                        </div>

                                    </div>
                                    <div className="mt-6">
                                        <a
                                            className="inline-flex rounded-lg bg-pink-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-600 hover:bg-pink-700 hover:ring-pink-700"
                                            href="/"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 sm:mt-16 lg:mt-0">
                            <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                                <img
                                    loading="lazy"
                                    width="647"
                                    height="486"
                                    className="w-full  rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                                    style={{ color: "transparent" }}
                                    src={matchUpImg}
                                    alt="Sentiment analysis"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
