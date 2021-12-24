const express = require("express");
const axios = require("axios");
const duffel = require('../duffel');

const router = express();

router.get('/seats/:id', async (req, res, next)=>{

    try{

        const { id } = req.params;

        const flightSeats = await duffel.seatMaps.get({
          offer_id: id,
        });

        if(flightSeats.data.length > 0){
          //SI DEJA ELEGIR ASIENTOS, LOS MAPEAMOS

          const offers = {
            seatsByFlight: flightSeats.data.map((e) => {
              const offerSlice = {
                id: e.id,
                hallsAmount: e.cabins.map((e) => e.aisles),
                rowsAmount: e.cabins.map((e) => e.rows.length),
                columns: e.cabins.map((e) => e.rows.map((e) => e.sections.length)),
                seatsByColumn: e.cabins.map((e) =>
                  e.rows.map((e) => e.sections.map((e) => e.elements.length))
                ),
                //map: e.cabins.rows.map((e) => e),
                seatsInfo: e.cabins.map((e) =>
                  e.rows.map((e) =>
                    e.sections.map((e) =>
                      e.elements.map((e) => {
                        const boxInfo = {
                          type: e.type,
                          numberAndLetter: e.designator,
                          available: e.available_services,
                          restrictions: e.disclosures,
                        };
                        return boxInfo;
                      })
                    )
                  )
                ),
              };
              return offerSlice;
            }),
          };
        
          return res.send(offers);
        } else {
          return res.send("No hay asientos disponibles");
        }

    }catch(error){

      next(error);

    }

});


module.exports = router;