const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const teamService = require('./team.service');

router.get('/', getAll);
router.get('/:teamId', getById);
router.post('/', createSchema, create);
router.put('/:teamId', updateSchema, update);
router.delete('/:teamId', _delete);

module.exports = router;

function getAll(req, res, next) {
    teamService.getAll()
        .then(teams => res.json(teams))
        .catch(next);
}

function getById(req, res, next) {
    teamService.getById(req.params.teamId)
        .then(team => team ? res.json(team) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        location: Joi.string().required(),
        coach: Joi.string().required(),
        region: Joi.string().required(),
        manager: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    teamService.create(req.body)
        .then(team => res.json(team))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = {
        name: Joi.string().empty(''),
        location: Joi.string().empty(''),
        coach: Joi.string().empty(''),
        region: Joi.string().empty(''),
        manager: Joi.string().empty('')
    };
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    teamService.update(req.params.teamId, req.body)
        .then(team => res.json(team))
        .catch(next);
}

function _delete(req, res, next) {
    teamService.delete(req.params.teamId)
        .then(() => res.json({ message: 'Team deleted successfully' }))
        .catch(next);
}
