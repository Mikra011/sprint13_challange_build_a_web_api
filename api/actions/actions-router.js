// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middlware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const projects = await Actions.get();
        res.json(projects);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', validateActionId, (req, res, next) => {
    Actions.get(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
});

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
});

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
});

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.json(req.Actions)
        })
        .catch(next)
});

router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: 'Something bad happened inside the actions-router',
        stack: error.stack,
    });
});

module.exports = router