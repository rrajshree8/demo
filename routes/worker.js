const { signup, signin } = require("../controller/worker")

const router=require("express").Router()


router.post("/signup",signup)

router.post("/signin",signin)




module.exports=router