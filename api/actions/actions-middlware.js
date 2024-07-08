// add middlewares here related to actions
const Actions = require('./actions-model')

function validateActionId(req, res, next) {
    const { id } = req.params;
    Actions.get(id)
        .then(action => {
            if (action) {
                req.action = action;
                next();
            } else {
                res.status(404).json({ message: 'Action not found' });
            }
        })
        .catch(err => {
            next(err)
        });
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        return res.status(400).json({ message: 'Project id, description and notes are required' });
    }
    next();
} 

module.exports = {
    validateAction,
    validateActionId
}