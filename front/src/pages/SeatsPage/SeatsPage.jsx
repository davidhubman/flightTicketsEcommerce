import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./seatsPage.module.scss";
import OtherBox from "./OtherBox";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import seatsDefault from "./seatsDefault";
import { getSeats, resetSeatsState } from "../../redux/actions";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Asientos from "../../assets/asientos.jpg"
import Navbar from "../../components/Navbar/Navbar";

export default function SeatsPage() {
    const [input, setInput] = useState([])
    const [inputSegundo, setInputSegundo] = useState([])
    const [inputTres, setInputTres] = useState([])
    const [inputCuatro, setInputCuatro] = useState([])

    const { state } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const offerId = state.offer.offers

    useEffect(() => {
        dispatch(getSeats(offerId));
    }, []);

    // desde STATE useLocation
    const pax = state.passengers
    //desde redux/api
    const seats = useSelector((state) => state.allSeats);
    const firstOprtionSeats  = seats.seatsByFlight

    useEffect(() => {
        return () => {
            dispatch(resetSeatsState());
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const { economySeatsDefault, firstSeatsDefault , otherDefault } = seatsDefault
    const { seatsByFlight } = otherDefault

    const finalSeats = firstOprtionSeats ? firstOprtionSeats : seatsByFlight

    const handleCheckIda = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(input.includes(valor)) {
            let nuevoArray = input.filter(x => x !== valor)
            setInput(nuevoArray)
        }

        if(checked && input.length < pax.length){
            setInput([...input, e.target.value])
        }
    }

    const handleCheckSegundo = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(inputSegundo.includes(valor)) {
            let nuevoArray = inputSegundo.filter(x => x !== valor)
            setInputSegundo(nuevoArray)
        }

        if(checked && inputSegundo.length < pax.length){
            setInputSegundo([...inputSegundo, e.target.value])
        }
    }

    const handleCheckTercero = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(inputTres.includes(valor)) {
            let nuevoArray = inputTres.filter(x => x !== valor)
            setInputTres(nuevoArray)
        }

        if(checked && inputTres.length < pax.length){
            //setCheckState(true)
            setInputTres([...inputTres, e.target.value])
        }
    }

    const handleCheckCuarto = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(inputCuatro.includes(valor)) {
            let nuevoArray = inputCuatro.filter(x => x !== valor)
            setInputCuatro(nuevoArray)
        }

        if(checked && inputCuatro.length < pax.length){

            setInputCuatro([...inputCuatro, e.target.value])
        }
    }


    const actualSeats = [ ...input, ...inputSegundo, ...inputTres, ...inputCuatro ]

    const allSeats = { primero: {...input}, segundo: {...inputSegundo},tercero: {...inputTres} ,cuarto: {...inputCuatro}}

    const handleSubmit = () => {
        if(actualSeats.length < allSeatsLimit ) return alert("faltan asientos por elegir")
        if(actualSeats.length > allSeatsLimit) return alert("ya seleccionaste todos los asientos")
        else if (actualSeats.length === allSeatsLimit) return history.push({
            pathname : "/pay",
            state: {...state, allSeats}
        });
    };

    const handleDisabledOne = (e) => {
        let checked = document.getElementById(e)
        if(pax.length === input.length) {
            if ( checked.checked) {
                return false }
            return true
        }
    }

    const handleDisabledTwo = (e) => {
        let checked = document.getElementById(e)
        if(pax.length === inputSegundo.length) {
            if ( checked.checked) {
                return false }
            return true
        }
    }

    const handleDisabledTree = (e) => {
        let checked = document.getElementById(e)
        if(pax.length === inputTres.length) {
            if ( checked.checked) {
                return false }
            return true
        }
    }

    const handleDisabledFourt = (e) => {
        let checked = document.getElementById(e)
        if(pax.length === inputCuatro.length) {
            if ( checked.checked) {
                return false }
            return true
        }
    }

      const handleSend = (e) => {
          e.preventDefault()
          history.push({
            pathname : "/pay",
            state: {...state}
          })
        }

    const allSeatsLimit = pax.length * finalSeats.length;

    const firstFlight = finalSeats[0]
    const secondFlight = finalSeats[1]
    const tirdFlight = finalSeats[2]
    const fourtFlight = finalSeats[3]

    function render() {
        if (typeof (seats) === "object") {
            const oneFlight = (
                <div>
                    <div className={styles.rotulo}>
                        <img src={logo} alt="logo" className={styles.logo} display="center"/>
                        <div>
                            Elije <b>{pax.length} asientos</b>
                        </div>
                        <div>Asientos selecionados: <b>{` ${input}`}</b></div>
                    </div>
                    {firstFlight.seatsInfo[0].map((e) => (
                        <div className={styles.fila}>
                            {e.map((columna) => (
                                <div className={styles.columna}>
                                    {columna.map((x) =>
                                        x.numberAndLetter ? (
                                            <div className={styles.columnaAInput}>
                                                {x.available.length === 0 ? (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="libre"
                                                            title="ckeckida"
                                                            placeholder={x.numberAndLetter}
                                                            id={`${x.numberAndLetter}${firstFlight.id}`}
                                                            value={x.numberAndLetter}
                                                            disabled={handleDisabledOne(
                                                                `${x.numberAndLetter}${firstFlight.id}`
                                                            )}
                                                            onChange={(e) => handleCheckIda(e)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="ocupado"
                                                            value="ocupado"
                                                            placeholder={x.numberAndLetter}
                                                            disabled
                                                        ></input>
                                                    </div>
                                                )}{" "}
                                                {/* <div className={styles.numbLett}>{x.numberAndLetter}</div> */}
                                            </div>
                                        ) : (
                                            <OtherBox classname={styles.otherBox} type={x.type}/>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );

            const dobleFlight = secondFlight ? (
                <div>
                    <div className={styles.rotulo}>
                        <img src={logo} alt="logo" className={styles.logo} display="center"/>
                        <div>
                            Elije <b>{pax.length} asientos</b>
                        </div>
                        <div>Asientos selecionados: <b>{` ${inputSegundo}`}</b></div>
                    </div>
                    {secondFlight.seatsInfo[0].map((e) => (
                        <div className={styles.fila}>
                            {e.map((columna) => (
                                <div className={styles.columna}>
                                    {columna.map((x) =>
                                        x.numberAndLetter ? (
                                            <div className={styles.columnaAInput}>
                                                {x.available.length === 0 ? (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="libre"
                                                            title="ckeckida"
                                                            id={`${x.numberAndLetter}${secondFlight.id}`}
                                                            value={x.numberAndLetter}
                                                            disabled={handleDisabledTwo(
                                                                `${x.numberAndLetter}${secondFlight.id}`
                                                            )}
                                                            onChange={(e) => handleCheckSegundo(e)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="ocupado"
                                                            value="ocupado"
                                                            disabled
                                                        ></input>
                                                    </div>
                                                )}{" "}
                                                {/* <div className={styles.numbLett}>{x.numberAndLetter}</div> */}
                                            </div>
                                        ) : (
                                            <OtherBox type={x.type}/>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : null;

            const tripleFlight = tirdFlight ? (
                <div>
                    <div className={styles.rotulo}>
                        <img src={logo} alt="logo" className={styles.logo} display="center"/>
                        <div>
                            Elije <b>{pax.length} asientos</b>
                        </div>
                        <div>Asientos selecionados: <b>{` ${inputTres}`}</b></div>
                    </div>
                    {tirdFlight.seatsInfo[0].map((e) => (
                        <div className={styles.fila}>
                            {e.map((columna) => (
                                <div className={styles.columna}>
                                    {columna.map((x) =>
                                        x.numberAndLetter ? (
                                            <div className={styles.columnaAInput}>
                                                {x.available.length === 0 ? (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="libre"
                                                            title="ckeckida"
                                                            id={`${x.numberAndLetter}${tirdFlight.id}`}
                                                            value={x.numberAndLetter}
                                                            disabled={handleDisabledTree(
                                                                `${x.numberAndLetter}${tirdFlight.id}`
                                                            )}
                                                            onChange={(e) => handleCheckTercero(e)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="ocupado"
                                                            value="ocupado"
                                                            disabled
                                                        ></input>
                                                    </div>
                                                )}{" "}
                                                {/* <div className={styles.numbLett}>{x.numberAndLetter}</div> */}
                                            </div>
                                        ) : (
                                            <OtherBox type={x.type}/>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : null;

            const lastFlight = fourtFlight ? (
                <div>
                    <div className={styles.rotulo}>
                        <img src={logo} alt="logo" className={styles.logo} display="center"/>
                        <div>
                            Elije <b>{pax.length} asientos</b>
                        </div>
                        <div>Asientos selecionados: <b>{` ${inputCuatro}`}</b></div>
                    </div>
                    {fourtFlight.seatsInfo[0].map((e) => (
                        <div className={styles.fila}>
                            {e.map((columna) => (
                                <div className={styles.columna}>
                                    {columna.map((x) =>
                                        x.numberAndLetter ? (
                                            <div className={styles.inputs}>
                                                {x.available.length === 0 ? (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="libre"
                                                            title="ckeckida"
                                                            id={`${x.numberAndLetter}${fourtFlight.id}`}
                                                            value={x.numberAndLetter}
                                                            disabled={handleDisabledFourt(
                                                                `${x.numberAndLetter}${fourtFlight.id}`
                                                            )}
                                                            onChange={(e) => handleCheckCuarto(e)}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className={styles.inputs}>
                                                        <input
                                                            type="checkbox"
                                                            name="ocupado"
                                                            value="ocupado"
                                                            disabled
                                                        ></input>
                                                    </div>
                                                )}{" "}
                                                {/* <div className={styles.numbLett}>{x.numberAndLetter}</div> */}
                                            </div>
                                        ) : (
                                            <OtherBox type={x.type}/>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : null;

            return (
                <div className={styles.allSeats}>
                    <GoHomeButton/>
                    <div className={styles.container}>
                        <div>{oneFlight}</div>
                        <div>{dobleFlight ? dobleFlight : null}</div>
                        <div>{tripleFlight ? tripleFlight : null}</div>
                        <div>{lastFlight ? lastFlight : null}</div>
                        <div className={styles.buttondiv}>

                            <button
                                className={styles.buttonSubmit}
                                type="submit"
                                onClick={() => handleSubmit()}
                            >
                                Confirmar asientos
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else if (typeof seats === "string") {
            return (
                <div className={styles.errorContainer}>
                    <Navbar/>
                    <button className={styles.buttonConfirm} onClick={handleSend}>Continuar con el pago</button>
                </div>
            )
        }
    }

const loading = () => {
    return <LoadingScreen />;
}
return <div>{ seats.seatsByFlight?.length>0 || seats === "No hay asientos disponibles"? render(): loading() }</div>
}