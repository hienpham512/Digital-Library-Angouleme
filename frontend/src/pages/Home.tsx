import Carousel, { ICarouselProps } from "@/components/Carousel";
import React from "react";
import { getTrending, getReadBooks, getOnGoingBooks, getUserBooksRecommendation } from "@/api";
import { useUser } from "@/contexts/authContext";

const Home: React.FC = () => {
  const [trending, setTrending] = React.useState([]);
  const [readBooks, setReadBooks] = React.useState([]);
  const [onGoingBooks, setOnGoingBooks] = React.useState([]);
  const [booksRecommendation, setBooksRecommendation] = React.useState([]);
  const user = useUser();

  const getBooks = async (user: any) => {
    await getTrending((user as any).accessToken).then((res) => {
      setTrending(res.slice(0, 10));
    });

    await getReadBooks(user.uid, (user as any).accessToken).then((res) => {
      setReadBooks(res);
    });

    await getOnGoingBooks(user.uid, (user as any).accessToken).then((res) => {
      setOnGoingBooks(res);
    });

    await getUserBooksRecommendation(user.uid, (user as any).accessToken).then((res) => {
      setBooksRecommendation(res);
    });
  };


  React.useEffect(() => {
    if (user) {
      getBooks(user);
    }
  }, []);

  const handleOpenBookDetail = (bookId: string) => {
    window.open(`book/${bookId}`, '_blank');
  }

  return (
    <div className="pb-14 overflow-hidden">
      {
        trending.length > 0 &&
        <React.Fragment>
          <div className="py-1 font-semibold text-3xl w-full border-b border-white mb-2">News & Trending</div>
          <Carousel
            options={trending as unknown as ICarouselProps["options"]}
            showSelected
            onClick={handleOpenBookDetail}
          />
        </React.Fragment>
      }
      {
        onGoingBooks.length > 0 &&
        <React.Fragment>
          <div className="py-1 font-semibold text-3xl w-full border-b border-white mb-2">Continue</div>
          <Carousel
            options={onGoingBooks as unknown as ICarouselProps["options"]}
            onClick={handleOpenBookDetail}
          />
        </React.Fragment>
      }
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
      {
        readBooks.length > 0 &&
        <React.Fragment>
          <div className="py-1 font-semibold text-3xl w-full border-b border-white mb-2">Read again</div>
          <Carousel
            options={readBooks as unknown as ICarouselProps["options"]}
            onClick={handleOpenBookDetail}
          />
        </React.Fragment>
      }

    </div>
  );
};

export default Home;
