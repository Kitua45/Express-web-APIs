import { getPool } from '../db/config'
import { NewUser, UpdateUser, User } from '../Types/User.type';

//get all users
export const getUsers = async (): Promise<User[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
}

//get user by id
export const getUserById = async (id: number): Promise<User[]> => {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id', id)
        .query('SELECT * FROM Users WHERE userid = @id');
    return result.recordset[0];
};

//create user using password

export const createUserWithPassword = async (user: NewUser) => {
    const pool = await getPool();
    await pool
        .request()
        .input('first_name', user.first_name)
        .input('last_name', user.last_name)
        .input('email', user.email)
        .input('phone_number', user.phone_number)
        .input('password', user.password)  // This is now hashed
        .query('INSERT INTO Users (first_name, last_name,email, phone_number, password) VALUES (@first_name, @last_name,@email, @phone_number, @password)');
    return { message: 'User created successfully' };
}

/* JSON Example
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@gmail.com",
    "phone_number": "1234567890"
}
*/

//update a user
export const updateUser = async (id: number, user: UpdateUser) => {
    const pool = await getPool();
    await pool
        .request()
        .input('id', id)
        .input('first_name', user.first_name)
        .input('last_name', user.last_name)
        .input('phone_number', user.phone_number)
        .query('UPDATE Users SET first_name = @first_name, last_name = @last_name, phone_number = @phone_number WHERE userid = @id');
    return { message: 'User updated successfully' };
}


//delete a user
export const deleteUser = async (id: number) => {
    const pool = await getPool();
    await pool
        .request()
        .input('id', id)
        .query('DELETE FROM Users WHERE userid = @id');
    return { message: 'User deleted successfully' };
}

//create user using password
// src/repositories/user.repository.ts
export const createUser = async (user: NewUser) => {
    const pool = await getPool();
    await pool
        .request()
        .input('first_name', user.first_name)
        .input('last_name', user.last_name)
        .input('email', user.email)
        .input('phone_number', user.phone_number)
        .input('password', user.password)  // This is now hashed
        .query('INSERT INTO Users (first_name, last_name,email, phone_number, password) VALUES (@first_name, @last_name,@email, @phone_number, @password)');
    return { message: 'User created successfully' };
}
// src/repositories/user.repository.ts
export const getUserByEmail = async (email: string): Promise<User | null> => {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('email', email)
        .query('SELECT * FROM Users WHERE email = @email');
    return result.recordset[0] || null;
}
