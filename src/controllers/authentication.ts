import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: 'config/.env' });

/* Component */
// models
import { createUser, getUserByEmail } from '../models/users';
// helpers
import { random, authentication } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, username} = req.body;

        if (!email || !password || !username) {
            return res.sendStatus(400)
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(400)
            res.send('User existing')
        }

        const salt = random()
        const user = await createUser ({
            email,
            username,
            authentication : {
                salt,
                password: authentication(salt, password)
            }
        });

        return res.status(200).json(user).end()
    } catch (err) {
        console.log('register Error', err)
        return res.sendStatus(400)
    }
}

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password } = req.body;
        console.log({email, password })

        if(!email || !password) {
            res.sendStatus(400)
            res.send('incomplete')
        };

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if(!user){
            res.sendStatus(400)
            res.send('User invalid')
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if(user.authentication.password !== expectedHash) {
            return res.send('Wrong Password').sendStatus(403);
        }
        
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save()
        res.cookie(process.env.SECRET,user.authentication.sessionToken, {domain: 'localhost', path: '/'});

        return res.status(200).json(user).end()

    } catch (err) {
        console.log("login error", err)
        res.sendStatus(400)
        
    }
}