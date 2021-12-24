import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./landingPage.module.css"
import logo from "../../assets/logo/dev-sky-black-logo.svg";

export default function LandingPage() {
    return (
        <div className={ styles.background}>
        <Link to='/'>
        <img src={logo} alt="logo" className={styles.buttonLanding} display="center"/>
        </Link>
    </div>
    )
}
