import styles from "./OfferDetailInfo.module.scss";
import OneWayInfo from "./OneWayInfo";
import RoundtripInfo from "./RoundtripInfo";

export default function OfferDetailInfo(props) {
  return (
    <section className={styles.offerSection}>
      <h2 className={styles.offerSectionTitle}>Detalles del Vuelo</h2>

      {props.mode === "oneway" ? (
        <OneWayInfo {...props} />
      ) : (
        <RoundtripInfo {...props} />
      )}
    </section>
  );
}
