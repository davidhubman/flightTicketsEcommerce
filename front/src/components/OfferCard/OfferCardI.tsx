import styles from "./OfferCard.module.scss";
import { useDispatch } from "react-redux";
import { AiOutlineExclamationCircle,AiOutlineStar } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { IoMdAirplane,IoLogoUsd } from "react-icons/io";
import { sendFavs } from "../../redux/actions/";
import {Link, useHistory, useLocation} from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { useState, useEffect} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import swal from "sweetalert";


export default function OfferCardI(props: any): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [user] = useAuthState(auth);
  const dataFromQuery: any = {};
  const [fav, setFav] = useState([]);

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


  const formatedRecomendations = props.recomendations?.map((item: any) => {
    return {
      offers: item.id,
      currency: item.currency,
      price: item.price,
      transfers: item.transfers,
      mode: props.mode,
      originCity: item.origin.city,
      destinationCity: item.destiny.city,
      originAirport: item.origin.airport,
      destinationAirport: item.destiny.airport,
      ...dataFromQuery,
    };
  });

  const offerProps = {
    ...props,
    recomendations: formatedRecomendations,
  };

  const handleFavs = (e: any) => {
    if(auth.currentUser){
       if(fav.some((el:any)=>el.offers === e.target.value)){
        swal(errorMessage)
       }
        else{
    const info = {
      ...dataFromQuery,
      userId: auth.currentUser.uid,
      ...props
    }
    if (dispatch(sendFavs(info))) {
      // @ts-ignore
      swal({
        title: "Se ha agregado a favoritos",
        text: "El vuelo se ha agregado a tus favoritos",
        icon: "success",
      }).then(() => console.log("added"));
    }}
    }else{
      // @ts-ignore
      swal({
        title: "Debes iniciar sesión",
        text: "Para poder agregar a favoritos debes estar registrado",
        icon: "warning",
        dangerMode: true,
      }).then(() => history.push("/login"));
    }
  };

  /*Funcion para validar login al comprar*/
  const handleBuy = (e: any) => {
    if (auth.currentUser) {
    e.preventDefault();
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
    <section className={styles.offers} data-aos="fade-up">
      <div className={styles.offersCard}>
        <div className={styles.offersCardMainInfo}>
          {/* Puntos de partida y llegada */}
          <div className={styles.offersCardInfo} data-aos="fade-left">
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
          <div className={styles.offersCardType} data-aos="fade-up">
            {props.transfers.length === 1 ? (
              <p>
                {" "}
                <IoMdAirplane /> Vuelo directo{" "}
              </p>
            ) : (
              <p>
                {" "}
                <BsArrowLeftRight /> Tiene {props.transfers.length - 1} escalas
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className={styles.offersCardButtons} data-aos="fade-right">
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
  );
}
