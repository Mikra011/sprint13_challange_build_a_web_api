// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

router.get('/', (req, res, next) => {

});

router.get('/:id', (req, res, next) => {

});

router.post('/', (req, res, next) => {

});

router.put('/:id', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

router.get('/:id/actions', (req, res, next) => {

});


//   router.use((error, req, res, next) => { //eslint-disable-line
//     res.status(error.status || 500).json({
//       message: error.message,
//       customMessage: 'Something bad happened inside the users-router',
//       stack: error.stack,
//     });
//   });
