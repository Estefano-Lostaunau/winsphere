import React, { useEffect } from 'react';
import KeenSlider from 'keen-slider';
import { ReviewCard } from './ReviewCard';

export const Reviews = () => {
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
            review: "Excellent functionality and interface. The page is very intuitive and easy to use. The raffles are conducted transparently and fairly. Additionally, the user experience is very pleasant and smooth. I love the variety of options available and the ease with which I can participate in the raffles. Highly recommended!"
        },
        {
            id: 2,
            name: "Mary Johnson",
            image: "https://img.freepik.com/foto-gratis/cerrar-hermosa-mujer-sonriente_23-2148941466.jpg",
            rating: 5,
            review: "No login is required to use it, which is very convenient. I can participate in the raffles quickly without having to create an account. This makes the process much faster and simpler. Additionally, the page is very secure and reliable. Awesome!"
        },
        {
            id: 3,
            name: "Charles Brown",
            image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
            rating: 5,
            review: "It has a wide variety of winner options. I love that I can choose between different types of raffles and prizes. The page offers a great number of options and there is always something new and exciting to win. The transparency and fairness in the raffles are impressive. Five stars without a doubt!"
        },
        {
            id: 4,
            name: "Anna Davis",
            image: "https://i.pinimg.com/736x/1b/e7/54/1be7542f7f840be3cf9a73187bb4b8c0.jpg",
            rating: 5,
            review: "The best raffle page I have found. The roulette is exciting and the prizes are incredible. The interface is very user-friendly and easy to navigate. The raffles are fair and transparent, which gives me a lot of confidence when participating. Excellent service!"
        },
        {
            id: 5,
            name: "Louis Wilson",
            image: "https://img.freepik.com/foto-gratis/disparo-cabeza-chico-esceptico-mirando-algo-poco-divertido-haciendo-muecas-pie-reacios-contra-fondo-azul_1258-65723.jpg",
            rating: 5,
            review: "The interface is very user-friendly and easy to navigate. The raffles are fair and transparent. I really like the variety of prizes and the ease with which I can participate. Additionally, the page is very secure and reliable. Definitely the best option for participating in raffles!"
        },
        {
            id: 6,
            name: "Laura Martinez",
            image: "https://i.blogs.es/f6f619/window_y_100k_models_-_google_drive/1366_2000.webp",
            rating: 5,
            review: "I love that I don't need to register to participate. It's very quick and convenient. The page is very intuitive and easy to use. The raffles are conducted fairly and transparently. Additionally, the user experience is very pleasant and smooth. Five stars for ease of use!"
        },
        {
            id: 7,
            name: "Peter Anderson",
            image: "https://images.unsplash.com/photo-1648415041078-d5b259c683be?q=80&w=2070&auto=format&fit=crop",
            rating: 5,
            review: "The winner options are very varied and exciting. There is always something new and exciting to win. The page is very intuitive and easy to use. The raffles are conducted fairly and transparently. Additionally, the user experience is very pleasant and smooth. Highly recommended!"
        },
        {
            id: 8,
            name: "Sophia Rodriguez",
            image: "https://plus.unsplash.com/premium_photo-1664203068145-b1d7d1680f6c?q=80&w=1887&auto=format&fit=crop",
            rating: 5,
            review: "Excellent functionality and design. The page is very intuitive and the raffles are fair. I love the variety of options available and the ease with which I can participate in the raffles. Additionally, the user experience is very pleasant and smooth. Five stars for transparency and ease of use!"
        }
    ];
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Read trusted reviews from our customers
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
