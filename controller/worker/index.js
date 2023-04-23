const { StatusCodes } = require("http-status-codes");
const {Worker} =require("../../model/worker/workerDetails")

const signup = async (req, res) => {
    try {
        const { name, email, phone, password, address ,category} = req.body
        if (!name, !email, !phone, !password, !address,!category) {
            return res.status(StatusCodes.BAD_REQUEST);
        }
        const result = new Worker({ name, email, phone, password, address ,category});
        const data = await result.save();
        return res.status(StatusCodes.CREATED).json(data)

    } catch (error) {

        return res.status(StatusCodes.SERVICE_UNAVAILABLE).send(error.message)
    }

}


const signin = async (req, res) => {
    try {
        const {  email, password, } = req.body
        if (!email, !password) {
            return res.status(StatusCodes.BAD_REQUEST);
        }
        const result=await Worker.findOne({email:email,password:password})
        
        if(result){
            return res.status(StatusCodes.CREATED).json(result)
        }

        return res.status(StatusCodes.NOT_FOUND).json({message:"User Id or Password Incorrect"})

    } catch (error) {

        return res.status(StatusCodes.SERVICE_UNAVAILABLE).send(error.message)
    }

}


module.exports = {
    signup,
    signin
}