const Projects = require('./projects-model');

async function validateAction(req, res, next) {
    const { id } = req.params;
    try {
        const actions = await Projects.getProjectActions(id);
        if (actions.length > 0) {
            req.action = actions;
            next();
        } else {
            res.status(404).json({ message: 'Actions not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Fatal server error' });
    }
}

module.exports = {
    validateAction,
};