import { useEffect } from "react";
import SearchBar from "../../components/Searchbar/Searchbar";
import style from "./Home.module.scss";
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import Navbar from "../../components/Navbar/Navbar";
import Chat from "../../components/Chatbot/Chatbot";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Navbar />
      <div className={style.allHome}>
        <SearchBar />

        <PopularDestinations />

        <Chat />
      </div>
    </>
  );
}
