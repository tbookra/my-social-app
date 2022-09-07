const router = require("express").Router();
const User = require('../models/Users')

// Register
router.post('/register', async (req,res)=>{
    const user = await new User({

    })
    user.save()
})



module.exports = router;
