import React from "react";
import { FaRestroom, FaUtensils, FaBabyCarriage, FaVest } from "react-icons/fa";
import { BsDoorClosed } from "react-icons/bs";
import styles from "./seatsPage.module.scss";

export default function OtherBox({ type }) {
  switch (type) {
    case "bassinet":
      return (
        <div className={styles.other}>
          <FaBabyCarriage className={styles.otherIcon} />
          <p>{type}</p>
        </div>
      );
    case "empty":
      return null
    case "lavatory":
      return (
        <div className={styles.other}>
          <FaRestroom className={styles.otherIcon} />
          <p>{type}</p>
        </div>
      );
    case "exit_row":
      return (
        <div className={styles.other}>
          <BsDoorClosed className={styles.otherIcon}/>
          <p>{type}</p>
        </div>
      );
    case "galley":
      return (
        <div className={styles.other}>
          <FaUtensils className={styles.otherIcon}/>
          <p>{type}</p>
        </div>
      );
    case "closet":
      return (
        <div className={styles.other}>
          <FaVest className={styles.otherIcon} />
          <p>{type}</p>
        </div>
      );
    default:
      return <p>{type}</p>;
  }
}
