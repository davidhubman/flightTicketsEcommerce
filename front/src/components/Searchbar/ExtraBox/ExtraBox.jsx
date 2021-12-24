import { faCrown, faGlassMartini, faUser, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import style from "./ExtraBox.module.scss";

function ExtraBox({ value, setValue, handleChange }) {
  const changeIconClass = () => {
    switch (value.class) {
      case "economy":
        return <FontAwesomeIcon className={style.icon} icon={faUser} />;
      case "premium-economy":
        return <FontAwesomeIcon className={style.icon} icon={faGlassMartini} />;
      case "first":
        return <FontAwesomeIcon className={style.icon} icon={faCrown} />;
      case "business":
        return <FontAwesomeIcon className={style.icon} icon={faUserTie} />;

      default:
        <FontAwesomeIcon className={style.icon} icon={faUser} />;
    }
  };

  return (
    <div className={style.extraBoxx}>
      <div className={style.box}>
        <label> Clase </label>
        <div className={style.inputBox}>
          {changeIconClass()}
          <select name="class" onChange={handleChange}>
            <option value="economy">Economy</option>
            <option value="premium_economy"> Premium-economy</option>
            <option value="first"> First </option>
            <option value="business"> Business </option>
          </select>
        </div>
      </div>

      <div className={style.counterBox}>
        <div className={style.counterBoxx}>
          <label>Adultos</label>
          <Counter value={value} setValue={setValue} name={"Adultos"} />
        </div>

        <div className={style.counterBoxx}>
          <label>Menores</label>
          <Counter value={value} setValue={setValue} name={"Menores"} />
        </div>

        <div className={style.counterBoxx}>
          <label>Bebes</label>
          <Counter value={value} setValue={setValue} name={"Bebes"} />
        </div>
      </div>
    </div>
  );
}

function Counter({ value, setValue, name }) {
  function handleSum(e) {
    e.preventDefault();

    if (name === "Menores") {
      if (value.kid < 5) {
        setValue({
          ...value,
          kid: value.kid + 1,
        });
      }
    }

    if (name === "Bebes") {
      if (value.baby < value.adult) {
        setValue({
          ...value,
          baby: value.baby + 1,
        });
      }
    }

    if (name === "Adultos") {
      if (value.adult < 5) {
        setValue({
          ...value,
          adult: value.adult + 1,
        });
      }
    }
  }

  function handleRes(e) {
    e.preventDefault();

    /*    if (count > 0) {
     
               setValue({
                   ...value,
                   kid:value.kid-1
               })
     
           }
    */

    if (name === "Menores") {
      if (value.kid > 0) {
        setValue({
          ...value,
          kid: value.kid - 1,
        });
      }
    }

    if (name === "Bebes") {
      if (value.baby > 0) {
        setValue({
          ...value,
          baby: value.baby - 1,
        });
      }
    }

    if (name === "Adultos") {
      if (value.adult > 1) {
        if (value.baby >= value.adult) {
          setValue({
            ...value,
            baby: value.baby - 1,
            adult: value.adult - 1,
          });
        } else {
          setValue({
            ...value,
            adult: value.adult - 1,
          });
        }
      }
    }
  }

  return (
    <div className={style.counter}>
      <button onClick={(e) => handleRes(e)}>-</button>

      {name === "Menores" ? <h2>{value.kid}</h2> : false}

      {name === "Bebes" ? <h2>{value.baby}</h2> : false}

      {name === "Adultos" ? <h2>{value.adult}</h2> : false}

      <button onClick={(e) => handleSum(e)}>+</button>
    </div>
  );
}

export default ExtraBox;
