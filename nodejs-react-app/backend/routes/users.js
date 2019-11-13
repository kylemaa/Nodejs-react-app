const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res)=> {
    //Mongoose find method required from the user model
    User.find()
    .then(users =>res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
  
    const newUser = new User({username});
    //Mongoose save method required from the user model
    newUser.save()
      .then(() => res.json('User added sucessfully'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;