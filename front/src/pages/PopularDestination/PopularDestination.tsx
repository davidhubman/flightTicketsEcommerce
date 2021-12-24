import { useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import cities from "../../components/PopularDestinations/cities";
import styles from "./PopularDestination.module.scss";

export default function PopularDestination() {
  const { id }: any = useParams();
  const city = cities.find((city) => city.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
      <Navbar />
      <section className={styles.sectionContainer} data-aos="fade-right"  data-aos-duration="1200">
        {city ? (
          <>
            <header className={styles.sectionHeader}>
              <div className={styles.sectionHeaderBackground}>
                <img src={city.image} alt={city.name} />
              </div>
              <h2 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">Viaja hacia {city?.name} con los mejores precios</h2>
            </header>

            <p className={styles.sectionDescription} data-aos="fade-up" data-aos-duration="1200">{city?.description}</p>

            <section className={styles.sectionGallery}>
              <img src={city.images[0]} alt="" data-aos="fade-right" data-aos-duration="1200" />
              <img src={city.images[1]} alt="" data-aos="fade-up" data-aos-duration="1200" />
              <img src={city.images[2]} alt="" data-aos="fade-left" data-aos-duration="1200" />
            </section>

            <section className={styles.sectionPlaces} data-aos="fade-up" data-aos-duration="1200">
              <h3>Sitios de interés</h3>
              <ul>
                {city.placesOfInterest.map((place): JSX.Element => {
                  return <li key={place}>{place}</li>;
                })}
              </ul>
            </section>
          </>
        ) : (
          <h1>No se encontro la ciudad</h1>
        )}
      </section>
    </>
  );
}
