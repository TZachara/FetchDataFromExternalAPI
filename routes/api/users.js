const express = require('express');
const { body, validationResult, oneOf } = require('express-validator');

const router = express.Router();
const usersInteractor = require('../../interactors/usersInteractor');

router.get('/', async (req, res) => {
    const intetactorRequest = await usersInteractor.getUsers();
    res.json(intetactorRequest.data);
});

router.get('/:id', async (req, res) => {
    const intetactorRequest = await usersInteractor.getUserByIdIteractor(req.params.id);
    res.json(intetactorRequest.data);
});

router.post(
    '/',
    body('name').not().isEmpty(),
    body('username').not().isEmpty(),
    body('email').isEmail().normalizeEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const intetactorRequest = await usersInteractor.createUser();
        res.json(intetactorRequest.data);
    }
);

router.put(
    '/:id',
    oneOf(
        [body('name').not().isEmpty(), body('username').not().isEmpty(), body('email').isEmail().normalizeEmail()],
        'At least one filed must be updated'
    ),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const intetactorRequest = await usersInteractor.updateUser(req.params.id);
        res.json(intetactorRequest.data);
    }
);

router.delete('/:id', async (req, res) => {
    const intetactorRequest = await usersInteractor.deleteUser(req.params.id);
    // console.log(intetactorRequest.data);
    res.json(intetactorRequest.data);
});

module.exports = router;
