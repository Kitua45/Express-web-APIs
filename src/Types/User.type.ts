export interface User {
    userid: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
    role: "admin" | "user";
     is_verified?: boolean; // new field to track if user is verified
    verification_code?: string | null; // new field to store verification code
}

export interface NewUser {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    password: string;
     role: "admin" | "user";
     is_verified?: boolean; // new field to track if user is verified
    verification_code?: string | null; // new field to store verification code
}

// update user type
export interface UpdateUser {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    password: string;
     role: "admin" | "user";
}

