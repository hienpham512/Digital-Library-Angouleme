import { Book as BookType } from '@hienpham512/angouleme-types';
import React from 'react';
import { getBook, getBookBooksRecommendation } from "@/api"
import { useUser } from '@/contexts/authContext';
import { Icon } from '@iconify/react';
import Carousel, { ICarouselProps } from '@/components/Carousel';
import { useNavigate } from 'react-router-dom';

interface IBookProps { }

const Book: React.FC<IBookProps> = ({ }) => {
    const user = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [book, setBook] = React.useState<BookType | null>(null);
    const [booksRecommendation, setBooksRecommendation] = React.useState<BookType[]>([]);

    React.useEffect(() => {
        if (user) {
            const bookId = window.location.pathname.split('/')[3];
            getBook(bookId, (user as any).accessToken).then((res) => {
                setBook(res);
            });
            getBookBooksRecommendation(bookId, user.uid, (user as any).accessToken).then((res) => {
                setBooksRecommendation(res);
            });
            setLoading(false);
        }
    }, [user, loading]);

    if (!book || !user) return (
        <div className="pb-14 overflow-hidden h-screen w-full">
            <div className="py-1 font-semibold text-3xl w-full border-b border-white mb-2">Book</div>
            <div className="flex justify-center items-center h-full">
                <Icon icon="line-md:loading-twotone-loop" height="3rem" width="3rem" className="text-white text-4xl" />
            </div>
        </div>
    )

    const handleOpenBookDetail = (bookId: string) => {
        navigate(`/home/book/${bookId}`);
        window.location.reload();
    }

    return (
        <div className="pb-14 overflow-hidden">
            <React.Fragment>
                <div className="py-1 font-semibold text-3xl w-full border-b border-white mb-2">Book</div>
                <Carousel
                    options={[book] as unknown as ICarouselProps["options"]}
                    showSelected
                    showListSelected={false}
                    onClick={handleOpenBookDetail}
                />
            </React.Fragment>
            {
                booksRecommendation.length > 0 &&
                <React.Fragment>
                    <div className="py-1 font-semibold text-3xl w-full border-b border-white mb-2">Recommend to you</div>
                    <Carousel
                        options={booksRecommendation as unknown as ICarouselProps["options"]}
                        onClick={handleOpenBookDetail}
                    />
                </React.Fragment>
            }
        </div>
    )
}

export default Book