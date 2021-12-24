import bali0 from "../../assets/cities/bali/bali-0.webp";
import bali1 from "../../assets/cities/bali/bali-1.webp";
import bali2 from "../../assets/cities/bali/bali-2.webp";
import bali3 from "../../assets/cities/bali/bali-3.webp";

import london0 from "../../assets/cities/london/london-0.webp";
import london1 from "../../assets/cities/london/london-1.webp";
import london2 from "../../assets/cities/london/london-2.webp";
import london3 from "../../assets/cities/london/london-3.webp";

import mexico0 from "../../assets/cities/mexico/mexico-0.webp";
import mexico1 from "../../assets/cities/mexico/mexico-1.webp";
import mexico2 from "../../assets/cities/mexico/mexico-2.webp";
import mexico3 from "../../assets/cities/mexico/mexico-3.webp";

import newYork0 from "../../assets/cities/newYork/newYork-0.webp";
import newYork1 from "../../assets/cities/newYork/newYork-1.webp";
import newYork2 from "../../assets/cities/newYork/newYork-2.webp";
import newYork3 from "../../assets/cities/newYork/newYork-3.webp";

import paris0 from "../../assets/cities/paris/paris-0.webp";
import paris1 from "../../assets/cities/paris/paris-1.webp";
import paris2 from "../../assets/cities/paris/paris-2.webp";
import paris3 from "../../assets/cities/paris/paris-3.webp";

import toronto0 from "../../assets/cities/toronto/toronto-0.webp";
import toronto1 from "../../assets/cities/toronto/toronto-1.webp";
import toronto2 from "../../assets/cities/toronto/toronto-2.webp";
import toronto3 from "../../assets/cities/toronto/toronto-3.webp";

import {City} from "../CityCard/types";

