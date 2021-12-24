const express = require('express');
const admin = require('../firebase');
const db = admin.firestore();

const router = express();

router.post('/saveflight', async(req, res, next)=>{

    const { offers, originCity, destinationCity, originAirport, destinationAirport, transfers,transfersR, transfersD, price, userId, adults, baby, childs, cabin, dDate, rDate, mode, currency, origin, destination } = req.body;
    var isSaved = false;



    if(db.collection('saves')){

        const data = await db.collection('saves').get();

        data.forEach(doc => {
            if(offers === doc.data().offers && userId === doc.data().userId){
                isSaved = true;
            }else{
                if(transfers && doc.data().transfers){
                    if(transfers.length === doc.data().transfers.length && price === doc.data().price){
                        if(userId === doc.data().userId){
                            isSaved = true;
                        }
                    }
                }else if(transfersD && doc.data().transfersD){
                    if(transfersD.length === doc.data().transfersD.length && transfersR.length === doc.data().transfersR.length && price === doc.data().price){
                        if(userId === doc.data().userId){
                            isSaved = true;
                        }
                    }
                }
            }
        });

    }

    if(isSaved){
        console.log(offers);
        const error = {
            message: "El vuelo ya está guardado"
        }

        next(error);

    }else{
        console.log(offers);
        var save= {}
        if(rDate){
            save = {
                offers: offers,
                origin: origin,
                destination: destination,
                userId: userId,
                mode: mode,
                currency: currency,
                price: price,
                dDate: dDate,
                rDate: rDate,
                cabin: cabin,
                adults: adults,
                childs: childs,
                baby: baby,
                originCity: originCity,
                originAirport: originAirport,
                destinationCity: destinationCity,
                destinationAirport: destinationAirport,
                transfersD: transfersD,
                transfersR: transfersR,
            }
        }else{
            save = {
                offers: offers,
                origin: origin,
                destination: destination,
                userId: userId,
                mode: mode,
                currency: currency,
                price: price,
                dDate: dDate,
                cabin: cabin,
                adults: adults,
                childs: childs,
                baby: baby,
                originCity: originCity,
                originAirport: originAirport,
                destinationCity: destinationCity,
                destinationAirport: destinationAirport,
                transfers: transfers
            }
        }

        db.collection("saves").doc().set(save)
            .then(()=>{
                res.send("Add favourite complete!");
            })
            .catch((error)=>{
                next(error);
            })
    }

});



router.get('/getsaves/:userId', async(req, res, next)=>{
    try{
        const { userId } = req.params;


        const data = await db.collection('saves').get();
        const saves = [];

        data.forEach(doc => {

            if(userId === doc.data().userId){
                var save= {}

                if(doc.data().rDate){
                    save = {
                        iddelDoc: doc.id,
                        offers: doc.data().offers,
                        origin: doc.data().origin,
                        destination: doc.data().destination,
                        userId: doc.data().userId,
                        mode: doc.data().mode,
                        currency: doc.data().currency,
                        price: doc.data().price,
                        dDate: doc.data().dDate,
                        rDate:doc.data().rDate,
                        cabin: doc.data().cabin,
                        adults: doc.data().adults,
                        childs: doc.data().childs,
                        baby: doc.data().baby,
                        originCity: doc.data().originCity,
                        originAirport: doc.data().originAirport,
                        destinationCity: doc.data().destinationCity,
                        destinationAirport: doc.data().destinationAirport,
                        transfersD: doc.data().transfersD,
                        transfersR: doc.data().transfersR,
                    }}else{
                    save = {
                        iddelDoc: doc.id,
                        offers: doc.data().offers,
                        origin: doc.data().origin,
                        destination: doc.data().destination,
                        userId: doc.data().userId,
                        mode: doc.data().mode,
                        currency: doc.data().currency,
                        price: doc.data().price,
                        dDate: doc.data().dDate,
                        cabin: doc.data().cabin,
                        adults: doc.data().adults,
                        childs: doc.data().childs,
                        baby: doc.data().baby,
                        originCity: doc.data().originCity,
                        originAirport: doc.data().originAirport,
                        destinationCity: doc.data().destinationCity,
                        destinationAirport: doc.data().destinationAirport,
                        transfers: doc.data().transfers
                    }
                }
                saves.push(save);

            }});

        res.send(saves);

    }catch(error){
        next(error);
    }

});


module.exports = router;