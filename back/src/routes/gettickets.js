const express = require('express');
const admin = require('../firebase');
const db = admin.firestore();

const router = express();

router.get('/gettickets/:userId', async(req, res, next)=>{
    try{
        const { userId } = req.params;

        const data = await db.collection('saved_tickets').get();
        const tickets = [];

        data.forEach(doc => {

                if(userId === doc.data().userId){
                    var ticket = {}

                    if(doc.data().rDate){
                        ticket = {
                            adults: doc.data().adults,
                            baby: doc.data().baby,
                            cabin: doc.data().cabin,
                            childs: doc.data().childs,
                            currency: doc.data().currency,
                            dDate: doc.data().dDate,
                            date: doc.data().date,
                            destination: doc.data().destination,
                            destinationAirport: doc.data().destinationAirport,
                            destinationCity: doc.data().destinationCity,
                            id: doc.data().id,
                            iddelDoc: doc.data().iddelDoc,
                            mode: doc.data().mode,
                            offers: doc.data().offers,
                            origin: doc.data().origin,
                            originAirport: doc.data().originAirport,
                            originCity: doc.data().originCity,
                            price: doc.data().price,
                            status: doc.data().status,
                            status_detail: doc.data().status_detail,
                            transfersD: doc.data().transfersD,
                            transfersR: doc.data().transfersR,
                            rDate: doc.data().rDate,
                            user: doc.data().user,
                            userId: doc.data().userId
                        }
                    }else{
                        ticket = {
                            adults: doc.data().adults,
                            baby: doc.data().baby,
                            cabin: doc.data().cabin,
                            childs: doc.data().childs,
                            currency: doc.data().currency,
                            dDate: doc.data().dDate,
                            date: doc.data().date,
                            destination: doc.data().destination,
                            destinationAirport: doc.data().destinationAirport,
                            destinationCity: doc.data().destinationCity,
                            id: doc.data().id,
                            iddelDoc: doc.data().iddelDoc,
                            mode: doc.data().mode,
                            offers: doc.data().offers,
                            origin: doc.data().origin,
                            originAirport: doc.data().originAirport,
                            originCity: doc.data().originCity,
                            price: doc.data().price,
                            status: doc.data().status,
                            status_detail: doc.data().status_detail,
                            transfers: doc.data().transfers,
                            user: doc.data().user,
                            userId: doc.data().userId
                        }
                    }
            tickets.push(ticket);
            
        }});

        res.send(tickets);

    }catch(error){
        next(error);
    }
    
});

module.exports = router;