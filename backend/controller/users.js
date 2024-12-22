import User from '../models/users.js'

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