import React from 'react';
import StarRatings from 'react-star-ratings';
import Chip from './Chip';

interface IBookCardProps {
    book: {
        ageRange?: number[];
        ageRestriction?: number;
        author: string;
        categories: string[];
        createdAt: Date;
        createdBy: string;
        dataPublished: Date;
        description: string;
        id: string;
        isArchived: boolean;
        pdfContents?: {
            content: string,
            page: number,
            pdfFileName: string
        }[];
        ratings: [
            {
                userId: string,
                comment: string,
                firstName: string,
                lastName: string,
                avatar: string,
                rating: number,
            }
        ],
        title: string;
        updatedAt: Date;
        updatedBy: string;
        isReadBy: string[];
        covers: {
            image: string;
            coverType: string
        }[];
    },
    onClick: (bookId: string) => void;
}

const BookCard: React.FC<IBookCardProps> = ({
    book,
    onClick
}) => {
    const [showInfo, setShowInfo] = React.useState(false);
    const rating = book.ratings.reduce((acc, rating) => acc + rating.rating, 0) / book.ratings.length;
    const cover = book.covers.find(cover => cover.coverType === 'FRONT');

    return (
        <div
            onClick={() => onClick(book.id)}
            className={`cursor-pointer shadow-lg h-fit relative text-black`}
            onMouseEnter={() => { if (window.innerWidth >= 768) setShowInfo(true) }}
            onMouseLeave={() => { if (window.innerWidth >= 768) setShowInfo(false) }}
        >
            <div className="flex flex-col justify-center items-center relative w-32 md:w-48 gap-2">
                <div>

                    <img src={cover ? cover.image : "https://www.picmaker.com/assets/images/bookcovermaker/template-1.png"} alt={book.title} className="w-32 md:w-48 h-48 md:h-56 max-w-none rounded-3xl" />
                    <div className="bg-blue-800 opacity-90 absolute w-full flex justify-center items-center bottom-4">
                        <h1 className="text-sm md:text-base font-light text-white">{book.title}</h1>
                    </div>
                </div>
                {showInfo &&
                    <div className="bg-white shadow-lg p-4 grid gap-2 rounded-3xl z-30 duration-300 absolute -top-2 translate-x-6">
                        <div className='flex gap-2 h-auto'>

                            <img src={cover ? cover.image : "https://www.picmaker.com/assets/images/bookcovermaker/template-1.png"} alt={book.title} className="w-10 md:w-14 h-20 md:h-24 max-w-none" />
                            <div>
                                <h1 className='text-md font-boild w-24 md:w-36'>{book.title}</h1>
                                <label className='text-xs font-light w-24 md:w-36'>{book.author}</label>
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="16px"
                                    starSpacing="2px"
                                    z-index="20"
                                />

                            </div>
                        </div>
                        <p className='text-xs'>{book.description.slice(0, 190).concat("...")}</p>
                        <div className='flex flex-wrap gap-1 max-h-20 overflow-scroll scrollbar-hide'
                        >
                            {
                                book.categories.map((category, index) => (
                                    <Chip key={index} label={category} color="bg-blue-800" textColor="text-white" />
                                ))
                            }
                        </div>
                    </div>}
            </div>


        </div>
    )
}

export default BookCard