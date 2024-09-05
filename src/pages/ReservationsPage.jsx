import { useEffect, useState } from "react";
import useCrud from "../hooks/useCrud";
import "./styles/ReservationsPage.css";
import BookCard from "../components/ReservationsPage/BookCard";
import FormReviews from "../components/ReservationsPage/FormReviews";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const ReservationsPage = () => {
  const [reservations, getReservations, , deleteReservation] = useCrud();
  const [showLoader, setShowLoader] = useState(true);
  const [bookSelected, setBookSelected] = useState();
  const [formIsOpen, setFormIsOpen] = useState(false);

  useEffect(() => {
    const url = "https://hotels-api.academlo.tech/bookings";
    getReservations(url, true);

    const timeout = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="reservations flex-container">
      <h2 className="reservations__title">Reservations</h2>
      {showLoader ? (
        <Loader />
      ) : reservations?.length ? (
        <div>
          <FormReviews
            formIsOpen={formIsOpen}
            bookSelected={bookSelected}
            setFormIsOpen={setFormIsOpen}
            setBookSelected={setBookSelected}
          />
          <div className="reservations__container flex-container">
            {reservations?.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                deleteReservation={deleteReservation}
                setBookSelected={setBookSelected}
                setFormIsOpen={setFormIsOpen}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2>
          There aren't active reservations. To choose a hotel and book go to{" "}
          <Link to="/">Home</Link>
        </h2>
      )}
    </section>
  );
};

export default ReservationsPage;
