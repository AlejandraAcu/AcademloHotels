import { useForm } from "react-hook-form";
import useCrud from "../../hooks/useCrud";
import { useNavigate } from "react-router-dom";
import "./styles/FormReservation.css";

const FormReservations = ({ hotelId }) => {
  const { reset, handleSubmit, register } = useForm();
  const [, , createBooking] = useCrud();
  const navigate = useNavigate();

  const submit = (data) => {
    const url = "https://hotels-api.academlo.tech/bookings";

    const objData = { ...data, hotelId };

    createBooking(url, objData, true);
    reset({
      checkIn: "",
      checkOut: "",
    });
    navigate("/reservations");
  };

  return (
    <form className="reserv" onSubmit={handleSubmit(submit)}>
      <h3 className="form__title">Make your reservation</h3>
      <div className="form__container flex-container">
        <label className="form__checkin flex-container">
          <span className="form__checkin-label">Check-in</span>
          <input
            className="form__checkin-input"
            {...register("checkIn")}
            type="date"
          />
        </label>
        <label className="form__checkout flex-container">
          <span className="form__checkout-label">Check-out</span>
          <input
            className="form__checkout-input"
            {...register("checkOut")}
            type="date"
          />
        </label>
        <button className="form__btn">Reserve</button>
      </div>
    </form>
  );
};

export default FormReservations;
