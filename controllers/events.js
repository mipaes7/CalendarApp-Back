const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    try {

        let events = await Event.find();
        console.log(events);

        res.status(200).json(
            {
                events: events
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'error'
            }
        )
    }

};

const createEvent = async(req, res = response) => {
    const { title } = req.body;

    try {
        
        let event = await Event.findOne({title: title});

        if (event) {
            res.status(400).json(
                {
                    ok: false,
                    msg: 'Event already exists'
                }
            )
        }

        // create and save event in db
        event = new Event(req.body);
        await event.save();

        res.status(201).json(
            {
                ok: true,
                event: req.body
            }
        );


    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'error'
            }
        )
    }
};

const updateEvent = async(req, res) => {

    const uid = req.query;
    const newData = req.body;

    try {
        
        const eventToUpdate = await Event.findOneAndUpdate(uid, newData, {
            new: true
        });

        res.status(200).json(
            {
                ok: true,
                msg: 'Event updated',
                updatedEvent: eventToUpdate
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                ok: false,
                msg: 'error'
            }
        )
    }

};

const deleteEvent = async(req, res) => {

    const uid = req.query;

    try {
        
        const eventToDelete = await Event.findOneAndDelete(uid);

        res.status(200).json(
            {
                ok: true,
                msg: 'Event deleted'
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                ok: true,
                msg: 'error'
            }
        )
    }

};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}