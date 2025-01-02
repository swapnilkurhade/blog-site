import User from '../models/users.js'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({ id }, 'secretekey', { expiresIn: "1d" })
}

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const isAdded = await User.find({ username: user.username });
        if (isAdded.length == 0) {
            const newUser = new User(user);
            newUser.save();
            const token = createToken(newUser._id);
            return res.status(201).json({...newUser, token: token});
        }else{
            const token = createToken(isAdded._id);
            return res.status(201).json({...isAdded, token : token});
        }

    } catch (error) {
        console.log('error occured', error);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}