import styles from "./OfferDetailInfo.module.scss";
import {
  FaBabyCarriage,
  FaChild,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaSuitcase,
  FaUserAlt,
} from "react-icons/fa";
import {
  BsArrowLeftRight,
  BsCalendarDate,
  BsCalendarDateFill,
} from "react-icons/bs";
import { IoIosAirplane, IoLogoUsd, IoMdAirplane } from "react-icons/io";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { GiCommercialAirplane } from "react-icons/gi";

export default function OneWayInfo(props) {
  return (
    <>

      {/* Main info */}
      <section className={styles.offerMainInfo}>
        {/* Origen - Destino*/}
        <div>
          <p>
            <FaPlaneDeparture /> <span>Origen: </span>
            {props.originCity ? props.originCity : props.originAirport}
          </p>
          <p>
            <FaPlaneArrival /> <span>Destino: </span>
            {props.destinationCity
              ? props.destinationCity
              : props.destinationAirport}
          </p>
          <p>
            <IoIosAirplane /> <span>Trayecto:</span>
            {props.mode === "oneway" ? " Solo ida" : " Ida y vuelta"}
          </p>
        </div>

        {/* Precio - Clase */}
        <div>
          <p>
            {props.transfers.length === 1 ? (
              <>
                <IoMdAirplane /> Vuelo directo
              </>
            ) : (
              <>
                <BsArrowLeftRight /> Tiene {props.transfers.length - 1} escalas
              </>
            )}
          </p>
          <p>
            <FaSuitcase />
            <span>Clase: </span>
            {props.cabin}
          </p>
          <p>
            <IoLogoUsd />
            <span>Precio: </span> {props.currency} {props.price}
          </p>
        </div>

        {/* Pasajeros */}
        <div>
          <p>
            <FaUserAlt /> <span>Adultos:</span> {props.adults}
          </p>
          <p>
            <FaChild /> <span>Niños:</span> {props.childs}
          </p>
          <p>
            <FaBabyCarriage /> <span>Infantes:</span> {props.baby}
          </p>
        </div>

        {/* Aeropuertos */}
        <div>
          <p className={styles.offerMainInfoAirports}>
            <IoIosAirplane /> <span>Aeropuerto origen: </span>{" "}
            {props.originAirport}
          </p>
          <p className={styles.offerMainInfoAirports}>
            <IoIosAirplane />
            <span>Aeropuerto destino: </span>
            {props.destinationAirport}
          </p>
        </div>
      </section>

      {/* Detail info */}
      <section className={styles.offerDetail}>
        {props.transfers.length > 1 ? (
          <h4>Escalas de Ida</h4>
        ) : (
          <h4>Vuelo directo</h4>
        )}

        {props.transfers.map((escala, index) => (
          <div key={index} className={styles.offerTransfers}>
            <div>
              <p>
                {" "}
                <FaPlaneDeparture />{" "}
                <span className={styles.sp}>{escala.origin}</span>{" "}
              </p>
              <p>
                {" "}
                <FaPlaneArrival />{" "}
                <span className={styles.sp}>{escala.destination}</span>{" "}
              </p>
            </div>
            <div>
              <p>
                {" "}
                <BsCalendarDateFill /> <span> Salida: </span>{" "}
                {escala.departure.slice(0, 10)} {escala.departure.slice(11, 19)}{" "}
              </p>
              <p>
                {" "}
                <BsCalendarDate /> <span>Llegada:</span>{" "}
                {escala.arrive.slice(0, 10)} {escala.arrive.slice(11, 19)}{" "}
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
        ))}
      </section>
    </>
  );
}
