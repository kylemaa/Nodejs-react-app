const router = require('express').Router();
let Prescription = require('../models/prescription.model');

router.route('/').get((req, res) => {
//Mongoose find method required from the prescription model
  Prescription.find()
    .then(presciptions => res.json(precriptions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newPrescription = new Prescription({
        username,
        description,
        duration,
        date,
    });
    //Mongoose save method required from the prescription model
    newPrescription.save()
    .then(() => res.json('Prescription added successfully'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;