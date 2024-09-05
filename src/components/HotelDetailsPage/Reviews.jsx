import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import StarGenerator from "../shared/StarGenerator";
import "./styles/Review.css";

const Reviews = ({ hotelId }) => {
  const [visibleComments, setVisibleComments] = useState(5);
  const [reviewsHotel, getReviewsHotel] = useFetch();

  useEffect(() => {
    const url = `https://hotels-api.academlo.tech/reviews?hotelId=${hotelId}`;
    getReviewsHotel(url);
  }, [hotelId]);

  console.log(reviewsHotel);

  const handleReviews = () => {
    setVisibleComments((prevCount) => prevCount + 5);
  };

  return (
    <div>
      <h3 className="reviews__title">Comments</h3>
      <div className="reviews__holet">
        {reviewsHotel?.results.slice(0, visibleComments).map((review) => (
          <ul key={review.id}>
            <li>{review.user.firstName}</li>
            <li>
              <StarGenerator rating={review.rating} /> {review.rating}
            </li>
            <li>{review.comment}</li>
          </ul>
        ))}
      </div>
      {visibleComments < reviewsHotel?.results.length && (
        <button className="reviews__btn" onClick={handleReviews}>
          See More...
        </button>
      )}
    </div>
  );
};

export default Reviews;
