import { useEffect, useState } from "react";
import useScript from "./useScript";
import { formConfig } from "../components/MercadoPago/formConfig.js";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import {auth, db} from "../firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";

const VITE_PUBLIC_KEY_MP = "TEST-0f046780-e30e-443a-b0c8-cc6d4fd9be99";

export default function useMercadoPago(props) {

    const [user, loading, error] = useAuthState(auth);
    const [usuario, setUsuario] = useState([]);
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
            }).then(() => {
                console.log("Ticket guardado");
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
            const filtrado = docs.filter((doc) => doc.email === user.email);
            setUsuario(filtrado);
        });
    };

    useEffect(() => {
        if (MercadoPago) {
            const mp = new MercadoPago(VITE_PUBLIC_KEY_MP);
            const cardForm = mp.cardForm({
                amount: "100.5",
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

                        fetch(`https://dev-sky.herokuapp.com/process-payment`,
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
                                    description: "Descripción del producto",
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
                                ).then(r =>
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
    }, [MercadoPago]);

    return resultPayment;
}
