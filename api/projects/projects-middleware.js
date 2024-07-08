const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
    const { id } = req.params
    try {
        const project = await Projects.get(id)
        if (project) {
            req.project = project
            next()
        } else {
            res.status(404).json({
                message: `Project not found`
            })
        }
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving project' });
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body;
    if (!name || !description || typeof completed === 'undefined' ) {
        return res.status(400).json({ message: 'Name, discription and completed is needed' });
    }
    next()
}

module.exports = {
    validateProjectId,
    validateProject,
};