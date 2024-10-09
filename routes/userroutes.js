const express=require('express')
const { createUser, loginUser } = require('../controllers/usercontroller')
const jwtAuth=require('../middleware/jwtauth')
const router=express.Router()


router.post('/register',createUser)
router.post('/login',jwtAuth,loginUser)

module.exports= router