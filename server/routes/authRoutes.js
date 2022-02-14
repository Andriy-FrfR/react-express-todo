const {Router} = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const {authValidators} = require('../utils/validators');
const authMiddleware = require('../middleware/authMiddleware');
const router = Router();

router.post('/login', authValidators, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'Your request didn\'t pass the validation'});
  }

  try {
    const {email, password} = req.body;
    const candidate = await User.findOne({email});

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password);
      
      if (areSame) {
        req.session.user = candidate;
        return res.status(204).end();
      } else {
        return res.status(400).json({error: 'Incorrect password'});
      }
    } else {
      res.status(400).json({error: 'No user with such email'});
    }
  } catch (e) {
    console.error(e);
  }
})

router.post('/register', authValidators, async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'Your request didn\'t pass the validation'});
  }

  try {
    const candidate = await User.findOne({
      email: req.body.email
    });

    if (candidate) {
      res.status(400).json({error: 'Email is used'});
    } else {
      const {email, password} = req.body;

      bcrypt.hash(password, 12, async (err, cryptedPassword) => {
        if (err) {
          throw err;
        }

        const user = await User.create({email, password: cryptedPassword});
        req.session.user = user;

        res.status(201).end();
      });
    }
  } catch (e) {
    console.error(e);
  }
});

router.get('/auto-login', authMiddleware, async (req, res) => {
  res.status(204).end();
});

router.get('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      } else {
        res.status(204).end();
      }
    });
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
