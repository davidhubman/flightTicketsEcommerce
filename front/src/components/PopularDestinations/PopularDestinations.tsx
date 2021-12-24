import styles from "./PopularDestinations.module.scss";
import cities from "./cities";
import CityCard from "../CityCard/CityCard";
import { Link } from "react-router-dom";

export default function PopularDestinations(): JSX.Element {
  return (
    <section className={styles.popularDestinations}>
      <h2  data-aos-duration="1200" data-aos="fade-right">Destinos más populares</h2>

      <div className={styles.cityCardsContainer}>
        {cities.map((city): JSX.Element => {
          return (
            <Link key={city.id} to={`popular-destination/${city.id}`} data-aos="fade-up" data-aos-duration="1200">
              <CityCard name={city.name} image={city.image} />;
            </Link>
          );
        })}
      </div>
    </section>
  );
}
