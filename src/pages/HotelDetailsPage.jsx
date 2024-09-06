import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import StarGenerator from "../components/shared/StarGenerator";
import OtherHotels from "../components/HotelDetailsPage/OtherHotels";
import HotelMap from "../components/HotelDetailsPage/HotelMap";
import FormReservations from "../components/HotelDetailsPage/FormReservations";
import Reviews from "../components/HotelDetailsPage/Reviews";
import SliderImgHotel from "../components/HotelDetailsPage/SliderImgHotel";
import "./styles/HotelDetails.css";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const [hotel, getHotel] = useFetch();

  useEffect(() => {
    const url = `https://hotels-api.academlo.tech/hotels/${id}`;
    getHotel(url);
  }, [id]);

  return (
    <section className="details">
      <div className="details__title-container">
        <h2 className="details__title">{hotel?.name}</h2>
        <div className="details__stars">
          {hotel?.rating && <StarGenerator rating={hotel.rating} />}
        </div>
        <span className="details__rating">{hotel?.rating}</span>
      </div>
      <div className="details__location-container flex-container">
        <div className="details__slider">
          <SliderImgHotel hotel={hotel} />
        </div>
        <div className="details__map">
          {hotel && <HotelMap lat={hotel?.lat} lon={hotel?.lon} />}
        </div>
      </div>
      <div className="details__city">
        {hotel?.city.name}, {hotel?.city.country}
      </div>
      <div className="details__address flex-container">
        <i className="bx bx-map"></i>
        <address>{hotel?.address}</address>
      </div>
      <p className="details__description">{hotel?.description}</p>
      <section className="details__reservations">
        {localStorage.getItem("token") ? (
          <FormReservations hotelId={hotel?.id} />
        ) : (
          <p>
            If you want to make a reservation, please{" "}
            <Link to="/login"> Login</Link>
          </p>
        )}
      </section>
      <div className="details__reviews">
        <Reviews hotelId={hotel?.id} />
      </div>
      <div className="details__other">
        <OtherHotels city={hotel?.city} id={hotel?.id} />
      </div>
    </section>
  );
};

export default HotelDetailsPage;
