const router = require('express').Router();
let Prescription = require('../models/prescription.model');

router.route('/').get((req, res) => {
//Mongoose find method required from the prescription model
Prescription.find()
.then(prescriptions =>res.json(prescriptions))
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
router.route('/:id').get((req, res) => {
    Prescription.findById(req.params.id)
      .then(prescription => res.json(prescription))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Prescription.findByIdAndDelete(req.params.id)
      .then(() => res.json('Prescription deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Prescription.findById(req.params.id)
      .then(prescription => {
        prescription.username = req.body.username;
        prescription.description = req.body.description;
        prescription.duration = Number(req.body.duration);
        prescription.date = Date.parse(req.body.date);
  
        prescription.save()
          .then(() => res.json('Prescription updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

module.exports = router;