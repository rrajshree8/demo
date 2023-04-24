const { StatusCodes } = require("http-status-codes");
const { Owner } = require("../../model/owner/ownerDetails");
const Work = require("../../model/worker/work");
const { Worker } = require("../../model/worker/workerDetails");



const signup = async (req, res) => {
    try {
        const { name, email, phone, password, address } = req.body
        if (!name, !email, !phone, !password, !address) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }
        const result = new Owner({ name, email, phone, password, address });
        const data = await result.save();
        return res.status(StatusCodes.CREATED).json(data)

    } catch (error) {

        return res.status(StatusCodes.SERVICE_UNAVAILABLE).send(error.message)
    }

}


const signin = async (req, res) => {
    try {
        const { email, password, } = req.body
        if (!email, !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }
        const result = await Owner.findOne({ email: email, password: password })

        if (result) {
            return res.status(StatusCodes.CREATED).json(result)
        }

        return res.status(StatusCodes.NOT_FOUND).json({ message: "User Id or Password Incorrect" })

    } catch (error) {

        return res.status(StatusCodes.SERVICE_UNAVAILABLE).send(error.message)
    }

}



const createWork = async (req, res) => {
    try {
        const { state, district, subDistrict, category, ownerId } = req.body

        if (!state, !district, !subDistrict, !category, !ownerId) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }

        const result =new Work({ state, district, subDistrict, category, ownerId })
        const data = await result.save();
        return res.status(StatusCodes.ACCEPTED).json({ data })
    } catch (error) {
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(error.message)
    }
}

const showWorker = async (req, res) => {
    try {
        const {ownerId ,workId} = req.query

        if ( !ownerId,!workId) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }

        const result =await Work.findOne({ _id:workId,isActive:false,isDone:false})

        if(!result){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"No Worker Found"});
        }
        const {_id}=result
        
        const {name,email,phone,state,district,subDistrict,category}=await Worker.find({_id})
        

        return res.status(StatusCodes.ACCEPTED).json({name,email,phone,state,district,subDistrict,category})
    } catch (error) {
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(error.message)
    }
}

const doneWork = async (req, res) => {
    try {
        const { ownerId,workId } = req.query

        if (!ownerId,!workId) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Bad Request"});
        }

        const result =await Work.findOne({ _id:workId,isActive:false,isDone:false})


        if(!result){
            return res.status(StatusCodes.NOT_ACCEPTABLE).json({message:"Work already Done"});
        }

        const data=await Work.findByIdAndUpdate({_id:workId},{ownerId:ownerId,isDone:true})
        
        return res.status(StatusCodes.OK).json({ data })

    } catch (error) {
        return res.status(StatusCodes.SERVICE_UNAVAILABLE).json(error.message)
    }
}





module.exports = {
    signup,
    signin,
    createWork,
    doneWork,
    showWorker
}