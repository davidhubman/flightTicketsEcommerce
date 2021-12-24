import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import styles from "./TicketPage.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import PassengerForm from "../../components/PassengerForm/PassengerForm";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Ticketinfo from "../../components/TicketInfo/Ticketinfo";
import { validateForm } from "../../components/PassengerForm/validations";
import swal from "sweetalert";

export default function TicketPage() {
  const { state } = useLocation();
  const history = useHistory();


  const totalPassengers = parseInt(state.adults) + parseInt(state.childs);

  const passengersIdentifications = {};
  const [validForms, setValidForms] = useState(passengersIdentifications);

  function insertForms(passengers) {
    const forms = [];
    for (let i = 1; i < passengers + 1; i++) {
      forms.push(
        <PassengerForm
          totalPassengers={passengers}
          passenger={i}
          key={i}
          validForms={validForms}
          setValidForms={setValidForms}
        />
      );
      passengersIdentifications[`passenger${i}`] = [
        false,
        { name: "", lastName: "", dni: "" },
      ];
    }

    return forms;
  }
  insertForms(totalPassengers);


  const handleSubmit = () => {
    for (let passengerId in validForms) {
      const passengerData = validForms[passengerId][1];
      if (
        validateForm(passengerId, passengerData, validForms, setValidForms) !==
        true
      ) {
        return validateForm(
          passengerId,
          passengerData,
          validForms,
          setValidForms
        );
      }
    }

    const passengers = Object.values(validForms);
    const passengersData = passengers.map((passenger, index) => {
      passenger[0] = `Pasajero ${index + 1}`;
      return passenger;
    });

    if (passengersData.every((passenger) => passenger[0])) {
      const offerProps = {
        offer: { ...state },
        passengers: passengersData,
      };

      swal({
        title: "Datos registrados",
        // text: "Tu boleto ha sido generado",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        history.push({ 
          pathname : `/seats/${offerProps.offer.offers}`,
          state: {...offerProps}
        });
      });
    } else {
      swal({
        title: "¡Error!",
        text: "Debe completar todos los campos de manera correcta",
        icon: "error",
        button: "Aceptar",
      });
    }
  };

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className={styles.ticketPage}>
      <GoHomeButton />
      <section className={styles.ticketPageContent}>
        <header className={styles.ticketPageHeader}>
          <img src={logo} alt="DevSky" />
          <h1>
            {totalPassengers === 1
              ? `Confirme los datos del pasajero`
              : `Confirme los datos de los pasajeros`}
          </h1>
        </header>

        {/* Forms */}
        <div className={styles.ticketPageForms}>
          {insertForms(totalPassengers)}
        </div>

        {/* Info */}
        <div className={styles.ticketPageInfo}>
          <h2>Información del vuelo</h2>
          <Ticketinfo {...state} />
        </div>

        {/* Buttons */}
        <div className={styles.ticketPageButtons}>
          <button onClick={history.goBack}>Cancelar</button>
          <button onClick={() => handleSubmit()}>Continuar</button>
          {/* <Link to="/">Continuar</Link> */}
        </div>
      </section>
    </main>
  );
}
