import React, { useEffect } from 'react';
import KeenSlider from 'keen-slider';
import { ReviewCard } from './ReviewCard';
import { useIntl } from 'react-intl';

export const Reviews = () => {
    const intl = useIntl();
    useEffect(() => {
        const keenSliderActive = document.getElementById('keen-slider-active');
        const keenSliderCount = document.getElementById('keen-slider-count');

        const keenSlider = new KeenSlider(
            '#keen-slider',
            {
                loop: true,
                defaultAnimation: {
                    duration: 750,
                },
                slides: {
                    origin: 'center',
                    perView: 1,
                    spacing: 16,
                },
                breakpoints: {
                    '(min-width: 640px)': {
                        slides: {
                            origin: 'center',
                            perView: 1.5,
                            spacing: 16,
                        },
                    },
                    '(min-width: 768px)': {
                        slides: {
                            origin: 'center',
                            perView: 1.75,
                            spacing: 16,
                        },
                    },
                    '(min-width: 1024px)': {
                        slides: {
                            origin: 'center',
                            perView: 3,
                            spacing: 16,
                        },
                    },
                },
                created(slider) {
                    slider.slides[slider.track.details.rel].classList.remove('opacity-40');

                    keenSliderActive.innerText = slider.track.details.rel + 1;
                    keenSliderCount.innerText = slider.slides.length;
                },
                slideChanged(slider) {
                    slider.slides.forEach((slide) => slide.classList.add('opacity-40'));

                    slider.slides[slider.track.details.rel].classList.remove('opacity-40');

                    keenSliderActive.innerText = slider.track.details.rel + 1;
                },
            },
            []
        );

        const keenSliderPrevious = document.getElementById('keen-slider-previous');
        const keenSliderNext = document.getElementById('keen-slider-next');

        keenSliderPrevious.addEventListener('click', () => keenSlider.prev());
        keenSliderNext.addEventListener('click', () => keenSlider.next());

        return () => {
            keenSlider.destroy();
        };
    }, []);
    const reviewsData = [
        {
            id: 1,
            name: "John Smith",
            image: "https://img.freepik.com/foto-gratis/retrato-interior-joven-barbudo-peinado-moda_273609-3903.jpg",
            rating: 5,
            review: intl.formatMessage({ id: 'review_1' })
        },
        {
            id: 2,
            name: "Mary Johnson",
            image: "https://img.freepik.com/foto-gratis/cerrar-hermosa-mujer-sonriente_23-2148941466.jpg",
            rating: 5,
            review: intl.formatMessage({ id: 'review_2' })
        },
        {
            id: 3,
            name: "Charles Brown",
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
            rating: 5,
            review: intl.formatMessage({ id: 'review_3' })
        },
        {
            id: 4,
            name: "Anna Davis",
            image: "https://i.pinimg.com/736x/1b/e7/54/1be7542f7f840be3cf9a73187bb4b8c0.jpg",
            rating: 5,
            review: intl.formatMessage({ id: 'review_4' })
        },
        {
            id: 5,
            name: "Louis Wilson",
            image: "https://img.freepik.com/foto-gratis/disparo-cabeza-chico-esceptico-mirando-algo-poco-divertido-haciendo-muecas-pie-reacios-contra-fondo-azul_1258-65723.jpg",
            rating: 5,
            review: intl.formatMessage({ id: 'review_5' })
        },
        {
            id: 6,
            name: "Laura Martinez",
            image: "https://i.blogs.es/f6f619/window_y_100k_models_-_google_drive/1366_2000.webp",
            rating: 5,
            review: intl.formatMessage({ id: 'review_6' })
        },
        {
            id: 7,
            name: "Peter Anderson",
            image: "https://images.unsplash.com/photo-1648415041078-d5b259c683be?q=80&w=2070&auto=format&fit=crop",
            rating: 5,
            review: intl.formatMessage({ id: 'review_7' })
        },
        {
            id: 8,
            name: "Sophia Rodriguez",
            image: "https://plus.unsplash.com/premium_photo-1664203068145-b1d7d1680f6c?q=80&w=1887&auto=format&fit=crop",
            rating: 5,
            review: intl.formatMessage({ id: 'review_8' })
        }
    ];
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    {intl.formatMessage({ id: 'reviews_title' })}
                </h2>

                <div className="mt-8">
                    <div id="keen-slider" className="keen-slider">
                        {reviewsData.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-4">
                        <button
                            aria-label="Previous slide"
                            id="keen-slider-previous"
                            className="text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <p className="w-16 text-center text-sm text-gray-700">
                            <span id="keen-slider-active"></span>
                            /
                            <span id="keen-slider-count"></span>
                        </p>

                        <button
                            aria-label="Next slide"
                            id="keen-slider-next"
                            className="text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
