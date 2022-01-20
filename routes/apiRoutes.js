const router = require('express').Router();
const db = require('../db');

router.get('/notes', (req, res) => {
    db.readNotes()
        .then((notes) => {
            return res.json(notes)
        })
        .catch(err => res.json(err))
});

router.post('/notes', (req, res) => {
    db.writeNotes(req.body)
        .then((note) => {
            return res.json(note)
        })
        .catch(err => res.json(err))
});

router.delete('/notes/:id', function (req, res) {
    db.deleteNote(req.params.id)
        .then((notes) => {
            return res.json(notes)
        })
        .catch(err => res.json(err))
});

module.exports = router;