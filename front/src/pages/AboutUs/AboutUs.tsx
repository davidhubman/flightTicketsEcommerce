import React, { FC, useEffect } from "react";
import {
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./AboutUs.module.scss";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
export default function AboutUs() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className={style.page}>
      <Navbar />
      <div className={style.AboutUsTotal}>
        <div className={style.titleBox}>
          <img src={logo} alt="Dev-Sky" />
          <h2>Sobre Nosotros</h2>
        </div>
        <div className={style.AboutUs}>
          <Template
            name="Ezequiel Grigolatto"
            image={style.cardEze}
            linkedin="https://www.linkedin.com/in/ezequiel-grigolatto"
            github="https://www.github.com/Ezegrigolatto"
            instagram=""
            portafolio=""
          />
          <Template
            name="Gonzalo Martinez"
            image={style.cardGonza}
            linkedin="https://www.linkedin.com/in/gonzaqepasa"
            github="https://www.github.com/gonzaqepasa"
            instagram="https://www.instagram.com/gonzaqepasa"
            portafolio=""
          />
          <Template
            name="Esteban Luna"
            image={style.cardEsteban}
            linkedin="https://www.linkedin.com/in/estebanlun"
            github="https://github.com/Estebanlun"
            instagram="https://www.instagram.com/tebilc"
            portafolio=""
          />
          <Template
            name="Fernando Haring"
            image={style.cardFer}
            linkedin="https://www.linkedin.com/in/fernando-haring-dev"
            github="https://www.github.com/KannonH2"
            instagram=""
            portafolio="https://www.fer-dev.com"
          />
          <Template
            name="Bautista Manolizi"
            image={style.cardBautista}
            linkedin="https://www.linkedin.com/in/bautista-manolizi"
            github=" https://github.com/bauKSA"
            instagram=""
            portafolio=""
          />
          <Template
            name="Jose Angel Rey"
            image={style.cardAngel}
            linkedin="https://www.linkedin.com/in/jose-angel-rey"
            github="https://www.github.com/Jose-Angel-Rey"
            instagram=""
            portafolio=""
          />
          <Template
            name="David Jacome"
            image={style.cardDavid}
            linkedin="https://www.linkedin.com/in/davidalejandrojacome/"
            github="https://github.com/davidhubman"
            instagram=""
            portafolio=""
          />
        </div>
      </div>
    </main>
  );
}

const Template: FC<Props> = ({
  name,
  image,
  linkedin,
  github,
  instagram,
  portafolio,
}) => (
  <div className={image}>
    <div className={style.linkBox}>
      {portafolio ? (
        <a target="_blank" href={portafolio} rel="noreferrer" >
          {" "}
          <FontAwesomeIcon icon={faBriefcase} />
        </a>
      ) : false}
      {instagram ? (
        <a target="_blank" href={instagram} rel="noreferrer">
          {" "}
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      ) : false}
      <a target="_blank" href={linkedin} rel="noreferrer">
        {" "}
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a target="_blank" href={github} rel="noreferrer">
        {" "}
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>

    <div className={style.nameBox}>
      <h4>{name}</h4>
    </div>
  </div>
);

type Props = {
  name: string;
  image: string;
  linkedin: string;
  github: string;
  instagram: string;
  portafolio: string;
};
