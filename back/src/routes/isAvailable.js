const express = require("express");
const duffel = require('../duffel');

const router = express();

router.get('/isavailable', async(req, res, next)=>{

    const {
        flightId,
        originAirport,
        destinationAirport,
        origin,
        destination,
        price,
        adults,
        childs,
        baby,
        cabin,
        dDate,
        rDate,
        transfers,
        transfersD,
        transfersR
    } = req.query;


    const escalasIda = parseInt(transfers);
    const psgrs = [];

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



    if(!rDate){
        try{



            const flight = await duffel.offers.get(flightId, {
                "return_available_services": true
            });
        
            const data = flight.data;
        
            const info = {
                mode: "oneway",
                airline: data.owner.name,
                currency: data.total_currency,
                price: data.total_amount,
                cabin: data.slices[0].segments[0].passengers[0].cabin_class,
                adults: adults,
                childs: childs,
                baby: baby,
                offers:info.offers,
                originCity: data.slices[0].origin.city_name,
                originAirport: data.slices[0].origin.name,
                destinationCity: data.slices[0].destination.city_name,
                destinationAirport: data.slices[0].destination.name,
                transfers: [],
        
            }

            if(info.originCity === info.originAirport){
                let i = 0;
                while(info.originCity === info.originAirport){
                  if(data.offers[i].slices[0].origin.iata_code === originIATA){
                    info.originAirport = data.offers[i].slices[0].origin.name;
                  }
                  i++;
                }
              }


              if(info.destinationCity === info.destinationAirport){
                let i = 0;
                while(info.destinationCity === info.destinationAirport){
                  if(data.offers[i].slices[0].destination.iata_code === destinationIATA){
                    info.destinationAirport = data.offers[i].slices[0].destination.name;
                  }
                  i++;
                }
              }
        
            data.slices[0].segments.map((transfer)=>{
                let tr = {
                  id: transfer.id,
                  origin: transfer.origin.city_name,
                  destination: transfer.destination.city_name,
                  departure: transfer.departing_at,
                  arrive: transfer.arriving_at,
                  airline: transfer.marketing_carrier.name,
                  flightNumber: transfer.marketing_carrier_flight_number
                }
        
                info.transfers.push(tr);
                
              });


            return res.send(info);
    
        }catch{
    
            try{

                console.log("Ya cambió el ID")
    
                let originIATA = origin, destinationIATA = destination;
    
    
                const offerRequestOneway = await duffel.offerRequests.create(
                    {
                      return_offers: true,
                      slices: [
                        {
                          origin: originIATA,
                          destination: destinationIATA,
                          departure_date: dDate,
                        },
                      ],
                      passengers: psgrs,
                      cabin_class: cabin,
                    }
                );
    
                for(let i = 0; i < offerRequestOneway.data.offers.length; i++){
                    
                    let transfers = [];
    
              
                    offerRequestOneway.data.offers[i].slices[0].segments.map((transfer)=>{
                        let tr = {
                            origin: transfer.origin.city_name,
                            destination: transfer.destination.city_name,
                            departure: transfer.departing_at,
                            arrive: transfer.arriving_at,
                            airline: transfer.marketing_carrier.name,
                            flightNumber: transfer.marketing_carrier_flight_number
                        }
              
                      transfers.push(tr);
                    });
                    
                    if(offerRequestOneway.data.offers[i].slices[0].origin.iata_code === originIATA && offerRequestOneway.data.offers[i].slices[0].destination.iata_code === destinationIATA){
                        if(offerRequestOneway.data.offers[i].total_amount === price){

                          if(escalasIda === transfers.length){
                              let response = {
                                offers: offerRequestOneway.data.offers[i].id,
                                mode: "oneway",
                                currency: offerRequestOneway.data.offers[i].total_currency,
                                price: offerRequestOneway.data.offers[i].total_amount,
                                dDate: dDate,
                                cabin: cabin,
                                adults: adults,
                                childs: childs,
                                baby: baby,
                                originCity: offerRequestOneway.data.offers[i].slices[0].origin.city_name,
                                originAirport: offerRequestOneway.data.offers[i].slices[0].origin.name,
                                destinationCity: offerRequestOneway.data.offers[i].slices[0].destination.city_name,
                                destinationAirport: offerRequestOneway.data.offers[i].slices[0].destination.name,
                                transfers: transfers
                              }
    
                              if(response.originCity === response.originAirport){
                                let i = 0;
                                while(response.originCity === response.originAirport){
                                  if(offerRequestOneway.data.offers[i].slices[0].origin.iata_code === originIATA){
                                    response.originAirport = offerRequestOneway.data.offers[i].slices[0].origin.name;
                                  }
                                  i++;
                                }
                              }
    
    
                              if(response.destinationCity === response.destinationAirport){
                                let i = 0;
                                while(response.destinationCity === response.destinationAirport){
                                  if(offerRequestOneway.data.offers[i].slices[0].destination.iata_code === destinationIATA){
                                    response.destinationAirport = offerRequestOneway.data.offers[i].slices[0].destination.name;
                                  }
                                  i++;
                                }
                              }
    
                              return res.send(response);
    
                            }
    
                        }
                    }
                }

              const error = {
                  message: "error"
              }
      
              return res.send(error);
    
            }catch{

                const error = {
                    message: "El vuelo solicitado no está disponible"
                }
        
                next(error);
            }
        }
    }else{
        try{
            const flight = await duffel.offers.get(flightId, {
                "return_available_services": true
            });
        
            const data = flight.data;
        
            const info = {
                mode: "roundtrip",
                airline: data.owner.name,
                currency: data.total_currency,
                price: data.total_amount,
                dDate: dDate,
                rDate: rDate,
                offers:data.id,
                cabin: data.slices[0].segments[0].passengers[0].cabin_class,
                adults: adults,
                childs, childs,
                baby, baby,
                originCity: data.slices[0].origin.city_name,
                originAirport: data.slices[0].origin.name,
                destinationCity: data.slices[0].destination.city_name,
                destinationAirport: data.slices[0].destination.name,
                transfersD: [],
                transfersR: []
            }

            if(info.originCity === info.originAirport){
                let i = 0;
                while(info.originCity === info.originAirport){
                  if(data.offers[i].slices[0].origin.iata_code === originIATA){
                    info.originAirport = data.offers[i].slices[0].origin.name;
                  }
                  i++;
                }
              }


              if(info.destinationCity === info.destinationAirport){
                let i = 0;
                while(info.destinationCity === info.destinationAirport){
                  if(data.offers[i].slices[0].destination.iata_code === destinationIATA){
                    info.destinationAirport = data.offers[i].slices[0].destination.name;
                  }
                  i++;
                }
              }
        
            data.slices[0].segments.map((transfer)=>{
                let tr = {
                  id: transfer.id,
                  origin: transfer.origin.city_name,
                  destination: transfer.destination.city_name,
                  departure: transfer.departing_at,
                  arrive: transfer.arriving_at,
                  airline: transfer.marketing_carrier.name,
                  flightNumber: transfer.marketing_carrier_flight_number
                }
        
                info.transfersD.push(tr);
                
            });

            data.slices[1].segments.map((transfer)=>{
                let tr = {
                  id: transfer.id,
                  origin: transfer.origin.city_name,
                  destination: transfer.destination.city_name,
                  departure: transfer.departing_at,
                  arrive: transfer.arriving_at,
                  airline: transfer.marketing_carrier.name,
                  flightNumber: transfer.marketing_carrier_flight_number
                }
        
                info.transfersR.push(tr);
                
            });
        
            return res.send(info);
    
        }catch{

            try{
                console.log("Ya cambió el ID")
        
                let originIATA = origin, destinationIATA = destination;
        

        
                    const offerRequestRoundtrip = await duffel.offerRequests.create(
                        {
                        return_offers: true,
                        slices: [
                            {
                                origin: originIATA,
                                destination: destinationIATA,
                                departure_date: dDate,
                            },
                            {
                                origin: destinationIATA,
                                destination: originIATA,
                                departure_date: rDate,
                            }
                        ],
                        passengers: psgrs,
                        cabin_class: cabin,
                        }
                    );

                    for(let i = 0; i < offerRequestRoundtrip.data.offers.length; i++){
                        
                        let transfers = [[], []];

                        offerRequestRoundtrip.data.offers[i].slices[0].segments.map((transfer)=>{
                            let tr = {
                                origin: transfer.origin.city_name,
                                destination: transfer.destination.city_name,
                                departure: transfer.departing_at,
                                arrive: transfer.arriving_at,
                                airline: transfer.marketing_carrier.name,
                                flightNumber: transfer.marketing_carrier_flight_number
                            }
                
                        transfers[0].push(tr);
                        });

                        offerRequestRoundtrip.data.offers[i].slices[1].segments.map((transfer)=>{
                            let tr = {
                                origin: transfer.origin.city_name,
                                destination: transfer.destination.city_name,
                                departure: transfer.departing_at,
                                arrive: transfer.arriving_at,
                                airline: transfer.marketing_carrier.name,
                                flightNumber: transfer.marketing_carrier_flight_number
                            }
                
                        transfers[1].push(tr);
                        });

                        if(offerRequestRoundtrip.data.offers[i].slices[0].origin.iata_code === originIATA && offerRequestRoundtrip.data.offers[i].slices[0].destination.iata_code === destinationIATA &&
                            offerRequestRoundtrip.data.offers[i].slices[1].origin.iata_code === destinationIATA && offerRequestRoundtrip.data.offers[i].slices[1].destination.iata_code === originIATA
                            ){

                            if(offerRequestRoundtrip.data.offers[i].total_amount === price){
                            if(parseInt(transfersD) === transfers[0].length && parseInt(transfersR) === transfers[1].length){
                                let response = {
                                    offers: offerRequestRoundtrip.data.offers[i].id,
                                    mode: "roundtrip",
                                    currency: offerRequestRoundtrip.data.offers[i].total_currency,
                                    price: offerRequestRoundtrip.data.offers[i].total_amount,
                                    dDate: dDate,
                                    cabin: cabin,
                                        adults: adults,
                                        childs: childs,
                                        baby: baby,
                                            originCity: offerRequestRoundtrip.data.offers[i].slices[0].origin.city_name,
                                            originAirport: offerRequestRoundtrip.data.offers[i].slices[0].origin.name,
                                            destinationCity: offerRequestRoundtrip.data.offers[i].slices[0].destination.city_name,
                                            destinationAirport: offerRequestRoundtrip.data.offers[i].slices[0].destination.name,
                                        transfersD: transfers[0],
                                        transfersR: transfers[1]
                                }

                                if(response.originCity === response.originAirport){
                                    let i = 0;
                                    while(response.originCity === response.originAirport){
                                    if(offerRequestRoundtrip.data.offers[i].slices[0].origin.iata_code === originIATA){
                                        response.originAirport = offerRequestRoundtrip.data.offers[i].slices[0].origin.name;
                                    }
                                    i++;
                                    }
                                }


                                if(response.destinationCity === response.destinationAirport){
                                    let i = 0;
                                    while(response.destinationCity === response.destinationAirport){
                                    if(offerRequestRoundtrip.data.offers[i].slices[0].destination.iata_code === destinationIATA){
                                        response.destinationAirport = offerRequestRoundtrip.data.offers[i].slices[0].destination.name;
                                    }
                                    i++;
                                    }
                                }

                                return res.send(response);

                                }

                            }
                        }
                    }

                  const error = {
                    message: "error"
                  }
          
                  return res.send(error);
                }catch{
                    const error = {
                        message: "El vuelo solicitado no está disponible"
                    }
            
                    next(error);
                }

        }
    }


});




router.get('/zoronguito/:id', async(req, res, next)=>{

    const flightId = req.params.id;



    try{
        const flight = await duffel.offers.get(flightId, {
            "return_available_services": true
        });
    
        const data = flight.data;

        res.send(data);
    }catch(error){
        next(error)
    }
});



module.exports = router;