const cities = (): Array<City> => {
  return [
    {
      name: "Bali",
      image: bali0,
      id: "bali",
      description:
        "Bali es el nombre de una isla y de una provincia de Indonesia.Es un popular destino turístico y es conocida tanto por sus hermosos paisajes como por sus delicadas artes que incluyen danza, escultura, pintura, orfebrería, peletería y un particular estilo musical, del que destaca el gamelán, una orquesta indonesia que interpreta música cortesana y acompaña las representaciones teatrales y los desfiles públicos, variando el número de instrumentos según los usos.",
      placesOfInterest: [
        "Pura Besakih, el templo madre de Bali y el más importante de toda la isla, que se encuentra en la ladera del Monte Agung.",
        "Bali es uno de los paraisos mundiales del surf, tanto si eres surfista profesional como si nunca has subido a una tabla te recomendamos visitar las playas de la peninsula de Bukit.",
        "Si te gustan los trekkings no te pierdas uno de los más bonitos de Indonesia: sube al Monte Batur, el volcán más activo de Bali, para disfrutar de un amanecer inolvidable.",
      ],
      images: [bali1, bali2, bali3],
    },
    {
      name: "London",
      image: london0,
      id: "london",
      description:
        "Londres es uno de los grandes destinos turísticos del mundo. Cuando llegas, te das cuenta rápidamente del porqué. Londres es una ciudad diversa, colorista, cosmopolita, deslumbrante. Una ciudad que cuenta con una historia de más de dos mil años, pero en la que se funde lo moderno y futurista con una gran profusión de artes y espectáculos.",
      placesOfInterest: [
        "La capital del Reino Unido está llena de arte. Allí se encuentran las mejores galerías y museos del mundo. Muchos de ellos, gratuitos. El Museo Británico, la Tate Modern y el Museo de Historia Natural son solo algunos de ellos.",
        "Puedes admirar la arquitectura del castillo Windsor, ubicado al oeste de la ciudad o visitar el Buckingham Palace, la residencia habitual de la Realeza. El ingreso al palacio está habilitado de julio a septiembre. Visita algunos de los castillos mas famosos del mundo!",
        "Camina por los parques de la realeza, entre ellos, Hyde Park y Richmond Park. Si buscas actividades en la noche, la ciudad está llena de teatros fantásticos como el Royal Opera House donde puedes disfrutar de la ópera y otras obras.",
      ],
      images: [london1, london2, london3],
    },
    {
      name: "México",
      image: mexico0,
      id: "mexico",
      description:
        "¿Por qué los turistas viajan a México? México es un destino turístico que cuenta con una gran diversidad de recursos naturales, enorme riqueza cultural e histórica, reconocida gastronomía a nivel mundial, privilegiada ubicación geográfica y clima excepcional, situación que lo posición como un destino atractivo.",
      placesOfInterest: [
        "Este país es uno de los pocos destinos donde puedes encontrar ruinas prehispánicas, construcciones coloniales, edificios estilo francés y las últimas tendencias arquitectónicas en un solo lugar.",
        "Sin duda, las playas de México son uno de los atractivos favoritos entre todos los que visitan el país. La tradicional Acapulco en Guerrero, o las nuevas favoritas como Cabo San Lucas, Baja California, La Paz, Puerto Vallarta o Cancún te esperan para pasar unos días refrescándote en sus aguas bajo el cálido rayo del sol.",
        "Hablar de México y no nombrar sus comidas y diversa gastronomia sería un delito, desde lujosos Restaurants hasta puestos de comidas ambulantes: Debes probar sus diversas comidas y bebidas con su característico toque 'picante'",
      ],
      images: [mexico1, mexico2, mexico3],
    },
    {
      name: "New York",
      image: newYork0,
      id: "new-york",
      description:
        "Conocida como la capital del mundo, Nueva York es la sexta ciudad más visitada del planeta, centro de incontables atractivos por visitar y un lugar que si eres apasionado de los viajes, tiene que estar en tu lista.",
      placesOfInterest: [
        "Asi como la torre Eiffel es a Paris, aquí en Nueva York encuentra en la estatua de la libertad a su icono y figura. Famosa por sus incontables apariciones en series, peliculas y fotografias ese lugar debe estar marcado en rojo en tu lista de lugares por visitar aquí.",
        "Otro de los íconos de Nueva York, cuya construcción con estructura de acero demoró 13 años. Por 2 décadas se le consideró el puente colgante más largo del mundo y se construyó para conectar Manhattan con Brooklyn, separadas por las aguas del East River.",
        "Uno de los parques urbanos más grandes del mundo y el pulmón vegetal de la ciudad es Central Park, Podrás dar un paseo por The Lake, Strawberry Fields, Belvedere Castle, Alice in Wonderland y The Mall, esta última una explanada peatonal que son de las partes del parque que más ha salido en películas.",
      ],
      images: [newYork2, newYork3, newYork1],
    },
    {
      name: "Paris",
      image: paris0,
      id: "paris",
      description:
        "París es la capital de Francia y una de las ciudades más visitadas de Europa -y del mundo-, tiene más de una razón para ser recorrida. Quizás se deba a que ofrece la maravillosa Torre Eiffel, a su interminable red de metro, o sus paseos por el Río Sena, por su idioma o por la gran cantidad de historia en cada paso y rincón. O tal vez porque París es un lugar al que no podemos dejar de ir al menos una vez en la vida.",
      placesOfInterest: [
        "Si quieres visitar un rincón verde que te permita conocer el estilo de los jardines florentinos del siglo XVII, tienes que visitar los Jardines de Luxemburgo.",
        "Si quieres conocer la historia de París, puedes visitar el Museo de la Guerra de la Independencia o el Museo de la Segunda Guerra Mundial",
        "Paris es conocida mundialmente por su arte, sin lugar a dudas, si te gusta el arte puedes recorrer sus numerosos museos tales como el Louvre, El centro de Georges Pompidou, el museo Orsay o el Musée de L'orangerie",
      ],
      images: [paris1, paris2, paris3],
    },
    {
      name: "Toronto",
      image: toronto0,
      id: "toronto",
      description:
        "Toronto es más una ciudad para vivirla y disfrutarla que para ir con nuestra lista de cosas que ver en la ciudad para ir tachando cosas. Como buena ciudad multicultural, uno de los mayores encantos de Toronto es poder pasear por los barrios de las diferentes comunidades étnicas de la ciudad, poder pasar de un ambiente chino a uno polaco, italiano, coreano o portugués en apenas algunos kilómetros.",
      placesOfInterest: [
        "Bajo la Torre CN encontramos el Acuario de Ripley, hogar de mas de 16.000 especies hermosas y exóticas y poseedor de un tunel submarino desde el cual podras ver langostas gigantes, tiburones, medusas, mantarrayas y cientos de peces",
        "La famosa Galería de Arte de Ontario (mejor conocida como AGO, por sus siglas en inglés) es una de las galerías más grandes de Norteamérica. En AGO hay colecciones que reúnen más de 80.000 obras de arte que datan desde el primer siglo hasta la actualidad.",
        "El Toronto Eaton Centre, es un centro comercial ubicado en el corazón de la ciudad. Es una de las atracciones turísticas más famosas de Toronto y es el centro comercial con más afluencia en Norteamérica.",
      ],
      images: [toronto1, toronto2, toronto3],
    },
  ];
};

export default cities();
