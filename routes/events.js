const { Router } = require('express');
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/jwtValidator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/fieldValidator');

const router = Router();
router.use(validateJWT);

router.get(
    '/',
    getEvents
);

router.post(
    '/',
    [
        check('title', 'Title is mandatory').not().isEmpty(),
        check('start', 'Start Date is mandatory and must be a valid date').isDate(),
        check('end', 'End Date is mandatory and must be a valid date').isDate(),
        validateFields
    ],
    createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;