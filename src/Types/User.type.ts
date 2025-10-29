export interface User {
    userid: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
}

export interface NewUser {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
}

// update user type
export interface UpdateUser {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    password: string;
}