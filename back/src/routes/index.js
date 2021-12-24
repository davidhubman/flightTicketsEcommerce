const {Router} = require('express');


// Importar todos los routers
const flights = require('./flights.js');
const seats = require('./seats.js');
const saves = require('./saves');
const isAvailable = require('./isAvailable');
const mercadoPagob = require('./mercadoPagob');
const gettickets = require('./gettickets');



const router = Router();

// Configurar los routers
router.use('/', flights);
router.use('/', seats);
router.use('/', saves);
router.use('/', isAvailable);
router.use('/', mercadoPagob);
router.use('/', gettickets);

module.exports = router;