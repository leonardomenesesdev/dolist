import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import user from '../model/User.js';
class UserController{
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ message: "Empty field" });
            }

            const userAvailable = await user.findOne({ email });
            if (userAvailable) {
                return res.status(400).json({ message: "User already registered" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await user.create({ 
                username, 
                email, 
                password: hashedPassword 
            });
    
            if (newUser) {
                return res.status(201).json({ message: `User ${newUser.username} created`, userId: newUser._id });
            } else {
                return res.status(400).json({ message: "Não foi possível criar o usuário." });
            }

        } catch (error) {
            console.error("ERRO NO REGISTER:", error);
            return res.status(500).json({
                message: "Ocorreu um erro no servidor durante o registro.",
                error: error.message
            });
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

    static async editUser(req, res){
        try {
            const {username, email, password} = req.body
            if(!username || !email || !password){
                res.status(400)
                throw new Error("Empty field")
            }
            const userId = req.user.id
            const userFound = await user.findById(userId)
            if(!userFound){
                res.status(404)
                throw new Error("User not found")
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const userUpdated = await user.findByIdAndUpdate(userId, {
                username,
                email,
                password: hashedPassword
            }, {new: true})
            if(userUpdated){
                res.status(200).json({message: `User ${userUpdated.username} updated`, userId: userUpdated._id})
            } else {
                res.status(400)
                throw new Error("User data is invalid")
            }
        } catch (error) {
            console.error("ERRO NO EDIT USER:", error);
            res.status(500).json({
                message: "Ocorreu um erro no servidor durante a atualização do usuário.",
                error: error.message
            });
        }
    }

    static async deleteUser(req, res){
        try {
            const userId = req.user.id
            const userFound = await user.findById(userId)
            if(!userFound){
                res.status(404)
                throw new Error("User not found")
            }
            await user.findByIdAndDelete(userId)
            res.status(200).json({message: `User ${userFound.username} deleted`})
        } catch (error) {
            console.error("ERRO NO DELETE USER:", error);
            res.status(500).json({
                message: "Ocorreu um erro no servidor durante a exclusão do usuário.",
                error: error.message
            });
        }
    }
}
export default UserController;