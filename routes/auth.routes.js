const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()
const config = require('config')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Min password length is 8 characters')
      .isLength({min: 8})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid registration data'
        })
      }
      const {email, password} = req.body
      const candidate = await User.findOne({email})

      if (candidate) {
        res.status(400).json({message: 'User with this email already exists'})
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({email, password: hashedPassword})
      await user.save()

      res.status(201).json({message: 'User successfully registered'})

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, please try again'})
    }
  })

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter correct Email').normalizeEmail().isEmail(),
    check('password', 'Enter correct password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Invalid login data'
        })
      }
      const {email, password} = req.body

      const user = await User.findOne({email})

      if (!user) {
        return res.status(404).json({message: 'Invalid login data'})
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password)

      console.log('isPasswordMatch', isPasswordMatch)
      if (!isPasswordMatch) {
        return res.status(400).json({message: 'Invalid login data'})
      }

      const token = jwt.sign(
        {
          userId: user.id
        },
        config.get('jwtSecret'),
        {expiresIn: '1h'}
      )

      res.json({token, userId: user.id, message: 'You successfully logged in'})

    } catch (e) {
      res.status(500).json({message: 'Something went wrong, please try again'})
    }
  })

module.exports = router