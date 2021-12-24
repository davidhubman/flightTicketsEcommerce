import React from 'react'
import MercadoPagoForm from '../../components/MercadoPago/MercadoPagoForm'
import styles from './PayPage.module.scss'
import {useLocation} from "react-router-dom";


export default function PayPage (props: any): JSX.Element {

    const { state } = useLocation();

    return (
        <div className={styles.payPageContainer}>
            <MercadoPagoForm {...state}/>
        </div>
    )
}
