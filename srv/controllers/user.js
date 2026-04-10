import * as UserService from '../services/user.js';


export const getUsers =  async (req, res) => {
    try {
        const result = await UserService.getUsers(req.query, req.isAdmin);
        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error('error : ', error);
        return res.status(500).json({
            error : 'Internal server error',
        })
    }
}


export const loginUser = async (req, res) => {
    try {
        const {email} = await req.body;

        const user = await UserService.loginUser(email);

        if(!user) return res.json('error: ', 'No such user.');
        return res.json(user);
    } catch (error) {
        console.error('error : ', error);
        return res.status(500).json({
            error : 'Internal server error',
        })
    }
}