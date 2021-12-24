const express = require("express");
const duffel = require('../duffel');

const router = express();


router.get("/search", async function (req, res, next) {

  try{


    let mode;
    
    let { origin, destination, dDate, rDate, adults, childs, baby, cabin } = req.query;
    let psgrs = [];


    if(rDate !== undefined){
      mode = 'roundtrip';
    }else{
      mode = 'oneway';
    }

    for(let i = 0; i < adults; i++){
      let psgr = {type: "adult"};
      psgrs.push(psgr);
    }

    if(childs > 0){
      for(let k = 0; k < childs; k++){
        let psgr = {type: "child"};
        psgrs.push(psgr);
      }
    }

    if(baby > 0){
      for(let k = 0; k < baby; k++){
        let psgr = {type: "infant_without_seat"};
        psgrs.push(psgr);
      }
    }
    
    if(mode === 'oneway'){
  
      const offerRequestOneway = await duffel.offerRequests.create(
        {
          return_offers: true,
          slices: [
            {
              origin: origin,
              destination: destination,
              departure_date: dDate,
            },
          ],
          passengers: psgrs,
          cabin_class: cabin,
        }
      );

      if(!offerRequestOneway.data.slices[0].origin.airports && !offerRequestOneway.data.slices[0].destination.airports ){
        var latO = offerRequestOneway.data.slices[0].origin.latitude
        var lngO = offerRequestOneway.data.slices[0].origin.longitude
        var latD = offerRequestOneway.data.slices[0].destination.latitude
        var lngD = offerRequestOneway.data.slices[0].destination.longitude
      } else if(offerRequestOneway.data.slices[0].origin.airports && offerRequestOneway.data.slices[0].destination.airports){
        var latO = offerRequestOneway.data.slices[0].origin.airports[0].latitude
        var lngO = offerRequestOneway.data.slices[0].origin.airports[0].longitude
        var latD = offerRequestOneway.data.slices[0].destination.airports[0].latitude
        var lngD = offerRequestOneway.data.slices[0].destination.airports[0].longitude
      } else if (offerRequestOneway.data.slices[0].origin.airports && !offerRequestOneway.data.slices[0].destination.airports){
        var latO = offerRequestOneway.data.slices[0].origin.airports[0].latitude
        var lngO = offerRequestOneway.data.slices[0].origin.airports[0].longitude
        var latD = offerRequestOneway.data.slices[0].destination.latitude
        var lngD = offerRequestOneway.data.slices[0].destination.longitude
      } else if (!offerRequestOneway.data.slices[0].origin.airports && offerRequestOneway.data.slices[0].destination.airports){
        var latO = offerRequestOneway.data.slices[0].origin.latitude
        var lngO = offerRequestOneway.data.slices[0].origin.longitude
        var latD = offerRequestOneway.data.slices[0].destination.airports[0].latitude
        var lngD = offerRequestOneway.data.slices[0].destination.airports[0].longitude
      }

    
  
      const flightResults = {
        mode: mode,
        class: cabin,
        origin: {
          city: offerRequestOneway.data.slices[0].origin.city_name || offerRequestOneway.data.slices[0].origin.name,
          airport: offerRequestOneway.data.slices[0].origin.name,
          latO: latO,
          lngO: lngO,
        },
        destination: {
          city: offerRequestOneway.data.slices[0].destination.city_name || offerRequestOneway.data.slices[0].destination.name,
          airport: offerRequestOneway.data.slices[0].destination.name,
          latD: latD,
          lngD: lngD,
        },
        offers: []
      };

      if(flightResults.origin.city === flightResults.origin.airport){
        let i = 0;
        while(flightResults.origin.city === flightResults.origin.airport){
          if(offerRequestOneway.data.offers[i].slices[0].origin.iata_code === origin){
            flightResults.origin.airport = offerRequestOneway.data.offers[i].slices[0].origin.name;
          }
          i++;
        }
      }

      if(flightResults.destination.city === flightResults.destination.airport){
        let i = 0;
        while(flightResults.destination.city === flightResults.destination.airport){
          if(offerRequestOneway.data.offers[i].slices[0].destination.iata_code === destination){
            flightResults.destination.airport = offerRequestOneway.data.offers[i].slices[0].destination.name;
          }
          i++;
        }
      }
      
      for(let i = 0; i < offerRequestOneway.data.offers.length; i++){
        let flight = {
          id: offerRequestOneway.data.offers[i].id,
          origin: {
            city: offerRequestOneway.data.offers[i].slices[0].origin.city_name,
            airport: offerRequestOneway.data.offers[i].slices[0].origin.name,
            date: offerRequestOneway.data.offers[i].slices[0].segments[0].departing_at,
          },
          destiny: {
            city: offerRequestOneway.data.offers[i].slices[0].destination.city_name,
            airport: offerRequestOneway.data.offers[i].slices[0].destination.name,
            date: offerRequestOneway.data.offers[i].slices[0].segments[0].arriving_at
          },
          price: offerRequestOneway.data.offers[i].total_amount,
          currency: offerRequestOneway.data.offers[i].total_currency,
          airline: offerRequestOneway.data.offers[i].owner.name,
          transfers: [],
        }
  
        offerRequestOneway.data.offers[i].slices[0].segments.map((transfer)=>{
          let tr = {
            origin: transfer.origin.city_name,
            destination: transfer.destination.city_name,
            departure: transfer.departing_at,
            arrive: transfer.arriving_at,
            airline: transfer.marketing_carrier.name,
            flightNumber: transfer.marketing_carrier_flight_number
          }
  
          flight.transfers.push(tr);
  
        });
        
        if(offerRequestOneway.data.offers[i].slices[0].origin.iata_code === origin && offerRequestOneway.data.offers[i].slices[0].destination.iata_code === destination){
          flightResults.offers.push(flight);
        }
      }

      res.send(flightResults);
    }
    
    else if(mode === 'roundtrip')
    
    {

      const offerRequestRoundtrip = await duffel.offerRequests.create(
        {
          return_offers: true,
          slices: [
            {
              origin: origin,
              destination: destination,
              departure_date: dDate,
            },
            {
              origin: destination,
              destination: origin,
              departure_date: rDate,
            },
          ],
          passengers: psgrs,
          cabin_class: cabin,
        }
      );


      if(!offerRequestRoundtrip.data.slices[0].origin.airports && !offerRequestRoundtrip.data.slices[0].destination.airports ){
        var latO = offerRequestRoundtrip.data.slices[0].origin.latitude
        var lngO = offerRequestRoundtrip.data.slices[0].origin.longitude
        var latD = offerRequestRoundtrip.data.slices[0].destination.latitude
        var lngD = offerRequestRoundtrip.data.slices[0].destination.longitude
      } else if(offerRequestRoundtrip.data.slices[0].origin.airports && offerRequestRoundtrip.data.slices[0].destination.airports){
        var latO = offerRequestRoundtrip.data.slices[0].origin.airports[0].latitude
        var lngO = offerRequestRoundtrip.data.slices[0].origin.airports[0].longitude
        var latD = offerRequestRoundtrip.data.slices[0].destination.airports[0].latitude
        var lngD = offerRequestRoundtrip.data.slices[0].destination.airports[0].longitude
      } else if (offerRequestRoundtrip.data.slices[0].origin.airports && !offerRequestRoundtrip.data.slices[0].destination.airports){
        var latO = offerRequestRoundtrip.data.slices[0].origin.airports[0].latitude
        var lngO = offerRequestRoundtrip.data.slices[0].origin.airports[0].longitude
        var latD = offerRequestRoundtrip.data.slices[0].destination.latitude
        var lngD = offerRequestRoundtrip.data.slices[0].destination.longitude
      } else if (!offerRequestRoundtrip.data.slices[0].origin.airports && offerRequestRoundtrip.data.slices[0].destination.airports){
        var latO = offerRequestRoundtrip.data.slices[0].origin.latitude
        var lngO = offerRequestRoundtrip.data.slices[0].origin.longitude
        var latD = offerRequestRoundtrip.data.slices[0].destination.airports[0].latitude
        var lngD = offerRequestRoundtrip.data.slices[0].destination.airports[0].longitude
      }
   
      const flightResults = {
        mode: mode,
        class: cabin,
        origin: {
          city: offerRequestRoundtrip.data.slices[0].origin.city_name || offerRequestRoundtrip.data.slices[0].origin.name,
          airport: offerRequestRoundtrip.data.slices[0].origin.name,
          latO: latO,
          lngO: lngO,
        },
        destination: {
          city: offerRequestRoundtrip.data.slices[0].destination.city_name || offerRequestRoundtrip.data.slices[0].destination.name,
          airport: offerRequestRoundtrip.data.slices[0].destination.name,
          latD: latD,
          lngD: lngD,
        },
        offers: []
      };

      if(flightResults.origin.city === flightResults.origin.airport){
        let i = 0;
        while(flightResults.origin.city === flightResults.origin.airport){
          if(offerRequestRoundtrip.data.offers[i].slices[0].origin.iata_code === origin){
            flightResults.origin.airport = offerRequestRoundtrip.data.offers[i].slices[0].origin.name;
          }
          i++;
        }
      }

      if(flightResults.destination.city === flightResults.destination.airport){
        let i = 0;
        while(flightResults.destination.city === flightResults.destination.airport){
          if(offerRequestRoundtrip.data.offers[i].slices[0].destination.iata_code === destination){
            flightResults.destination.airport = offerRequestRoundtrip.data.offers[i].slices[0].destination.name;
          }
          i++;
        }
      }
      
      for(let i = 0; i < offerRequestRoundtrip.data.offers.length; i++){
        let flight = {
          id: offerRequestRoundtrip.data.offers[i].id,
          price: offerRequestRoundtrip.data.offers[i].total_amount,
          currency: offerRequestRoundtrip.data.offers[i].total_currency,
          airline: offerRequestRoundtrip.data.offers[i].owner.name,
          departure: {
            id: offerRequestRoundtrip.data.offers[i].slices[0].id,
            origin: {
              city: offerRequestRoundtrip.data.offers[i].slices[0].origin.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[0].origin.name,
              date: offerRequestRoundtrip.data.offers[i].slices[0].segments[0].departing_at,
            },
            destiny: {
              city: offerRequestRoundtrip.data.offers[i].slices[0].destination.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[0].destination.name,
            },
            transfers: []
          },
          return: {
            id: offerRequestRoundtrip.data.offers[i].slices[1].id,
            origin: {
              city: offerRequestRoundtrip.data.offers[i].slices[1].origin.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[1].origin.name,
              date: offerRequestRoundtrip.data.offers[i].slices[1].segments[0].departing_at
            },
            destiny: {
              city: offerRequestRoundtrip.data.offers[i].slices[1].destination.city_name,
              airport: offerRequestRoundtrip.data.offers[i].slices[1].destination.name
            },
            transfers: []
          }
        }
  
        offerRequestRoundtrip.data.offers[i].slices[0].segments.map((transfer)=>{
          let tr = {
            origin: transfer.origin.city_name,
            destination: transfer.destination.city_name,
            departure: transfer.departing_at,
            arrive: transfer.arriving_at,
            airline: transfer.marketing_carrier.name,
            flightNumber: transfer.marketing_carrier_flight_number
          }

          flight.departure.transfers.push(tr);
          
        });

        offerRequestRoundtrip.data.offers[i].slices[1].segments.map((transfer)=>{
          let tr = {
            id: transfer.id,
            origin: transfer.origin.city_name,
            destination: transfer.destination.city_name,
            departure: transfer.departing_at,
            arrive: transfer.arriving_at,
            airline: transfer.marketing_carrier.name,
            flightNumber: transfer.marketing_carrier_flight_number
          }

          flight.return.transfers.push(tr);
          
        });

        if(offerRequestRoundtrip.data.offers[i].slices[0].origin.iata_code === origin && offerRequestRoundtrip.data.offers[i].slices[0].destination.iata_code === destination){
          if(offerRequestRoundtrip.data.offers[i].slices[1].origin.iata_code === destination && offerRequestRoundtrip.data.offers[i].slices[1].destination.iata_code === origin){
            flightResults.offers.push(flight);
          }
        }

      }

      res.send(flightResults);

    }

  }catch(error){

    if(error.errors){
      next(error.errors[0].message);
    }else{
      next(error);
    }

  }
});

module.exports = router;
