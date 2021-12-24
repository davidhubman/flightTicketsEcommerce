import styles from "./Ticketinfo.module.scss";
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
import {
  AiOutlineExclamationCircle,
  AiOutlineFieldNumber,
} from "react-icons/ai";
import { useState } from "react";
import { GiCommercialAirplane } from "react-icons/gi";

export default function OneWayInfo(props) {
  const [clicked, setClicked] = useState([false, "Ver más detalles"]);

  const handleClick = (e) => {
    if (!clicked[0]) {
      return setClicked([true, "Ocultar detalles"]);
    } else {
      return setClicked([false, "Ver más detalles"]);
    }
  };

  return (
    <>
      {/* Main info */}
      <section className={styles.ticketMainInfo}>
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
          <p className={styles.ticketMainInfoAirports}>
            <IoIosAirplane /> <span>Aeropuerto origen: </span>{" "}
            {props.originAirport}
          </p>
          <p className={styles.ticketMainInfoAirports}>
            <IoIosAirplane />
            <span>Aeropuerto destino: </span>
            {props.destinationAirport}
          </p>
        </div>
      </section>

      {/* Button */}
      <button
        className={styles.ticketBtn}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <AiOutlineExclamationCircle />
        {clicked[1]}
      </button>

      {/* Detail info */}
      <section className={styles.ticketDetail}>
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
              <div className={styles.ticketTransfers} key={index}>
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
                    {escala.departure.slice(0, 10)}{" "}
                    {escala.departure.slice(11, 19)}{" "}
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
            ))
          : false}
      </section>
    </>
  );
}
