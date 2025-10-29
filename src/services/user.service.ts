import * as userRepositories from '../repositories/users.repository'
import { NewUser, UpdateUser, User } from '../Types/User.type';

import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

export const createUser = async (user: NewUser) => {
    //hash the password before saving
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);  // 10 = salt rounds
        console.log(user.password);  // Shows hashed password
    }
    return await userRepositories.createUser(user);
}




export const listUsers = async () => await userRepositories.getUsers();
export const getUser = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    return await ensureUserExists(id);

}



//export const updateUser = async (id: number, user: any) => await userRepositories.updateUser(id, user);
export const updateUser = async (id: number, user: UpdateUser) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    await ensureUserExists(id);
    return await userRepositories.updateUser(id, user);
}
// export const deleteUser = async (id: number) => await userRepositories.deleteUser(id);
export const deleteUser = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Inavlid userid')
    }
    await ensureUserExists(id);
    return await userRepositories.deleteUser(id);
}

//Reusable function to check if user exists
const ensureUserExists = async (id: number) => {
    const user = await userRepositories.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}
function getPool() {
    throw new Error('Function not implemented.');


}
//loggin in by user email
export const loginUser = async (email: string, password: string) => {
    // 1. Find user by email
    const user = await userRepositories.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    // 2. Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    // 3. Create JWT payload
    const payload = {
        sub: user.userid,        // Subject (user ID)
        first_name: user.first_name,
        last_name: user.last_name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour expiration
    }

    // 4. Generate JWT token
    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error('JWT secret not defined');
    const token = jwt.sign(payload, secret);// token to use as a card

    // 5. Return token + user details (without password)
    return {
        message: 'Login successful',
        token,
        user: {
            userid: user.userid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number
        }
    }
}



