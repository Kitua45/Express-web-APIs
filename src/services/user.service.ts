import * as userRepositories from '../repositories/users.repository'
import { NewUser, UpdateUser, User } from '../Types/User.type';
import { sendEmail } from '../mailer/mailer';
import { emailTemplate } from '../mailer/emailTemplates';

import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const createUserBasic = async (user: NewUser) => {
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
        throw new Error('Invalid userid')
    }
    return await ensureUserExists(id);
}

export const updateUser = async (id: number, user: UpdateUser) => {
    if (isNaN(id)) {
        throw new Error('Invalid userid')
    }
    await ensureUserExists(id);
    return await userRepositories.updateUser(id, user);
}

export const deleteUser = async (id: number) => {
    if (isNaN(id)) {
        throw new Error('Invalid userid')
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
    const user = await userRepositories.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const payload = {
        sub: user.userid,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }

    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error('JWT secret not defined');
    const token = jwt.sign(payload, secret);

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

// Authorization by roles
export const loginUserWithRole = async (email: string, password: string) => {
    const user = await userRepositories.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const payload = {
        sub: user.userid,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
    }

    const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error('JWT secret not defined');
    const token = jwt.sign(payload, secret);

    return {
        message: 'Login successful',
        token,
        user: {
            userid: user.userid,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role
        }
    }
}

//  Create user & send welcome email
export const createUserWithWelcomeEmail = async (user: NewUser) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    const result = await userRepositories.createUser(user);

    try {
        await sendEmail(
            user.email,
            'Welcome to Todo App By Agnes Kitua',
            `<div>
                <h2>Welcome ${user.first_name}!</h2>
                <p>Thank you for registering with our Todo App. We're excited to have you on board!</p>
                <p>You can now log in and start managing your tasks efficiently.</p>
            </div>`
        );
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }

    return result;
}

//  Create user using template-based email
export const createUserWithTemplateEmail = async (user: NewUser) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    const result = await userRepositories.createUser(user);

    await sendEmail(
        user.email,
        'Welcome to Todo App By Agnes Kitua',
        emailTemplate.welcome(user.first_name),
    );

    return result;
}

//  Create user and send verification code
export const createUserWithVerification = async (user: NewUser) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const result = await userRepositories.createUser(user);
    await userRepositories.setVerificationCode(user.email, verificationCode);

    await sendEmail(
        user.email,
        'Verify your email for Todo App',
        emailTemplate.verify(user.first_name, verificationCode)
    );

    return { message: 'User created successfully. Verification code sent to email' };
}

//  Verify user email
export const verifyUserEmail = async (email: string, code: string) => {
    const user = await userRepositories.getUserbyEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    if (user.verification_code !== code) {
        throw new Error('Invalid verification code');
    }

    await userRepositories.verifyUser(email);

    await sendEmail(
        user.email,
        'Your email has been verified - Todo App',
        emailTemplate.verifiedSuccess(user.first_name)
    );

    return { message: 'User verified successfully' };
}

