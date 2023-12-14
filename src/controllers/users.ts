import express from 'express';

import { UserModel, deleteUserById, getUserById, getUsers } from '../models/users';

export const getAllUsers = async (req:express.Request, res: express.Response) => {
    try {
        const users = await getUsers()
        return res.status(200).json(users).end()
    } catch (err) {
        console.log('getAllUsers error', err)
        
    }
};

export const deleteUser =async (req: express.Request, res: express.Response ) => {
    try {
        const {id} = req.params;

        const deletedUser = await deleteUserById(id);
        return res.sendStatus(200).json(deletedUser).end()
        
    } catch (err) {
        console.log("deleteUser error", err)
        return res.sendStatus(400)
        
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { username } = req.body;
        const { id } = req.params;
        
        if(!username) {
            return res.sendStatus(400);
        };

        const user = await getUserById(id)
        
        user.username = username;
        await user.save();

        return res.status(200).json(user)

    } catch (err) {
        console.log('updateUser  error', err)
        return res.sendStatus(400);
    }
}