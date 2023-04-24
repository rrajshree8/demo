const { signup, signin, findWork, acceptWork } = require("../controller/worker")

const router=require("express").Router()


router.post("/signup",signup)

router.post("/signin",signin)

router.get("/findWork",findWork)

router.get("/acceptWork",acceptWork)


module.exports=router