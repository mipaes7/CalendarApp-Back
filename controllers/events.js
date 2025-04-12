const { response, json } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {

    try {

        let events = await Event.find()
                                .populate('user', 'name');

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
        event.user = req.uid;
        const createdEvent = await event.save();

        res.status(201).json(
            {
                ok: true,
                createdEvent: createdEvent
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

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const eventToUpdate = await Event.findById(eventId);

        if (!eventToUpdate) {
            res.status(404).json(
                {
                    ok: false,
                    msg: 'Id event not found'
                }
            )
        }
        console.log(eventToUpdate.user);
        if (eventToUpdate.user.toString() !== uid) {
            res.status(401).json(
                {
                    ok: false,
                    msg: 'User unauthorized to perform this action'
                }
            )
        }

        const modifiedEvent = {
            ...req.body,
            user: uid
        };

        const updatedEvent = await Event.findByIdAndUpdate(eventId, modifiedEvent, {new: true});

        res.status(200).json(
            {
                ok: true,
                msg: 'Event updated',
                updatedEvent: updatedEvent
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

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const eventToDelete = await Event.findById(eventId);

        if (!eventToDelete) {
            res.status(404).json(
                {
                    ok: false,
                    msg: 'Event not found!'
                }
            )
        }

        if (eventToDelete.user.toString() !== uid)
        {
            res.status(401).json(
                {
                    ok: false,
                    msg: 'User unauthorized to perform this action'
                }
            )
        }

        await Event.findByIdAndDelete(eventId);

        res.status(200).json(
            {
                ok: true,
                msg: 'Event deleted',
                deletedEvent: eventToDelete
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