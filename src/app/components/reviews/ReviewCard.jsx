import { StarRating } from './StarRating';

export const ReviewCard = ({ review }) => {
    return (
        <div className="keen-slider__slide opacity-40 transition-opacity duration-500">
            <blockquote className="rounded-lg bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                    <img
                        alt=""
                        src={review.image}
                        className="size-14 rounded-full object-cover"
                    />
                    <div>
                        <StarRating rating={review.rating} />
                        <p className="mt-0.5 text-lg font-medium text-gray-900">{review.name}</p>
                    </div>
                </div>
                <p className="mt-4 text-gray-700">{review.review}</p>
            </blockquote>
        </div>
    );
};