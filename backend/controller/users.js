import User from '../models/users.js'

export const getAllUsers = async(req, res) =>{
    try {
        const result = await User.find();
        res.status(200).json({ success : true, data : result})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success : false, message : error})
    }
}

export const createUser = async(req, res) => {
    try {
        const user = req.body;
        const isAdded = await User.find({ username: user.username });
        if (isAdded.length == 0) {
            const newUser = new User(user);
            newUser.save();
            return res.status(201).json(newUser);
        }
        return res.status(201).json(isAdded);

    } catch (error) {
        console.log('error occured', error);
    }
}

export const deleteUser = async(req, res) =>{
    try {
        const user = await User.findOneAndDelete({ _id : req.params.id});
        res.status(200).json({ success : true})
    } catch (error) {
        res.status(500).json({ success : false, error : error})
    }
}