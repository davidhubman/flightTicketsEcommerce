const mercadopago = require("mercadopago");
const express = require("express");
require("dotenv").config();
const db = require("../firebase");

const router = express();

const ACCESS_TOKEN_MP = "TEST-1088004245146207-120323-9ebc270d7c59b0a290e5b2696ee73c4b-819583122"
const PUBLIC_KEY_MP = "TEST-0f046780-e30e-443a-b0c8-cc6d4fd9be99"

router.post("/process-payment", (req, res) => {
    mercadopago.configurations.setAccessToken(ACCESS_TOKEN_MP);
    const payment_data = {
        transaction_amount: req.body.transaction_amount,
        token: req.body.token,
        description: req.body.description,
        installments: Number(req.body.installments),
        payment_method_id: req.body.payment_method_id,
        issuer_id: req.body.issuer_id,
        payer: {
            email: req.body.email,
            identification: {
                type: req.body.identification_type,
                number: req.body.identification_number,
            },
        },
    };

    mercadopago.payment
        .save(payment_data)
        .then((response) => {
            return res.status(response.status).json({
                status: response.body.status,
                status_detail: response.body.status_detail,
                id: response.body.id,
            });
        })

        .catch((err) => {
            return res.status(500).send(err);
        });

});


module.exports = router;
