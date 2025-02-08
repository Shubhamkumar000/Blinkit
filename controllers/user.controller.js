import { verify } from 'jsonwebtoken'
import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../config/verifyEmailTemplate.js'


export async function registerUserController(req,res) {
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password) {
            return res.status(400).json({
                message : "Provide email name and password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.find({email})

        if(user) {
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify Email from blinkit",
            html : verifyEmailTemplate({
                name,
                url : verifyEmailUrl

            })
        })

        return res.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
       return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
       })
    }
}