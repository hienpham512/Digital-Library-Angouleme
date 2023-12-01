import React from 'react';
import BookCard from './BookCard';
import StarRatings from 'react-star-ratings';
import Chip from './Chip';
import { Icon } from '@iconify/react';
import { Tooltip } from "react-tooltip";

export interface ICarouselProps {
    options: {
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
    }[],
    showSelected?: boolean,
    showListSelected?: boolean,
    onClick: (bookId: string) => void,
}

const Carousel: React.FC<ICarouselProps> = ({
    options,
    showSelected = false,
    showListSelected = true,
    onClick

}) => {
    const [selectedOption, setSelectedOption] = React.useState(0);
    const [rating, setRating] = React.useState(0);
    const [coverFront, setCoverFront] = React.useState<{
        image: string;
        coverType: string
    } | undefined>();

    React.useEffect(() => {
        const rating = options[selectedOption].ratings.reduce((acc, rating) => acc + rating.rating, 0) / options[selectedOption].ratings.length;
        setRating(rating);
        const cover = options[selectedOption].covers.find(cover => cover.coverType === 'FRONT');
        setCoverFront(cover);
    }, [selectedOption]);

    return (
        <div className='content-center grid gap-5'>
            {
                showSelected &&
                <div className='flex justify-start items-center transition-all ease-in-out duration-500'>
                    {options.length > 1 && <Icon icon='mingcute:arrow-left-fill'
                        className='text-white text-4xl z-10 cursor-pointer absolute left-2 top-[50%] border border-white rounded-full p-1 hover:scale-105 hover:bg-white hover:text-black duration-300'
                        width="2rem" height="2rem"
                        onClick={() => { selectedOption === 0 ? setSelectedOption(options.length - 1) : setSelectedOption(selectedOption - 1) }} />}
                    <div className='flex gap-5 justify-start items-start md:w-3/5'>
                        <div className='flex flex-col gap-4'>
                            <img src={coverFront ? coverFront.image : "https://www.picmaker.com/assets/images/bookcovermaker/template-1.png"} alt={options[selectedOption].title} className="w-28 md:w-36 h-40 md:h-52" />
                            <div className='flex gap-4'>
                                <button
                                    id="add-button"
                                    className='p-1 whitespace-nowrap bg-white text-green-500 border rounded-full font-semibold hover:scale-110 duration-300'>
                                    <Icon icon='mdi:plus' width="2rem" height="2rem" />
                                </button>
                                <button
                                    id="heart-button"
                                    className='p-1 whitespace-nowrap bg-white text-red-500 border rounded-full font-semibold hover:scale-110 duration-300'>
                                    <Icon icon='akar-icons:heart' width="2rem" height="2rem" />
                                </button>
                                <Tooltip
                                    anchorId="add-button"
                                    place="top"
                                    variant="info"
                                    content="Add to list"
                                />
                                <Tooltip
                                    anchorId="heart-button"
                                    place="top"
                                    variant="info"
                                    content="Add to favorites"
                                />
                            </div>
                        </div>
                        <div className='grid gap-5'>
                            <div className='grid'>
                                <h1 className='text-2xl font-boild'>{options[selectedOption].title}</h1>
                                <label className='text-lg font-light'>{options[selectedOption].author}</label>
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
                            <div className='flex flex-col gap-5'>

                                <p>{options[selectedOption].description.slice(0, window.innerWidth >= 768 ? 200 : 150).concat("...")}</p>
                                <div className='flex flex-wrap gap-1 max-h-20 overflow-scroll scrollbar-hide'
                                >
                                    {
                                        options[selectedOption].categories.map((caterogy, index) => (
                                            <Chip key={index} label={caterogy} color="bg-blue-800" textColor="text-white" />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='hidden sm:block p-2 h-80 overflow-scroll w-2/5 scrollbar-hide'>
                        {
                            options[selectedOption].ratings.map((rating, index) => (
                                <div key={index} className='p-2'>
                                    <div className='flex gap-2 justify-start items-center'>
                                        {
                                            rating.avatar !== ""
                                                ? <img src={rating.avatar}
                                                    className={`w-10 h-10 rounded-full ${index === selectedOption ? 'bg-white' : 'bg-gray-500'}`}
                                                />
                                                : <Icon icon='mdi:account-circle'
                                                    width="2.5rem"
                                                    height="2.5rem"
                                                />
                                        }
                                        <div className='grid'>
                                            <span className='font-light'>{rating.firstName} {rating.lastName}</span>
                                            <StarRatings
                                                rating={rating.rating}
                                                starRatedColor="gold"
                                                numberOfStars={5}
                                                name="rating"
                                                starDimension="16px"
                                                starSpacing="2px"
                                                z-index="20"
                                            />
                                        </div>
                                    </div>
                                    <p className='p-2 border-b border-white font-light italic text-sm'>
                                        {rating.comment}
                                    </p>
                                </div>
                            ))


                        }
                    </div>
                    {
                        options.length > 1 && <Icon icon='mingcute:arrow-right-fill'
                            className='text-white text-4xl z-10 cursor-pointer absolute right-5 top-[50%] border border-white rounded-full p-1 hover:scale-105 hover:bg-white hover:text-black duration-300'
                            width="2rem"
                            height="2rem"
                            onClick={() => { selectedOption === options.length - 1 ? setSelectedOption(0) : setSelectedOption(selectedOption + 1) }} />
                    }
                </div>
            }
            {showSelected && options.length > 1 && <div className='flex gap-2 justify-center items-center'>
                {
                    options.map((option, index) => (
                        <div key={index}
                            onClick={() => setSelectedOption(index)}
                            className={`w-2 h-2 rounded-full hover:scale-150 duration-300 cursor-pointer ${index === selectedOption ? 'bg-white' : 'bg-gray-500'}`}></div>
                    ))
                }
            </div>}
            {showListSelected &&
                <div className='overflow-x-scroll flex gap-6 py-5 md:py-16 scrollbar-hide overflow-y-visible'>
                    {
                        options.map((option, index) => (
                            <BookCard key={index} book={option} onClick={onClick} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Carousel