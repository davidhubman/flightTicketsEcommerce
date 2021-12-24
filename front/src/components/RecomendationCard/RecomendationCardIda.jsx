import { useState, useEffect } from "react";
import styles from "./RecomendationCard.module.scss";
import {
  AiOutlineExclamationCircle,
  AiOutlineFieldNumber,
} from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import {
  BsArrowLeftRight,
  BsCalendarDateFill,
  BsCalendarDate,
} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { IoMdAirplane } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { auth, db } from "../../firebaseConfig";
import { sendFavs } from "../../redux/actions/";
import { useAuthState } from "react-firebase-hooks/auth";

import swal from "sweetalert";

export default function OfferCardI(props) {
  const [clicked, setClicked] = useState([false, "Ver detalles"]);
  const [user] = useAuthState(auth);
  const [fav, setFav] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const dataFromQuery = {};

  const getUser = () => {
    db.collection("saves").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const filtrado = docs.filter((doc) => doc.userId === user?.uid);
      setFav(filtrado);
    });
  };

  useEffect(() => {
    getUser();  // eslint-disable-next-line 
  }, []);

  const handleFavs = (e) => {
    if (auth.currentUser) {
      if (fav.some((el) => el.offers === e.target.value)) {
        swal({
          title: "Error",
          text: "Ya has añadido ese favorito!",
          icon: "error",
          button: "Volver",
        });
      } else {
        const info = {
          ...dataFromQuery,
          userId: auth.currentUser.uid,
          ...props,
        };
        if (dispatch(sendFavs(info))) {
          // @ts-ignore
          swal({
            title: "Se ha agregado a favoritos",
            text: "El vuelo se ha agregado a tus favoritos",
            icon: "success",
          }).then(() => console.log("added"));
        }
      }
    } else {
      // @ts-ignore
      swal({
        title: "Debes iniciar sesión",
        text: "Para poder agregar a favoritos debes estar registrado",
        icon: "warning",
        dangerMode: true,
      }).then(() => history.push("/login"));
    }
  };

  const handleBuy = (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      history.push({
        pathname: `/ticket/${props.offers}`,
        state: {
          ...props,
          ...dataFromQuery,
        },
      });
    } else {
      // @ts-ignore
      swal({
        title: "Debes iniciar sesión para comprar",
        icon: "warning",
        dangerMode: true,
      }).then(() => history.push("/login"));
    }
  };

  const handleClick = () => {
    if (!clicked[0]) {
      return setClicked([true, "Cerrar"]);
    } else {
      return setClicked([false, "Ver detalles"]);
    }
  };

  return (
    <>
      <section className={styles.offers}>
        <div className={styles.offersCard}>
          <div className={styles.offersCardMainInfo}>
            {/* Puntos de partida y llegada */}
            <div className={styles.offersCardInfo}>
              <p>
                <FaPlaneDeparture />{" "}
                {props.originCity ? props.originCity : props.originAirport}{" "}
              </p>
              <p>
                <FaPlaneArrival />{" "}
                {props.destinationCity
                  ? props.destinationCity
                  : props.destinationAirport}{" "}
              </p>
            </div>

            {/* Tipo de vuelo */}
            <div className={styles.offersCardType}>
              {props.transfers.length === 1 ? (
                <p>
                  {" "}
                  <IoMdAirplane /> Vuelo directo{" "}
                </p>
              ) : (
                <p>
                  {" "}
                  <BsArrowLeftRight /> Tiene {props.transfers.length - 1}{" "}
                  escalas
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className={styles.offersCardButtons}>
              <button
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                <AiOutlineExclamationCircle />
                {clicked[1]}
              </button>
              <button value={props.offers} onClick={handleFavs}>Añadir a favs</button>
              <button
              
                onClick={handleBuy}
                className={styles.offersCardButtonsPrice}
              >
                {`${props.currency} ${props.price}`}
              </button>
            </div>
          </div>

          <div className={styles.offersCardDetail}>
            {clicked[0] ? (
              <>
                <h3>Detalles del Vuelo</h3>
                {props.transfers.length > 1 ? (
                  <h4>Escalas de Ida</h4>
                ) : (
                  <h4>Vuelo directo</h4>
                )}
              </>
            ) : (
              false
            )}
            {clicked[0]
              ? props.transfers.map((escala, index) => (
                  <div className={styles.offersCardTransfers} key={index}>
                    <div>
                      <p>
                        {" "}
                        <FaPlaneDeparture />{" "}
                        <span className={styles.sp}>{escala.origin}</span>{" "}
                      </p>
                      <p>
                        {" "}
                        <FaPlaneArrival />{" "}
                        <span className={styles.sp}>
                          {escala.destination}
                        </span>{" "}
                      </p>
                    </div>
                    <div>
                      <p>
                        {" "}
                        <BsCalendarDateFill /> <span> Salida: </span>{" "}
                        {escala.departure.slice(0, 10)}{" "}
                        {escala.departure.slice(11, 19)}{" "}
                      </p>
                      <p>
                        {" "}
                        <BsCalendarDate /> <span>Llegada:</span>{" "}
                        {escala.arrive.slice(0, 10)}{" "}
                        {escala.arrive.slice(11, 19)}{" "}
                      </p>
                    </div>
                    <div>
                      <p>
                        {" "}
                        <GiCommercialAirplane /> <span>Aerolinea:</span>{" "}
                        {escala.airline}
                      </p>
                      <p>
                        {" "}
                        <AiOutlineFieldNumber />
                        <span>Vuelo Nro:</span> {escala.flightNumber}
                      </p>
                    </div>
                  </div>
                ))
              : false}
          </div>
        </div>
      </section>
    </>
  );
}
