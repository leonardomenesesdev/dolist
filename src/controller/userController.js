import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import user from '../model/User.js'
import jwt from 'jsonwebtoken'
class UserController{
    static async register(req, res) {
        const {username, email, password} = req.body
        if(!username || !email || !password){
            res.status(400)
            throw new Error("Empty field")
        }   
        const userAvailable = await user.findOne({email})
        if(userAvailable){
            res.status(400)
            throw new Error("User already registered")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(`hashed: ${hashedPassword}`)
        const newUser = await user.create({username, email, password:hashedPassword})
        console.log(`User ${newUser} created`)
        if(newUser){
            res.status(201).json({message: `User ${newUser.username} created`})
        } else{
            res.status(400)
            throw new Error("user invalid")
        }
        
    }
    static async login(req, res) {
        const {email, password} = req.body
        if(!email || !password){
            res.status(400)
            throw new Error("Empty field")
        }
        const userFound = await user.findOne({email})
        if(!userFound){
            res.status(401)
            throw new Error("login invalid")
        }
        const comparePassword = await bcrypt.compare(password, userFound.password)
        if(comparePassword){
            const accessToken = jwt.sign({
                user:{
                    username: userFound.username,
                    email: userFound.email,
                    id: userFound.id
                },
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"60m"})
            res.status(200).json({accessToken})
        }
        else{
            res.status(401)
            throw new Error("login invalid")
        }
    }
    static async currentUser(req, res){
        res.status(200).json(req.user);
    }
}
export default UserController;