// import React, { useEffect, useState, FC } from "react";
import React, { useState, FC } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getFlight, setLoading } from "../../redux/actions";
import styles from "./Searchbar.module.scss";
import json from "../../assets/IATA.json";
// import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faPlane,
  faPlaneArrival,
  faPlaneDeparture,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import ExtraBox from "./ExtraBox/ExtraBox";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const loading: boolean = useSelector((state: any) => state.loading);
  const [error, setError] = useState(false);
  const [msjError, setMsjError] = useState({ title: "", p: "" });
  // const [extraBox, setExtraBox] = useState(false)
  const [filterOptional, setFilterOptional] = useState([]);
  const [filterOptionalBack, setFilterOptionalBack] = useState([]);

  const [autocompleteVal, setAutocompleteVal] = useState({
    originCity: false,
    destinyCity: false,
  });

  const [value, setValue] = useState({
    originCity: "",
    destinyCity: "",
    departureDate: "",
    returnDate: "",
    journeyType: false,
    class: "economy",
    baby: 0,
    kid: 0,
    adult: 1,
  });

  ///////// Logica autocompletado /////////
  function handleChangeOrigen(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      originCity: e.target.value,
    });
  }
  function handleChangeBack(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      destinyCity: e.target.value,
    });
  }

  function filterCompleted() {
    const cities: any = json.filter(
      (d) =>
        d.city.toLowerCase().includes(value.originCity.toLowerCase()) ||
        d.airport.toLowerCase().includes(value.originCity.toLowerCase())
    );
    const airports: any = cities.map((d: any) => d);
    setFilterOptional(airports.slice(0, 5));
  }
  function filterCompletedBack() {
    const citiesB: any = json.filter(
      (d) =>
        d.city.toLowerCase().includes(value.destinyCity.toLowerCase()) ||
        d.airport.toLowerCase().includes(value.destinyCity.toLowerCase())
    );
    const airportsB: any = citiesB.map((d: any) => d);
    setFilterOptionalBack(airportsB.slice(0, 5));
  }

  function combo(e: any) {
    handleChangeOrigen(e);
    if (value.originCity.length > 0) {
      filterCompleted();
    }
  }
  function comboBack(e: any) {
    handleChangeBack(e);
    if (value.destinyCity.length > 0) {
      filterCompletedBack();
    }
  }

  function handleSelectCountry(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      originCity: e.target.name,
    });
    // setFilterOptional([]);
  }
  function handleSelectCountryBack(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      destinyCity: e.target.name,
    });
    // setFilterOptionalBack([]);
  }

  ///////// Logica Selects ///////
  function handleChange(e: any) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  ///////// Click JourneyType (logica para que llegue booleano al value object) /////////
  function handleChangeJourney(e: any) {
    e.preventDefault();
    const val: string = e.target.value;

    if (val === "true") {
      setValue({
        ...value,
        journeyType: true,
      });
    } else if (val === "false") {
      setValue({
        ...value,
        journeyType: false,
      });
    }
  }

  ///////// Click enviar formulario /////////
  function handleClick(e: any) {
    e.preventDefault();

    const cities: any = json.filter((d) =>
      d.airport.toLowerCase().includes(value.originCity.toLowerCase())
    );
    const citiesBack: any = json.filter((d) =>
      d.airport.toLowerCase().includes(value.destinyCity.toLowerCase())
    );




    if (cities.length === 1 && citiesBack.length === 1) {
      // const origin: any = json.filter(data => data.airport === value.originCity)
      // const back: any = json.filter(data => data.airport === value.destinyCity)

      const toSend: any = {
        originCity: cities[0].iata,
        destinyCity: citiesBack[0].iata,
        departureDate: value.departureDate,
        returnDate: value.returnDate,
        journeyType: value.journeyType,
        class: value.class,
        baby: value.baby,
        kid: value.kid,
        adult: value.adult,
      };



      if (value.journeyType === false) {
        if (value.departureDate) {

          dispatch(setLoading(true));
          dispatch(getFlight(toSend));
          sendpack();
        } else {

          setMsjError({
            title: "Debes ingresar una fecha de origen",
            p: "Selecciona una fecha de ida",
          });
          setError(true);
        }
      } else if (value.journeyType === true) {
        if (value.returnDate) {

          dispatch(setLoading(true));
          dispatch(getFlight(toSend));
          sendpack();
        } else {
          setMsjError({
            title: "Debes ingresar una fecha de vuelta",
            p: "Selecciona una fecha de regreso",
          });
          setError(true);
        }
      }

    } else {
      setMsjError({
        title: "Ingrese un origen y destino valido",
        p: "Puedes usar el autocompletar para buscar lugares especificos",
      });
      setError(true);
    }

    function sendpack() {
      if (value.journeyType) {
        history.push(
          `/offers?origin=${cities[0].iata}&destination=${citiesBack[0].iata}&dDate=${value.departureDate}&rDate=${value.returnDate}&adults=${value.adult}&childs=${value.kid}&baby=${value.baby}&cabin=${value.class}`
        );
      } else {
        history.push(
          `/offers?origin=${cities[0].iata}&destination=${citiesBack[0].iata}&dDate=${value.departureDate}&adults=${value.adult}&childs=${value.kid}&baby=${value.baby}&cabin=${value.class}`
        );
      }
    }
  }
  ////////////////////////////////////////////

  ///////// Logica de condición minima de fecha de ida /////////

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  const dayCondition: Function = () => {
    if (dd < 10) return `${yyyy}-${mm}-${0}${dd}`;
    return `${yyyy}-${mm}-${dd}`;
  };



  ///////// Logica de habilitar viaje de vuelta /////////

  const isDisable: Function = () => {
    // return value.journeyType === false && value.departureDate.length !=0
    if (value.journeyType === true && value.departureDate.length !== 0) {
      return false;
    } else {
      return true;
    }
  };
  ////////////////////////////////////////////

  function setBlur(e: any) {
    setTimeout(() => {
      setAutocompleteVal({ ...autocompleteVal, [e.target.name]: false });
    }, 200);
  }

  return (
    <div className={styles.searchBarContainer} data-aos="fade-right"  data-aos-duration="1200">
      <Errorr
        error={error}
        setError={setError}
        msjErrorTitle={msjError.title}
        msjErrorP={msjError.p}
      />

      <div className={styles.titleBox}>
        <h3> Encuentra las mejores ofertas </h3>
      </div>
      <form>
        <div className={styles.allInputsBox}>
          <div className={styles.originDestiny}>
            <div className={styles.selects}>
              <label> Origen </label>
              <div className={styles.inputBox}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faPlaneDeparture}
                />
                <input
                  placeholder="Ciudad de origen"
                  name="originCity"
                  value={value.originCity}
                  type="text"
                  onChange={(e) => combo(e)}
                  autoComplete="off"
                  id="hola"
                  onFocus={() =>
                    setAutocompleteVal({ ...autocompleteVal, originCity: true })
                  }
                  onBlur={(e) => setBlur(e)}
                />
              </div>

              {autocompleteVal.originCity ? (
                <div className={styles.ulBox}>
                  <ul role="listbox">
                    {value.originCity.length > 0 &&
                    value.destinyCity.length < 20
                      ? filterOptional.map((d: any,index) => (
                          <li key={index} >
                            {" "}
                            <button
                              name={`${d.airport}`}
                              onClick={(e) => handleSelectCountry(e)}
                            >
                              {`${d.airport}, ${d.city}`}
                            </button>
                          </li>
                        ))
                      : false}
                  </ul>
                </div>
              ) : (
                false
              )}
            </div>

            <div className={styles.selects}>
              <label> Destino </label>
              <div className={styles.inputBox}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faPlaneArrival}
                />

                <input
                  placeholder="Ciudad de destino"
                  type="text"
                  name="destinyCity"
                  value={value.destinyCity}
                  onChange={(e) => comboBack(e)}
                  autoComplete="off"
                  onFocus={() =>
                    setAutocompleteVal({
                      ...autocompleteVal,
                      destinyCity: true,
                    })
                  }
                  onBlur={(e) => setBlur(e)}
                />
              </div>

              {autocompleteVal.destinyCity ? (
                <div className={styles.ulBox}>
                  <ul role="listbox">
                    {value.destinyCity.length > 0 &&
                    value.destinyCity.length < 20
                      ? filterOptionalBack.map((d: any,index) => (
                          <li key={index}>
                            {" "}
                            <button
                              name={`${d.airport}`}
                              onClick={(e) => handleSelectCountryBack(e)}
                            >
                              {`${d.airport}, ${d.city}`}
                            </button>
                          </li>
                        ))
                      : false}
                  </ul>
                </div>
              ) : (
                false
              )}
            </div>
          </div>

          <div className={styles.journeyBoxWithDate}>
            <div className={styles.selects}>
              <label> Vuelos </label>

              <div className={styles.inputBox}>
                <FontAwesomeIcon className={styles.icon} icon={faPlane} />

                <select
                  name="journeyType"
                  onChange={(e) => handleChangeJourney(e)}
                >
                  <option value="false"> Solo ida </option>
                  <option value="true"> Ida y vuelta </option>
                </select>
              </div>
            </div>

            <div className={styles.dataBox}>
              <div className={styles.selectsData}>
                <label> Ida </label>
                <input
                  className={styles.inputBox}
                  type="date"
                  min={dayCondition()}
                  placeholder=""
                  name="departureDate"
                  onChange={handleChange}
                />
              </div>

              <div className={styles.selectsData}>
                <label
                  className={
                    value.journeyType ? styles.label : styles.labelDisableD
                  }
                >
                  Vuelta
                </label>
                <input
                  disabled={isDisable()}
                  className={
                    value.journeyType
                      ? styles.inputBox
                      : styles.inputBoxDisabled
                  }
                  type="date"
                  min={value.departureDate}
                  onChange={handleChange}
                  name="returnDate"
                />
              </div>
            </div>
          </div>
        </div>
        <ExtraBox
          handleChange={handleChange}
          setValue={setValue}
          value={value}
        />
      </form>
      <div className={styles.botonBox}>
        <button className={styles.boton} onClick={handleClick}>
          Buscar
          <FontAwesomeIcon className={styles.iconSearch} icon={faSearch} />
        </button>
      </div>
    </div>
  );
}

const Errorr: FC<Props> = ({ error, setError, msjErrorTitle, msjErrorP }) => {
  return (
    <div className={error ? styles.ErrorBox : styles.disabled}>
      <div className={styles.errorr}>
        <FontAwesomeIcon
          className={styles.exclamation}
          icon={faExclamationTriangle}
        />
        <div className={styles.textBox}>
          <h2>{msjErrorTitle}</h2>
          <p>{msjErrorP}</p>
        </div>
        <button onClick={() => setError(false)}>Aceptar</button>
      </div>
    </div>
  );
};
type Props = {
  error: any;
  setError: any;
  msjErrorTitle: any;
  msjErrorP: any;
};
