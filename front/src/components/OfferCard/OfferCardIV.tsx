import styles from "./OfferCard.module.scss";
import { useDispatch } from "react-redux";
import { AiOutlineExclamationCircle, AiOutlineStar } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { IoMdAirplane, IoLogoUsd } from "react-icons/io";
// import { getSeats, sendFavs } from "../../redux/actions/";
import { sendFavs } from "../../redux/actions/";
import { auth, db } from "../../firebaseConfig";
import { useLocation, Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useState, useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function OfferCardIV(props: any): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [user] = useAuthState(auth);
  const [fav, setFav] = useState([]);
  const dataFromQuery: any = {};
  type Swal = {
    title: string;
    text: string;
    icon: string;
    button: string;
  }

  const errorMessage:Swal = {
    title: "Error",
    text: "Ya has añadido ese favorito!",
    icon: "error",
    button: "Volver",
  }

  const getQueryData = (offerQuery: any) => {
    return offerQuery
      .split("&")
      .map((word: any) =>
        word
          .replace("=", ",")
          .replace("?", "")
          .split(",")
      )
      .forEach((el: any) => (dataFromQuery[el[0]] = el[1]));
  };
  getQueryData(location.search);

  const formatedRecomendations = props.recomendations?.map((item: any) => {
    return {
      offers: item.id,
      currency: item.currency,
      price: item.price,
      transfersD: item.departure.transfers,
      transfersR: item.return.transfers,
      mode: props.mode,
      originCity: props.originCity,
      destinationCity: props.destinationCity,
      originAirport: props.originAirport,
      destinationAirport: props.destinationAirport,
      ...dataFromQuery,
    };
  });

  const offerProps = {
    ...props,
    recomendations: formatedRecomendations,
  };

  const getUser = () => {
    db.collection("saves").onSnapshot((querySnapshot) => {
      
      const docs:any = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const filtrado = docs.filter((doc:any) => doc.userId === user?.uid);
      setFav(filtrado);
    });
  };
  useEffect(() => {
    getUser();  // eslint-disable-next-line 
  }, []);

  const handleFavs = (e: any) => {
      if(auth.currentUser){
        if(fav.some((el:any)=>el.offers === e.target.value)){
         swal(errorMessage)
        }else{
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
      }}
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

  const handleBuy = (e: any) => {
    e.preventDefault();
    if (auth.currentUser) {
      history.push({
        pathname: `/ticket/${props.offers}`,
        state: {
          ...offerProps,
          ...dataFromQuery
      }
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

  return (
    <>
      <section className={styles.offers}>
        <div className={styles.offersCard}>
          <div className={styles.offersCardMainInfo}>
            {/* Puntos de partida y llegada */}
            <div data-aos="fade-left" className={styles.offersCardInfo}>
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
            <div data-aos="fade-up" className={styles.offersCardType}>
              {props.transfersD.length === 1 ? (
                <p>
                  <IoMdAirplane /> Vuelo directo
                </p>
              ) : (
                <p>
                  <BsArrowLeftRight /> Tiene {props.transfersD.length - 1}{" "}
                  escalas
                </p>
              )}
            </div>

            {/* Buttons */}
            <div data-aos="fade-right" className={styles.offersCardButtons}>
              <Link
                to={{
                  pathname: `/offer-detail/${props.offers}`,
                  state: {
                    ...offerProps,
                    ...dataFromQuery,
                  },
                }}
                className={styles.offersCardButtonsDetail}
              >
                <AiOutlineExclamationCircle />
                Ver detalles
              </Link>
              <button value={props.offers} onClick={handleFavs}><AiOutlineStar/> Añadir a favs</button>
              <button
                className={styles.offersCardButtonsPrice}
                onClick={handleBuy}
              ><IoLogoUsd /> 
                {`${props.currency} ${props.price}`}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
