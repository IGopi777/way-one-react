const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const keys = require('../../config/keys');
const User = require('../../models/User');

//Validations
const validateRegisterInput = require('../../validations/register.js');

//@route GET api/users/register
//@desc Register User
//@access Public
router.post('/register', (req, res) => {

  const {errors, isValid} = validateRegisterInput(req.body);
  //Check validations
  if(!isValid){
    return res.status(400).json(errors)
  }

  //Searching the user in DB
  User.findOne({email:req.body.email})
  .then(user => {
    if(user){
      errors.email = 'Email already exists'
      return res.status(400).json(errors);
    } else {

   //Creating new user in DB
    const newUser = new User({
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    });

   //Changing password to encrypted password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err){
          console.log(err);
        }

        newUser.password = hash;

        //Saving user to DB
        newUser.save()
        .then(user => res.json(user))
        .catch(err => console.log(err))

      })
    })

}
})
.catch(() => res.json({error:'error occured'}));

});

module.exports = router;
