import styles from './LoadingScreen.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo/dev-sky-white-logo.svg';

export default function LoadingScreen() {
    return (
        <section className={styles.LoadingScreen} >
            <div className={styles.LoadingScreenContent} >
                <img src={logo} alt="Dev-Sky Logo" />
                <FontAwesomeIcon icon={faCircleNotch} size="2x" className={styles.LoadingScreenLoader} />
            </div>
        </section>
    )
}
