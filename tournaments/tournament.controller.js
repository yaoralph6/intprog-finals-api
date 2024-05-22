const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const tournamentService = require('./tournament.service');

// Routes
router.get('/', getAll);
router.get('/:tournamentId', getById);
router.post('/', createSchema, create);
router.put('/:tournamentId', updateSchema, update);
router.delete('/:tournamentId', _delete);

module.exports = router;

// Route Handlers
function getAll(req, res, next) {
    tournamentService.getAll()
        .then(tournaments => res.json(tournaments))
        .catch(next);
}

function getById(req, res, next) {
    tournamentService.getById(req.params.tournamentId)
        .then(tournament => tournament ? res.json(tournament) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    tournamentService.create(req.body)
        .then(tournament => res.json(tournament))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        location: Joi.string().empty(''),
        startDate: Joi.date().empty(''),
        endDate: Joi.date().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    tournamentService.update(req.params.tournamentId, req.body)
        .then(tournament => res.json(tournament))
        .catch(next);
}

function _delete(req, res, next) {
    tournamentService.delete(req.params.tournamentId)
        .then(() => res.json({ message: 'Tournament deleted successfully' }))
        .catch(next);
}
