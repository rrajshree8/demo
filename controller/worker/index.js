const { StatusCodes } = require("http-status-codes");
const {Worker} =require("../../model/worker/workerDetails");
const Work = require("../../model/worker/work");

const signup = async (req, res) => {
    try {
        const { name, email, phone, password, state, district, subDistrict ,category} = req.body
        if (!name, !email, !phone, !password, !state, !district, !subDistrict,!category) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }
        const result = new Worker({ name, email, phone, password, state, district, subDistrict ,category});
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
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
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


const findWork = async (req, res) => {
    try {
        const { workerId } = req.query

        if (!workerId) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }

        const result =await Worker.findOne({ _id:workerId })

        const {state, district, subDistrict, category}=result

        console.log(result)

        const data=await Work.find({state, district, subDistrict, category,isActive:true})
        console.log(data)
        
        return res.status(StatusCodes.OK).json({ data })

    } catch (error) {
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(error.message)
    }
}




const acceptWork = async (req, res) => {
    try {
        const { workerId,workId } = req.query

        if (!workerId,!workId) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }

        const result =await Work.findOne({ _id:workId })

        const {isActive}=result

        if(!isActive){
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({message:"Work already Booked"});
        }

        const data=await Work.findByIdAndUpdate({_id:workId},{workerId:workerId,isActive:false})
        
        return res.status(StatusCodes.OK).json({ data })

    } catch (error) {
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(error.message)
    }
}




module.exports = {
    signup,
    signin,
    findWork,
    acceptWork
}