import React, {useEffect, useState} from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styles from "./MercadoPagoForm.module.scss";
import { IoIosContact } from "react-icons/io";
import { MdOutlinePassword, MdPayments } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
import { HiOutlineIdentification, HiOutlineDocumentText } from "react-icons/hi";
import {BsCalendar3, BsCalendarDate, BsCreditCard} from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../../firebaseConfig";
import {useHistory} from "react-router-dom";
import useScript from "../../hooks/useScript";
import {formConfig} from "./formConfig";
import swal from "sweetalert";

const INITIAL_STATE = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
};

const VITE_PUBLIC_KEY_MP = "TEST-0f046780-e30e-443a-b0c8-cc6d4fd9be99";

export default function MercadoPagoForm(props) {

  const [state, setState] = useState(INITIAL_STATE);

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };

  // En props esta toda la información necesaria
  // puedes acceder a las props del vuelo mediante props.offer
  // puedes acceder a las props de los pasajeros mediante props.passengers

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };

  const [user] = useAuthState(auth);
  /* eslint-disable */
  const [usuario, setUsuario] = useState([]);
  /* eslint-enable */
  const [resultPayment, setResultPayment] = useState(undefined);
  const history = useHistory();

  const { MercadoPago } = useScript(
      "https://sdk.mercadopago.com/js/v2",
      "MercadoPago"
  );

  const savedTicket = async (resultPayment) => {
    try {
      await db.collection("saved_tickets").add({
        ...resultPayment,
        date: new Date(),
        user: user.email,
        userId: user.uid,
        ...props.offer,
        ...props.allSeats,
      }).then(() => {
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getUser = () => {
    db.collection("users").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const filtrado = docs.filter((doc) => doc.uid === user.uid);
      setUsuario(filtrado);
    });
  };

  useEffect(() => {
    if (MercadoPago) {
      const mp = new MercadoPago(VITE_PUBLIC_KEY_MP);
      const cardForm = mp.cardForm({
        amount:props.offer? props.offer.price : props.price,
        autoMount: true,
        form: formConfig,
        callbacks: {
          onFormMounted: (error) => {
            if (error)
              return console.warn(
                  "Form Mounted handling error: ",
                  error
              );
          },

          onSubmit: (event) => {
            event.preventDefault();

            const {
              paymentMethodId: payment_method_id,
              issuerId: issuer_id,
              cardholderEmail: email,
              transaction_amount: amount,
              token,
              installments,
              identificationNumber: identification_number,
              identificationType: identification_type,
            } = cardForm.getCardFormData();

            fetch(`https://devskyproject.herokuapp.com/process-payment`,
                {
                  // entry point backend
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Request-Method":
                        "GET, POST, DELETE, PUT, OPTIONS",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    transaction_amount: 1,
                    description: props.offer.originCity + " - " + props.offer.destinationCity,
                    payment_method_id,
                    issuer_id,
                    email,
                    amount,
                    token,
                    installments: Number(installments),
                    identification_number,
                    identification_type,
                    payer: {
                      email,
                      identification: {
                        type: identification_type,
                        number: identification_number,
                      },
                    },
                  })
                }
            )
                .then((res) => res.json())
                .then(async (data) => {
                      getUser()
                      setResultPayment(data);
                      await savedTicket(data);
                      await swal({
                        title: "¡Pago realizado!",
                        text: "¡Gracias por comprar con nosotros!",
                        icon: "success",
                        button: "Aceptar",
                      });
                    }
                ).then(() =>
                history.push("/")
            )
                .catch((err) => {
                  console.log(err);
                });
          },
          onFetching: (resource) => {
            // Animate progress bar
            const progressBar =
                document.querySelector(".progress-bar");
            progressBar.removeAttribute("value");

            return () => {
              progressBar.setAttribute("value", "0");
            };
          },
        },
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MercadoPago]);


  return (
      <div className={styles.payPageContainer}>
        <div className={styles.paymentContainer}>
          <div className={styles.paymentCard}>
            {/* Boton de volver al home */}
            <h1>Proceso de Pago</h1>
            <Card
                cvc={state.cvc}
                expiry={state.cardExpirationMonth + state.cardExpirationYear}
                name={state.cardholderName}
                number={state.cardNumber}
                focused={state.focus}
                brand={state.issuer}
            />
          </div>

          <form id="form-checkout" className={styles.paymentForm}>
            <div className={styles.paymentFormDiv}>
              <BsCreditCard className={styles.paymentFormDivIcon} />
              <input
                  className={styles.paymentFormInput}
                  maxLength={16}
                  type="tel"
                  name="cardNumber"
                  id="form-checkout__cardNumber"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
              />
            </div>

            {/*  Nombre del titular */}
            <div className={styles.paymentFormDiv}>
              <IoIosContact className={styles.paymentFormDivIcon} />
              <input
                  className={styles.paymentFormInput}
                  maxLength={40}
                  type="text"
                  name="cardholderName"
                  id="form-checkout__cardholderName"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
              />
            </div>

            {/* Mes y año de expiracion y cvc */}
            <div className={styles.paymentFormDatos}>
              {/* Mes de expiracion */}
              <div className={styles.paymentFormDiv}>
                <BsCalendarDate className={styles.paymentFormDivIcon} />
                <input
                    maxLength={2}
                    className={styles.paymentFormInput}
                    type="tel"
                    name="cardExpirationMonth"
                    id="form-checkout__cardExpirationMonth"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
              </div>

              {/* Año de expiracion */}
              <div className={styles.paymentFormDiv}>
                <BsCalendar3 className={styles.paymentFormDivIcon} />
                <input
                    maxLength={2}
                    className={styles.paymentFormInput}
                    type="tel"
                    name="cardExpirationYear"
                    id="form-checkout__cardExpirationYear"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
              </div>

              {/* Codigo de seguridad */}
              <div className={styles.paymentFormDiv}>
                <MdOutlinePassword className={styles.paymentFormDivIcon} />
                <input
                    maxLength={3}
                    className={styles.paymentFormInput}
                    type="tel"
                    name="cvc"
                    id="form-checkout__securityCode"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.paymentFormDiv}>
              <FiAtSign className={styles.paymentFormDivIcon} />
              <input
                  className={styles.paymentFormInput}
                  type="email"
                  name="cardholderEmail"
                  id="form-checkout__cardholderEmail"
                  onFocus={handleInputFocus}
              />
            </div>

            {/* Selector BANCO */}
            <div className={styles.paymentSelectDiv}>
              <AiOutlineBank className={styles.paymentFormDivIcon} />
              <select
                  className={styles.paymentSelect}
                  name="issuer"
                  id="form-checkout__issuer"
                  on
              />
            </div>
            {/* Selector tipo de DNI */}
            <div className={styles.paymentSelectDiv}>
              <HiOutlineDocumentText className={styles.paymentFormDivIcon} />
              <select
                  className={styles.paymentSelect}
                  name="identificationType"
                  id="form-checkout__identificationType"
              />
            </div>

            {/* DNI */}

            <div className={styles.paymentFormDiv}>
              <HiOutlineIdentification className={styles.paymentFormDivIcon} />
              <input
                  maxLength={10}
                  className={styles.paymentFormInput}
                  type="text"
                  name="identificationNumber"
                  id="form-checkout__identificationNumber"
              />
            </div>

            {/* Selector CUOTAS */}

            <div className={styles.paymentSelectDiv}>
              <MdPayments className={styles.paymentFormDivIcon} />
              <select
                  className={styles.paymentSelect}
                  name="installments"
                  id="form-checkout__installments"
              />
            </div>

            <div className={styles.paymentFormDivButton}>
              <button type="submit" id="form-checkout__submit">
                Pagar
              </button>
            </div>

            <progress value="0" className="progress-bar">
              Cargando...
            </progress>
          </form>
          {resultPayment && console.log(resultPayment)}
        </div>
      </div>
  );
}