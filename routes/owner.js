const { signup, signin, createWork, doneWork, showWorker } = require("../controller/owner")

const router=require("express").Router()


router.post("/signup",signup)

router.post("/signin",signin)


router.post("/findWorker",createWork)

router.get("/showWorker",showWorker)

router.get("/doneWork",doneWork)



module.exports=router