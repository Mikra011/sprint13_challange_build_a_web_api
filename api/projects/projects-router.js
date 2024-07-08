// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');
const {  
  validateProjectId, 
  validateProject 
} = require('./projects-middleware');
const router = express.Router();



router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateProjectId, (req, res, next) => {
  Projects.get(req.params.id)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
});

router.post('/', validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(next)
});

router.put('/:id',validateProjectId, validateProject, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then(project => {
      res.status(200).json(project)
    })
    .catch(next)
});

router.delete('/:id', validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.json(req.projects)
    })
    .catch(next)
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
} catch (err) {
    next(err);
}
});

router.use((error, req, res, next) => { //eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: 'Something bad happened inside the projects-router',
    stack: error.stack,
  });
});

module.exports = router
